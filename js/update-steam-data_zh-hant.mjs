import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const STEAM_ID = '76561199654646467';
const imageOverrides = new Map([
    [2852190, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2852190/d42ab41c29c230c2e855c32f6669f37043187b70/capsule_184x69.jpg']
]);
const apiKey = process.env.STEAM_API_KEY;
const outputPath = path.resolve('index_zh-hant.html');

if (!apiKey) {
    throw new Error('STEAM_API_KEY is required. Add it as a GitHub Actions repository secret.');
}

async function steamApi(iface, method, version, params = {}) {
    const url = new URL(`https://api.steampowered.com/${iface}/${method}/v${version}/`);
    url.searchParams.set('key', apiKey);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));

    const response = await fetch(url, { headers: { 'user-agent': 'flashdragons.github.io Steam card updater' } });
    if (!response.ok) throw new Error(`${method} failed with HTTP ${response.status}`);
    return response.json();
}

const [ownedResult, summaryResult] = await Promise.all([
    steamApi('IPlayerService', 'GetOwnedGames', '0001', {
        steamid: STEAM_ID,
        include_appinfo: true,
        include_played_free_games: true,
        format: 'json'
    }),
    steamApi('ISteamUser', 'GetPlayerSummaries', '0002', { steamids: STEAM_ID, format: 'json' })
]);

const ownedGames = ownedResult.response?.games ?? [];
const player = summaryResult.response?.players?.[0];
if (!ownedGames.length) throw new Error('Steam returned no owned games. Confirm that Game details are public.');
if (!player) throw new Error('Steam returned no player summary.');

const playedGames = ownedGames.filter((game) => game.playtime_forever > 0);
const hours = playedGames.reduce((total, game) => total + game.playtime_forever, 0) / 60;
const round = (number) => Math.round(number * 10) / 10;
const topGames = [...playedGames]
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .slice(0, 6)
    .map((game) => ({ appid: game.appid, name: game.name, hours: round(game.playtime_forever / 60) }));

await Promise.all(topGames.map(async (game) => {
    const [details, achievementResult] = await Promise.all([
        fetch(`https://store.steampowered.com/api/appdetails?appids=${game.appid}&l=tchinese`)
            .then((response) => response.ok ? response.json() : null)
            .catch(() => null),
        steamApi('ISteamUserStats', 'GetPlayerAchievements', '0001', {
            steamid: STEAM_ID,
            appid: game.appid,
            l: 'tchinese'
        }).catch(() => null)
    ]);

    game.image = imageOverrides.get(game.appid) ?? details?.[game.appid]?.data?.header_image;

    const achievements = achievementResult?.playerstats?.achievements;
    if (Array.isArray(achievements) && achievements.length > 0) {
        game.achievements = {
            unlocked: achievements.filter((achievement) => achievement.achieved === 1).length,
            total: achievements.length
        };
    }
}));

const data = {
    updatedAt: new Date().toISOString(),
    profile: {
        name: player.personaname,
        avatar: player.avatarfull,
        url: player.profileurl
    },
    summary: {
        owned: ownedResult.response.game_count ?? ownedGames.length,
        played: playedGames.length,
        hours: round(hours),
        average: playedGames.length ? round(hours / playedGames.length) : 0
    },
    games: topGames
};

const html = await fs.readFile(outputPath, 'utf8');
const replacement = `<!-- STEAM_DATA_START -->\n    <script id="steam-data" type="application/json">\n${JSON.stringify(data, null, 2).split('\n').map((line) => `    ${line}`).join('\n')}\n    </script>\n    <!-- STEAM_DATA_END -->`;
const updatedHtml = html.replace(/<!-- STEAM_DATA_START -->[\s\S]*?<!-- STEAM_DATA_END -->/, replacement);

if (updatedHtml === html && !html.includes('<!-- STEAM_DATA_START -->')) {
    throw new Error(`Steam data markers are missing from ${outputPath}.`);
}

if (updatedHtml === html) {
    console.log('Steam data is already current.');
} else {
    await fs.writeFile(outputPath, updatedHtml);
    console.log(`Updated ${outputPath} with ${topGames.length} games.`);
}
