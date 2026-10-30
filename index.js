// Minecraft 存档维护区：name = 存档名；playtime = 游玩时间；created = 创建时间。
const minecraftWorlds = [
    {
        "name": "A New Hope",
        "playtime": {
            "en-us": "596.4 hours",
            "zh-hans": "596.4 小时",
            "zh-hant": "596.4 小時"
        },
        "created": {
            "en-us": "July 9 2023",
            "zh-hans": "2023年7月9日",
            "zh-hant": "2023年7月9日"
        }
    },
    {
        "name": "丛林",
        "playtime": {
            "en-us": "13.9 hours*",
            "zh-hans": "13.9 小时*",
            "zh-hant": "13.9 小時*"
        },
        "created": {
            "en-us": "August 16 2016",
            "zh-hans": "2016年8月16日",
            "zh-hant": "2016年8月16日"
        }
    },
    {
        "name": "Isle of Berk",
        "playtime": {
            "en-us": "214.2 hours",
            "zh-hans": "214.2 小时",
            "zh-hant": "214.2 小時"
        },
        "created": {
            "en-us": "September 29 2023",
            "zh-hans": "2023年9月29日",
            "zh-hant": "2023年9月29日"
        }
    },
    {
        "name": "Null",
        "playtime": {
            "en-us": "Null",
            "zh-hans": "Null",
            "zh-hant": "Null"
        },
        "created": {
            "en-us": "Null",
            "zh-hans": "Null",
            "zh-hant": "Null"
        }
    },
    {
        "name": "Minecraft",
        "playtime": {
            "en-us": "83.76 hours",
            "zh-hans": "83.76 小时",
            "zh-hant": "83.76 小時"
        },
        "created": {
            "en-us": "July 13 2022",
            "zh-hans": "2022年7月13日",
            "zh-hant": "2022年7月13日"
        }
    },
    {
        "name": "Null",
        "playtime": {
            "en-us": "Null",
            "zh-hans": "Null",
            "zh-hant": "Null"
        },
        "created": {
            "en-us": "Null",
            "zh-hans": "Null",
            "zh-hant": "Null"
        }
    }
];
const translations = {
    "en-us": {
        "title": "FlashDragon's Home",
        "home1": " FlashDragon's Home",
        "home5": "Welcome to my home on the Internet!",
        "home6": "Here are my more accounts:",
        "home7": "Bilibili",
        "home8": "Tieba",
        "home9": "MCMod",
        "home10": "KLPBBS",
        "home11": "Bahamut",
        "home12": "MCBBS(Memorial Edition)",
        "home20": "I like playing video games, and there are some strategies on my website: ",
        "home21": "Wiki Content",
        "home22": ".",
        "home23": "I have archived some forums' pages here: ",
        "home24": "Internet Forums archive",
        "home25": ".",
        "home26": "There are some test pages on my website: ",
        "home27": "Test Pages Index",
        "home28": ".",
        "home29": "Actually, I'm still learning how to write websites. And wishing to improve my skills soon.",
        "home30": "Local Time",
        "home32": "2026 August 6, Thursday",
        "home33": "12H",
        "home34": "24H",
        "home35": "Show/Hide Seconds",
        "home36": "\n                    © 2026 My own website, all rights reserved.\n                ",
        "home37": "\n                    √ The Safi'jiiva and Xeno'jiiva background image comes from \n                    ",
        "home39": " and was created by \n                    ",
        "home41": ". This site has obtained \n                    ",
        "home42": "permission",
        "home43": " to use it.\n                ",
        "mc2": "Minecraft worlds showcase · top maps by my favorite",
        "mc3": "First played",
        "mc4": "8/21/2014",
        "mc5": "First version",
        "mc7": "Buy a genuine copy",
        "mc8": "4/29/2023",
        "mc9": "Recent version",
        "mc11": "Java Edition",
        "mc12": "Bedrock Edition",
        "mc14": "Playtime: ",
        "mc16": "Created: ",
        "mc19": "Playtime: ",
        "mc21": "Created: ",
        "mc24": "Playtime: ",
        "mc26": "Created: ",
        "mc29": "Playtime: ",
        "mc31": "Created: ",
        "mc34": "Playtime: ",
        "mc36": "Created: ",
        "mc39": "Playtime: ",
        "mc41": "Created: ",
        "mc43": "*Since December 24 2025, because the original file was damanged.",
        "mc44": "Last updated: Aug 15, 2026 ·Manual update."
    },
    "zh-hans": {
        "title": "FlashDragon的主页",
        "home1": " FlashDragon的主页",
        "home5": "欢迎来到我的互联网主页！",
        "home6": "这些是我的更多账号：",
        "home7": "哔哩哔哩",
        "home8": "贴吧",
        "home9": "MC百科",
        "home10": "苦力怕论坛",
        "home11": "巴哈姆特",
        "home12": "MCBBS（纪念版）",
        "home20": "我喜欢玩电子游戏，我的网站上有一些攻略：",
        "home21": "百科目录",
        "home22": "。",
        "home23": "我在这里保存了一些论坛的页面：",
        "home24": "网络论坛档案馆",
        "home25": "。",
        "home26": "我的网站上有一些测试页面：",
        "home27": "测试页面目录",
        "home28": "。",
        "home29": "实际上，我仍然在学习如何写网站。希望我可以很快提高技能。",
        "home30": "本地时间",
        "home32": "2026年8月6日 星期四",
        "home33": "12小时制",
        "home34": "24小时制",
        "home35": "显示/隐藏秒",
        "home36": "\n                    © 2026 我的网站，保留所有权利。\n                ",
        "home37": "\n                    √ 冥赤龙和冥灯龙背景图来源于\n                    ",
        "home39": "，作者是\n                    ",
        "home41": "，本站已获得\n                    ",
        "home42": "使用权",
        "home43": "。\n                ",
        "mc2": "Minecraft 存档展示 · 按我的喜好排列",
        "mc3": "首次游玩",
        "mc4": "2014/8/21",
        "mc5": "首个版本",
        "mc7": "购买正版",
        "mc8": "2023/4/29",
        "mc9": "最近版本",
        "mc11": "Java 版",
        "mc12": "基岩版",
        "mc14": "游玩时长：",
        "mc16": "创建于：",
        "mc19": "游玩时长：",
        "mc21": "创建于：",
        "mc24": "游玩时长：",
        "mc26": "创建于：",
        "mc29": "游玩时长：",
        "mc31": "创建于：",
        "mc34": "游玩时长：",
        "mc36": "创建于：",
        "mc39": "游玩时长：",
        "mc41": "创建于：",
        "mc43": "*自2025年12月24日起，因为原始文件损坏了。",
        "mc44": "最后更新：2026年8月15日 · 手动更新。"
    },
    "zh-hant": {
        "title": "FlashDragon的主頁",
        "home1": " FlashDragon的主頁",
        "home5": "歡迎來到我的互聯網主頁！",
        "home6": "這些是我的更多賬號：",
        "home7": "嗶哩嗶哩",
        "home8": "貼吧",
        "home9": "MC百科",
        "home10": "苦力怕論壇",
        "home11": "巴哈姆特",
        "home12": "MCBBS（紀念版）",
        "home20": "我喜歡玩電子游戲，我的網站上有一些攻略：",
        "home21": "百科目錄",
        "home22": "。",
        "home23": "我在這裏保存了一些網絡論壇的頁面：",
        "home24": "網絡論壇檔案館",
        "home25": "。",
        "home26": "我的網站上有一些測試頁面：",
        "home27": "測試頁面目錄",
        "home28": "。",
        "home29": "實際上，我仍然在學習如何寫網站。希望我可以很快提高技能。",
        "home30": "本地時間",
        "home32": "2026年8月6日 星期四",
        "home33": "12小時制",
        "home34": "24小時制",
        "home35": "顯示/隱藏秒",
        "home36": "\n                    © 2026 我的網站，保留所有權利。\n                ",
        "home37": "\n                    √ 冥赤龍和冥燈龍背景圖來源於\n                    ",
        "home39": "，作者是\n                    ",
        "home41": "，本站已獲得\n                    ",
        "home42": "使用權",
        "home43": "。\n                ",
        "mc2": "Minecraft 存檔展示 · 按我的喜好排列",
        "mc3": "首次遊玩",
        "mc4": "2014/8/21",
        "mc5": "首個版本",
        "mc7": "購買正版",
        "mc8": "2023/4/29",
        "mc9": "最近版本",
        "mc11": "Java 版",
        "mc12": "基巖版",
        "mc14": "遊玩時長：",
        "mc16": "建立於：",
        "mc19": "遊玩時長：",
        "mc21": "建立於：",
        "mc24": "遊玩時長：",
        "mc26": "建立於：",
        "mc29": "遊玩時長：",
        "mc31": "建立於：",
        "mc34": "遊玩時長：",
        "mc36": "建立於：",
        "mc39": "遊玩時長：",
        "mc41": "建立於：",
        "mc43": "*自2025年12月24日起，因為原始檔案損壞了。",
        "mc44": "最後更新：2026年8月15日 · 手動更新。"
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
    document.title = translations[lang].title;
    document.getElementById('languageSelect').value = lang;
    document.querySelectorAll('[data-world]').forEach(element => {
        const value = minecraftWorlds[element.dataset.world][element.dataset.field];
        element.textContent = typeof value === 'string' ? value : value[lang];
        if (element.dataset.field === 'name') element.title = element.textContent;
    });
    document.getElementById('steamDataFrame').src = `iframe/steam-data.html?lang=${lang}`;
    document.querySelectorAll('a[href^="wiki/"]').forEach(link => link.href = `wiki/?lang=${lang}`);
    document.querySelectorAll('a[href^="bbs/"]').forEach(link => link.href = `bbs/?lang=${lang}`);
    localStorage.setItem('preferred_lang', lang);
    if (typeof updateDateDisplay === 'function') updateDateDisplay(new Date());
}

window.addEventListener('DOMContentLoaded', () => {
    const requested = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('preferred_lang');
    changeLanguage(translations[requested] ? requested : saved);
    document.getElementById('languageSelect').addEventListener('change', event => changeLanguage(event.target.value));
});
