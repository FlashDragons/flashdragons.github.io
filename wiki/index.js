const translations = {
    'en-us': {
        title: 'Wiki Home', iconAlt: 'Icon', header: 'Wiki Home', welcome: 'Welcome to my wiki!',
        intro1: 'I like playing Minecraft and Monster Hunter, and I have written some strategies for them.',
        intro2: "I'm not a professional writer, but I try to make my content as clear and helpful as possible.",
        linksIntro: 'Here are the links to the games:', minecraft: 'Minecraft Strategies', mhst: 'Monster Hunter Stories Strategies',
        backPrefix: 'Back to ', home: 'Home Page', backSuffix: '.',
        localTime: 'Local Time', hour12: '12H', hour24: '24H', seconds: 'Show/Hide Seconds',
        copyright: '© 2026 My own website, all rights reserved.',
        credit1: "√ The Safi'jiiva and Xeno'jiiva background image comes from ", credit2: ' and was created by ', credit3: '. This site has obtained ', permission: 'permission', credit4: ' to use it.'
    },
    'zh-hans': {
        title: '百科目录', iconAlt: '图标', header: '百科首页', welcome: '欢迎来到我的百科！',
        intro1: '我喜欢玩Minecraft和怪物猎人，并为它们编写了一些攻略。',
        intro2: '我不是专业作者，但会尽力让内容清晰易懂、切实有用。',
        linksIntro: '游戏攻略链接：', minecraft: 'Minecraft攻略', mhst: '怪物猎人物语攻略',
        backPrefix: '返回', home: '首页', backSuffix: '。',
        localTime: '本地时间',hour12: '12小时制', hour24: '24小时制', seconds: '显示/隐藏秒',
        copyright: '© 2026 我的个人网站，保留所有权利。',
        credit1: '√ 冥赤龙和冥灯龙背景图片来自', credit2: '，作者为', credit3: '。本站已获得其', permission: '授权', credit4: '使用该图片。'
    },
    'zh-hant': {
        title: '百科目錄', iconAlt: '圖標', header: '百科首頁', welcome: '歡迎來到我的百科！',
        intro1: '我喜歡玩Minecraft和魔物獵人，也為它們撰寫了一些攻略。',
        intro2: '我不是專業作者，但會盡力讓內容清楚易懂、實用好讀。',
        linksIntro: '遊戲攻略連結：', minecraft: 'Minecraft攻略', mhst: '魔物獵人物語攻略',
        backPrefix: '返回', home: '首頁', backSuffix: '。',
        localTime: '本地時間', hour12: '12小時制', hour24: '24小時制', seconds: '顯示／隱藏秒數',
        copyright: '© 2026 我的個人網站，保留所有權利。',
        credit1: '√ 冥赤龍與冥燈龍背景圖片來自', credit2: '，作者為', credit3: '。本站已獲得其', permission: '授權', credit4: '使用該圖片。'
    }
};

function changeLanguage(lang) {
    if (!translations[lang]) lang = 'en-us';
    document.querySelectorAll('[data-key]').forEach(element => {
        element.textContent = translations[lang][element.dataset.key];
    });
    document.querySelectorAll('[data-key-alt]').forEach(element => {
        element.alt = translations[lang][element.dataset.keyAlt];
    });
    document.documentElement.lang = lang;
    document.getElementById('languageSelect').value = lang;
    document.getElementById('minecraftLink').href = `minecraft/?lang=${lang}`;
    document.getElementById('mhstLink').href = `MHST/?lang=${lang}`;
    document.getElementById('homeLink').href = `/index.html?lang=${lang}`;
    localStorage.setItem('preferred_lang', lang);
    if (typeof updateDateDisplay === 'function') updateDateDisplay(new Date());
}

window.addEventListener('DOMContentLoaded', () => {
    const requested = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('preferred_lang');
    changeLanguage(translations[requested] ? requested : saved);
    document.getElementById('languageSelect').addEventListener('change', event => changeLanguage(event.target.value));
});
