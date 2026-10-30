const translations = {
    "en-us": {
        "title": "Internet Forums Archive",
        "iconAlt": "Icon",
        "header": " Internet Forums Archive",
        "intro": "I have archived some forums' pages here:",
        "originalPrefix": "KLPBBS: ",
        "forum": "Minecraft Creeper Forum",
        "period": ".",
        "beautyPrefix": "KLPBBS (With ",
        "beauty": "KLPBBS Beauty Script",
        "beautySuffix": "): ",
        "backPrefix": "Back to ",
        "home": "Home Page",
        "backSuffix": ".",
        "localTime": "Local Time",
        "hour12": "12H",
        "hour24": "24H",
        "seconds": "Show/Hide Seconds",
        "copyright": "© 2026 My own website, all rights reserved.",
        "credit1": "√ The Safi'jiiva and Xeno'jiiva background image comes from ",
        "credit2": " and was created by ",
        "credit3": ". This site has obtained ",
        "permission": "permission",
        "credit4": " to use it."
    },
    "zh-hans": {
        "title": "网络论坛档案馆",
        "iconAlt": "图标",
        "header": " 网络论坛档案馆",
        "intro": "我在这里保存了一些网络论坛的页面：",
        "originalPrefix": "KLPBBS：",
        "forum": "Minecraft苦力怕论坛",
        "period": "。",
        "beautyPrefix": "KLPBBS（使用",
        "beauty": "KLPBBS Beauty脚本",
        "beautySuffix": "）：",
        "backPrefix": "返回",
        "home": "首页",
        "backSuffix": "。",
        "localTime": "本地时间",
        "hour12": "12小时制",
        "hour24": "24小时制",
        "seconds": "显示/隐藏秒",
        "copyright": "© 2026 我的个人网站，保留所有权利。",
        "credit1": "√ 冥赤龙和冥灯龙背景图片来自",
        "credit2": "，作者为",
        "credit3": "。本站已获得其",
        "permission": "授权",
        "credit4": "使用该图片。"
    },
    "zh-hant": {
        "title": "網絡論壇檔案館",
        "iconAlt": "圖標",
        "header": " 網絡論壇檔案館",
        "intro": "我在這裏保存了一些網絡論壇的頁面：",
        "originalPrefix": "KLPBBS：",
        "forum": "Minecraft苦力怕論壇",
        "period": "。",
        "beautyPrefix": "KLPBBS（使用",
        "beauty": "KLPBBS Beauty指令碼",
        "beautySuffix": "）：",
        "backPrefix": "返回",
        "home": "首頁",
        "backSuffix": "。",
        "localTime": "本地時間",
        "hour12": "12小時制",
        "hour24": "24小時制",
        "seconds": "顯示／隱藏秒數",
        "copyright": "© 2026 我的個人網站，保留所有權利。",
        "credit1": "√ 冥赤龍與冥燈龍背景圖片來自",
        "credit2": "，作者為",
        "credit3": "。本站已獲得其",
        "permission": "授權",
        "credit4": "使用該圖片。"
    }
};

function changeLanguage(lang) {
    if (!Object.hasOwn(translations, lang)) lang = 'en-us';
    document.querySelectorAll('[data-key]').forEach(element => {
        element.textContent = translations[lang][element.dataset.key];
    });
    document.querySelectorAll('[data-key-alt]').forEach(element => {
        element.alt = translations[lang][element.dataset.keyAlt];
    });
    document.documentElement.lang = lang;
    document.getElementById('languageSelect').value = lang;
    document.getElementById('homeLink').href = `../index.html?lang=${lang}`;
    localStorage.setItem('preferred_lang', lang);
    if (typeof updateDateDisplay === 'function') updateDateDisplay(new Date());
}
window.addEventListener('DOMContentLoaded', () => {
    const requested = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('preferred_lang');
    changeLanguage(Object.hasOwn(translations, requested) ? requested : saved);
    document.getElementById('languageSelect').addEventListener('change', event => changeLanguage(event.target.value));
});
