// 配置变量
let config = {
    format24: true,           // 24小时制
    showSeconds: true,        // 显示秒
    showMilliseconds: false,  // 显示毫秒
    timezone: 'local',        // 时区
    smooth: true              // 平滑过渡
};

// 初始化
function initClock() {
    updateClock();
    
    if (config.smooth) {
        // 平滑动画更新
        requestAnimationFrame(smoothUpdate);
    } else {
        // 普通更新
        setInterval(updateClock, config.showMilliseconds ? 10 : 1000);
    }
    
    updateControls();
}

// 更新时钟显示
function updateClock() {
    const now = new Date();
    let displayDate;

    // 处理时区
    if (config.timezone === 'UTC') {
        displayDate = new Date(now.toUTCString().replace(' GMT', ''));
        } else if (config.timezone !== 'local') {
        // 使用Intl API处理时区
        displayDate = new Date(
            now.toLocaleString('en-US', { timeZone: config.timezone })
        );
    } else {
        displayDate = now;
    }
    
    // 更新时间显示
    updateTimeDisplay(displayDate);
    
    // 更新日期显示
    updateDateDisplay(displayDate);
}

// 更新时间部分
function updateTimeDisplay(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    
// 处理12小时制
    let ampm = '';
    if (!config.format24) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0点转为12点
    }
    
    // 格式化数字
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    milliseconds = milliseconds.toString().padStart(3, '0');

    // 构建时间字符串
    let timeString;
    if (config.showMilliseconds) {
            timeString = `${hours}:${minutes}:${seconds}.${milliseconds}`;
        } else if (config.showSeconds) {
        timeString = `${hours}:${minutes}:${seconds}`;
    } else {
        timeString = `${hours}:${minutes}`;
    }

    timeString += ampm;

    // 更新显示
    document.getElementById('timeDisplay').textContent = timeString;
}

// 更新日期部分
function updateDateDisplay(date) {
    const pageLanguage = document.documentElement.lang.toLowerCase();
    const year = date.getFullYear();
    const day = date.getDate();
    let dateString;

    if (pageLanguage === 'zh-hant' || pageLanguage.startsWith('zh-tw') || pageLanguage.startsWith('zh-hk')) {
        const weekday = date.toLocaleDateString('zh-Hant', { weekday: 'long' });
        dateString = `${year}年${date.getMonth() + 1}月${day}日 ${weekday}`;
    } else if (pageLanguage === 'zh-hans' || pageLanguage.startsWith('zh-cn') || pageLanguage.startsWith('zh-sg')) {
        const weekday = date.toLocaleDateString('zh-Hans', { weekday: 'long' });
        dateString = `${year}年${date.getMonth() + 1}月${day}日 ${weekday}`;
    } else {
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        dateString = `${year} ${month} ${day}, ${weekday}`;
    }

    document.getElementById('dateDisplay').textContent = dateString;
}

// 平滑更新（使用requestAnimationFrame）
let lastUpdateTime = 0;
function smoothUpdate(timestamp) {
    if (!lastUpdateTime) lastUpdateTime = timestamp;

    const interval = config.showMilliseconds ? 10 : 1000;
    if (timestamp - lastUpdateTime >= interval) {
    updateClock();
    lastUpdateTime = timestamp - (timestamp % interval);
    }

    requestAnimationFrame(smoothUpdate);
}

// 控制函数
function toggleFormat(format) {
    config.format24 = (format === 24);
    updateControls();
    updateFormatInfo();
}

function toggleSeconds() {
    config.showSeconds = !config.showSeconds;
    if (!config.showSeconds) {
        config.showMilliseconds = false;
    }
    updateControls();
    updateFormatInfo();
}

function toggleMilliseconds() {
    config.showMilliseconds = !config.showMilliseconds;
    if (config.showMilliseconds) {
        config.showSeconds = true;
    }
    updateControls();
    updateFormatInfo();
}

function changeTimezone() {
    config.timezone = document.getElementById('timezoneSelect').value;
    updateFormatInfo();
}

// 更新控制按钮状态
function updateControls() {
    document.querySelectorAll('[data-clock-format]').forEach(btn => {
        const isActive = Number(btn.dataset.clockFormat) === (config.format24 ? 24 : 12);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });

    document.querySelectorAll('[data-clock-seconds]').forEach(btn => {
        btn.classList.toggle('active', config.showSeconds);
        btn.setAttribute('aria-pressed', String(config.showSeconds));
    });
}

// 更新格式信息
function updateFormatInfo() {
    let info = '当前使用';
    info += config.format24 ? '24小时制' : '12小时制';
    info += config.showSeconds ? '，显示秒' : '，不显示秒';
    info += '，时区：' + getTimezoneName(config.timezone);
    
    const formatInfo = document.getElementById('formatInfo');
    if (formatInfo) {
        formatInfo.textContent = info;
    }
}

// 添加数字时钟动画
//function addDigitAnimation() {
//    const timeDisplay = document.getElementById('timeDisplay');
//    const observer = new MutationObserver(() => {
//        timeDisplay.style.transform = 'scale(1.05)';
//        setTimeout(() => {
//            timeDisplay.style.transform = 'scale(1)';
//        }, 100);
//    });
//    observer.observe(timeDisplay, { childList: true });
//}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    initClock();
    updateFormatInfo();
});

// 添加页面可见性监听（优化性能）
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时停止更新
        if (window.clockInterval) {
            clearInterval(window.clockInterval);
        }
    } else {
        // 页面显示时恢复更新
        initClock();
    }
});
