const translations = {
    "en-us": {
        "steam0": "Steam Data",
        "steam1": "\n      html,\n      body {\n          margin: 0;\n          overflow-x: hidden;\n          background: transparent;\n      }\n      .steam-summary dt {\n          font-size: .75rem;\n      }\n      .steam-summary dd {\n          font-size: 1.15rem;\n      }\n  ",
        "steam2": "Steam library showcase · top games by total playtime",
        "steam3": "Owned games",
        "steam5": "Played games",
        "steam7": "Hours on record",
        "steam9": "Average playtime",
        "steam11": "Most played games",
        "steam12": "Top 6",
        "steam13": "\n                  Last update: ",
        "steam14": "when the scheduled sync runs",
        "steam15": " · Daily 22:23 (UTC) Sync ·\n                  Data calculated from the official Steam Web API.\n              ",
        "pending": "Sync pending",
        "hours": "hours",
        "playtime": "Playtime: ",
        "achievements": "Achievements: ",
        "names": {
            "2356560": "Monster Hunter Stories",
            "582010": "Monster Hunter: World",
            "2852190": "Monster Hunter Stories 3: Twisted Reflection",
            "3065170": "Monster Hunter Wilds Beta test",
            "1277400": "Monster Hunter Stories 2: Wings of Ruin",
            "2246340": "Monster Hunter Wilds"
        }
    },
    "zh-hans": {
        "steam0": "Steam 数据",
        "steam1": "\n      html,\n      body {\n          margin: 0;\n          overflow-x: hidden;\n          background: transparent;\n      }\n      .steam-summary dt {\n          font-size: .75rem;\n      }\n      .steam-summary dd {\n          font-size: 1.15rem;\n      }\n  ",
        "steam2": "Steam 游戏库展示 · 按总游玩时长排序的热门游戏",
        "steam3": "拥有的游戏",
        "steam5": "玩过的游戏",
        "steam7": "总游玩时长",
        "steam9": "平均游玩时长",
        "steam11": "游玩时间最长的游戏",
        "steam12": "前 6 名",
        "steam13": "\n                最后更新：",
        "steam14": "计划同步运行时",
        "steam15": " · 每日 22:23（UTC）同步 · 数据由 Steam 官方 Web API 计算。\n            ",
        "pending": "等待同步",
        "hours": "小时",
        "playtime": "游玩时间：",
        "achievements": "成就：",
        "names": {
            "2356560": "Monster Hunter Stories",
            "582010": "Monster Hunter: World",
            "2852190": "Monster Hunter Stories 3: Twisted Reflection",
            "3065170": "Monster Hunter Wilds Beta test",
            "1277400": "Monster Hunter Stories 2: Wings of Ruin",
            "2246340": "Monster Hunter Wilds"
        }
    },
    "zh-hant": {
        "steam0": "Steam 數據",
        "steam1": "\n      html,\n      body {\n        margin: 0;\n          overflow-x: hidden;\n          background: transparent;\n      }\n      .steam-summary dt {\n          font-size: .75rem;\n      }\n      .steam-summary dd {\n          font-size: 1.15rem;\n      }\n  ",
        "steam2": "Steam 遊戲庫展示 · 按總遊玩時長排序的熱門遊戲",
        "steam3": "擁有的遊戲",
        "steam5": "玩過的遊戲",
        "steam7": "總遊玩時長",
        "steam9": "平均遊玩時長",
        "steam11": "遊玩時間最長的遊戲",
        "steam12": "前 6 名",
        "steam13": "\n                  最後更新：",
        "steam14": "排程同步執行時",
        "steam15": " · 每日 22:23（UTC）同步 · 資料由 Steam 官方 Web API 計算。\n              ",
        "pending": "等待同步",
        "hours": "小時",
        "playtime": "遊玩時間：",
        "achievements": "成就：",
        "names": {
            "2356560": "Monster Hunter Stories",
            "582010": "Monster Hunter: World",
            "2852190": "Monster Hunter Stories 3: Twisted Reflection",
            "3065170": "Monster Hunter Wilds Beta test",
            "1277400": "Monster Hunter Stories 2: Wings of Ruin",
            "2246340": "Monster Hunter Wilds"
        }
    }
};
const requested = new URLSearchParams(location.search).get('lang') || localStorage.getItem('preferred_lang');
const lang = translations[requested] ? requested : 'en-us';
const t = translations[lang];
document.documentElement.lang = lang;
document.title = t.steam0;
document.querySelectorAll('[data-key]').forEach(el => el.textContent = t[el.dataset.key]);
const steamDataElement = document.getElementById('steam-data');

if (!steamDataElement) {
    throw new Error('Steam card data is missing from the page.');
}

const data = JSON.parse(steamDataElement.textContent);
const formatNumber = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 });
const profileLinks = [document.getElementById('profile-link-avatar'), document.getElementById('profile-name')];

profileLinks.forEach((link) => { link.href = data.profile.url; });
document.getElementById('profile-name').textContent = data.profile.name;
document.getElementById('avatar').src = data.profile.avatar;
document.getElementById('owned').textContent = formatNumber.format(data.summary.owned);
document.getElementById('played').textContent = formatNumber.format(data.summary.played);
document.getElementById('hours').textContent = `${formatNumber.format(data.summary.hours)}h`;
document.getElementById('average').textContent = `${formatNumber.format(data.summary.average)}h`;

if (data.updatedAt) {
    const updated = new Date(data.updatedAt);
    const time = document.getElementById('updated');
    time.dateTime = updated.toISOString();
    time.textContent = updated.toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

const games = [...data.games]
    .sort((a, b) => (b.hours ?? -1) - (a.hours ?? -1))
    .slice(0, 6);
const gamesRoot = document.getElementById('games');

games.forEach((game) => {
    const link = document.createElement('a');
    link.className = 'game';
    link.href = `https://store.steampowered.com/app/${game.appid}/`;
    link.target = '_blank';
    link.rel = 'noopener';

    const image = document.createElement('img');
    image.src = game.image || `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
    image.alt = '';
    image.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'game-info';
    const name = document.createElement('div');
    name.className = 'game-name';
    name.textContent = (t.names[game.appid] || game.name);
    name.title = (t.names[game.appid] || game.name);
    const playtime = document.createElement('div');
    playtime.className = 'playtime';
    const strong = document.createElement('strong');
    strong.textContent = game.hours == null ? t.pending : `${formatNumber.format(game.hours)} ${t.hours}`;
    playtime.append(t.playtime, strong);
    info.append(name, playtime);

    if (game.achievements?.total > 0) {
        const achievements = document.createElement('div');
        achievements.className = 'achievements';
        const achievementCount = document.createElement('strong');
        achievementCount.textContent = `${formatNumber.format(game.achievements.unlocked)}/${formatNumber.format(game.achievements.total)}`;
        achievements.append(t.achievements, achievementCount);
        info.append(achievements);
    }
    link.append(image, info);
    gamesRoot.append(link);
});
