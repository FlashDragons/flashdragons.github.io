const images = [
    "https://flashdragons.github.io/assets/pics/background-1.webp",
    "https://flashdragons.github.io/assets/pics/background-3.webp",
    "https://flashdragons.github.io/assets/pics/background-5.webp",
    "https://flashdragons.github.io/assets/pics/background-7.webp",
    "https://flashdragons.github.io/assets/pics/background-9.webp",
];

const slides = document.querySelectorAll(".background-slide");

let currentIndex = 0;
let visibleSlide = 0;

// 设置第一张背景
slides[0].style.backgroundImage = `url("${images[0]}")`;

// 预加载图片，避免切换时闪白
images.forEach((src) => {
    const image = new Image();
    image.src = src;
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;

    const currentSlide = slides[visibleSlide];
    const nextSlide = slides[1 - visibleSlide];

    nextSlide.style.backgroundImage =
    `url("${images[currentIndex]}")`;

    nextSlide.classList.add("is-active");
    currentSlide.classList.remove("is-active");

    visibleSlide = 1 - visibleSlide;
}, 6000);
