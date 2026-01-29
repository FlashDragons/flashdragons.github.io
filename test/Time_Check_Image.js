// 图片配置
const imageConfig = {
    // 按时间段
    timeOfDay: {
        morning: { 
            image: 'https://flashdragons.github.io/test/assets/Morning.jpg',
            name: '早晨',
            hours: [6, 7, 8]
        },
        day: { 
            image: 'https://flashdragons.github.io/test/assets/Day.jpg',
            name: '日间', 
            hours: [9, 10, 11, 12, 13, 14, 15, 16]
        },
        afternoon: { 
            image: 'https://flashdragons.github.io/test/assets/Afternoon.jpg',
            name: '傍晚', 
            hours: [17, 18, 19]
        },
        night: { 
            image: 'https://flashdragons.github.io/test/assets/Night.jpg',
            name: '夜晚', 
            hours: [20, 21, 22, 23, 0, 1, 2, 3, 4, 5]
        }
    },
    // 按季节
    seasons: {
        spring: { 
            image: 'https://flashdragons.github.io/test/assets/Morning.jpg',
            name: '春季',
            months: [3, 4, 5]
        },
        summer: { 
            image: 'https://flashdragons.github.io/test/assets/Day.jpg',
            name: '夏季',
            months: [6, 7, 8]
        },
        autumn: { 
            image: 'https://flashdragons.github.io/test/assets/Afternoon.jpg',
            name: '秋季',
            months: [9, 10, 11]
        },
        winter: { 
            image: 'https://flashdragons.github.io/test/assets/Noon.jpg',
            name: '冬季',
            months: [12, 1, 2]
        }
    },
    
    // 按星期（备用）
    weekdays: [
        { image: 'sunday.jpg', name: '星期日' },
        { image: 'monday.jpg', name: '星期一' },
        { image: 'tuesday.jpg', name: '星期二' },
        { image: 'wednesday.jpg', name: '星期三' },
        { image: 'thursday.jpg', name: '星期四' },
        { image: 'friday.jpg', name: '星期五' },
        { image: 'saturday.jpg', name: '星期六' }
    ]
};
// 获取当前时间信息
function getCurrentTimeInfo() {
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth() + 1;
    const weekday = now.getDay();
    
    return { hour, month, weekday, now };
}
// 获取时间段
function getTimePeriod(hour) {
    for (const [period, config] of Object.entries(imageConfig.timeOfDay)) {
        if (config.hours.includes(hour)) {
            return { period, name: config.name, image: config.image };
        }
    }
    return { period: 'default', name: '默认', image: 'https://flashdragons.github.io/test/assets/Ancient_Forest.jpg' };
}
// 获取季节
function getSeason(month) {
    for (const [season, config] of Object.entries(imageConfig.seasons)) {
        if (config.months.includes(month)) {
            return { season, name: config.name, image: config.image };
        }
    }
    return { season: 'default', name: '默认', image: 'https://flashdragons.github.io/test/assets/Ancient_Forest.jpg' };
}
// 获取星期名称
function getWeekdayName(weekday) {
    const names = ['日', '一', '二', '三', '四', '五', '六'];
    return `星期${names[weekday]}`;
}
// 更新页面
function updatePage() {
    const { hour, month, weekday, now } = getCurrentTimeInfo();
    const timePeriod = getTimePeriod(hour);
    const season = getSeason(month);
    const weekdayName = getWeekdayName(weekday);
    // 更新时间显示
    const timeString = now.toLocaleTimeString('zh-CN');
    document.getElementById('currentTime').textContent = timeString;
    document.getElementById('timePeriod').textContent = timePeriod.name;
    document.getElementById('currentSeason').textContent = season.name;
    document.getElementById('currentWeekday').textContent = weekdayName;
    // 更新图片（这里使用时间段图片，你也可以改为季节图片）
    const imageElement = document.getElementById('dynamicImage');
    imageElement.src = timePeriod.image;
    imageElement.alt = `${timePeriod.name}图片`;
    // 更新描述
    document.getElementById('imageDescription').textContent = 
        `现在是${season.name}的${timePeriod.name}，${weekdayName} ${timeString}`;
}
// 初始加载
updatePage();
// 每分钟更新一次
setInterval(updatePage, 60000);
// 添加图片加载错误处理
document.getElementById('dynamicImage').onerror = function() {
    this.src = 'https://flashdragons.github.io/test/assets/Safijiiva+Xenojiiva.jpg';
    this.alt = '默认图片';
};