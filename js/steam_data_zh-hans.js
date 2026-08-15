const steamDataElement = document.getElementById('steam-data');

if (!steamDataElement) {
    throw new Error('页面中缺少 Steam 资料卡数据。');
}

const data = JSON.parse(steamDataElement.textContent);
const formatNumber = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });
const profileLinks = [document.getElementById('profile-link-avatar'), document.getElementById('profile-name')];

profileLinks.forEach((link) => { link.href = data.profile.url; });
document.getElementById('profile-name').textContent = data.profile.name;
document.getElementById('avatar').src = data.profile.avatar;
document.getElementById('owned').textContent = formatNumber.format(data.summary.owned);
document.getElementById('played').textContent = formatNumber.format(data.summary.played);
document.getElementById('hours').textContent = `${formatNumber.format(data.summary.hours)} 小时`;
document.getElementById('average').textContent = `${formatNumber.format(data.summary.average)} 小时`;

if (data.updatedAt) {
    const updated = new Date(data.updatedAt);
    const time = document.getElementById('updated');
    time.dateTime = updated.toISOString();
    time.textContent = updated.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
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
    name.textContent = game.name;
    name.title = game.name;
    const playtime = document.createElement('div');
    playtime.className = 'playtime';
    const strong = document.createElement('strong');
    strong.textContent = game.hours == null ? '等待同步' : `${formatNumber.format(game.hours)} 小时`;
    playtime.append('游玩时长：', strong);
    info.append(name, playtime);

    if (game.achievements?.total > 0) {
        const achievements = document.createElement('div');
        achievements.className = 'achievements';
        const achievementCount = document.createElement('strong');
        achievementCount.textContent = `${formatNumber.format(game.achievements.unlocked)}/${formatNumber.format(game.achievements.total)}`;
        achievements.append('成就：', achievementCount);
        info.append(achievements);
    }
    link.append(image, info);
    gamesRoot.append(link);
});
