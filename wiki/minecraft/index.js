const translations = {
    'en-us': {
        title: 'Minecraft Wiki Page', iconAlt: 'Icon', header: 'Minecraft Wiki Page',
        welcome: 'Welcome to the Minecraft Wiki!', empty: 'Sorry, there are nothing here currently.',
        copyright: '© 2026 My own website, all rights reserved.', footerEmpty: 'Empty here...'
    },
    'zh-hans': {
        title: 'Minecraft百科页面', iconAlt: '图标', header: 'Minecraft百科页面',
        welcome: '欢迎来到我的世界百科目录！', empty: '抱歉，这里目前还没有内容。',
        copyright: '© 2026 我的个人网站，保留所有权利。', footerEmpty: '这里暂时是空的……'
    },
    'zh-hant': {
        title: 'Minecraft百科頁面', iconAlt: '圖標', header: 'Minecraft百科頁面',
        welcome: '歡迎來到我的世界百科目錄！', empty: '抱歉，這裡目前還沒有內容。',
        copyright: '© 2026 我的個人網站，保留所有權利。', footerEmpty: '這裡暫時是空的……'
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
    if (typeof updateDateDisplay === 'function') updateDateDisplay(new Date());
}

window.addEventListener('DOMContentLoaded', () => {
    changeLanguage(siteLanguage.resolve());
    document.getElementById('languageSelect').addEventListener('change', event => {
        siteLanguage.save(event.target.value);
        changeLanguage(event.target.value);
    });
});
