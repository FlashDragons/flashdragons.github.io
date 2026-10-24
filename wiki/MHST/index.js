const translations = {
    'en-us': {
        title: 'Monster Hunter Stories Wiki Page', iconAlt: 'Icon', header: 'Monster Hunter Stories Wiki Page',
        welcome: 'Welcome to the Monster Hunter Stories Wiki!',
        intro: 'This wiki is dedicated to providing strategies and information about Monster Hunter Stories.',
        explore: 'Feel free to explore the various pages!', eggs: 'Monster Hunter Stories 1 All Eggs Encyclopedia',
        backPrefix: 'Back to ', home: 'Home Page', backSuffix: '.',
        copyright: '© 2026 My own website, all rights reserved.',
        credit1: "√ The Safi'jiiva and Xeno'jiiva background image comes from ",
        credit2: ' and was created by ', credit3: '. This site has obtained ',
        permission: 'permission', credit4: ' to use it.'
    },
    'zh-hans': {
        title: '怪物猎人物语百科页面', iconAlt: '图标', header: '怪物猎人物语百科页面',
        welcome: '欢迎来到怪物猎人物语百科！',
        intro: '本百科致力于提供怪物猎人物语的攻略和相关信息。',
        explore: '欢迎浏览各个页面！', eggs: '怪物猎人物语1全蛋图鉴',
        backPrefix: '返回', home: '首页', backSuffix: '。',
        copyright: '© 2026 我的个人网站，保留所有权利。',
        credit1: '√ 冥赤龙和冥灯龙背景图片来自', credit2: '，作者为',
        credit3: '。本站已获得其', permission: '授权', credit4: '使用该图片。'
    },
    'zh-hant': {
        title: '魔物獵人物語百科頁面', iconAlt: '圖標', header: '魔物獵人物語百科頁面',
        welcome: '歡迎來到魔物獵人物語百科！',
        intro: '本百科致力於提供魔物獵人物語的攻略與相關資訊。',
        explore: '歡迎瀏覽各個頁面！', eggs: '魔物獵人物語1全蛋圖鑑',
        backPrefix: '返回', home: '首頁', backSuffix: '。',
        copyright: '© 2026 我的個人網站，保留所有權利。',
        credit1: '√ 冥赤龍與冥燈龍背景圖片來自', credit2: '，作者為',
        credit3: '。本站已獲得其', permission: '授權', credit4: '使用該圖片。'
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
    document.getElementById('wikiLink').href = `../?lang=${lang}`;
    localStorage.setItem('preferred_lang', lang);
    if (typeof updateDateDisplay === 'function') updateDateDisplay(new Date());
}

window.addEventListener('DOMContentLoaded', () => {
    const requested = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('preferred_lang');
    changeLanguage(translations[requested] ? requested : saved);
    document.getElementById('languageSelect').addEventListener('change', event => changeLanguage(event.target.value));
});
