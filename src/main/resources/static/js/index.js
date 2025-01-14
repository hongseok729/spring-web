let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const indicators = document.querySelectorAll('.slider-indicator .indicator');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

window.addEventListener('load', () => {
    const sliderImage = slides[0];
    const imageWidth = sliderImage.offsetWidth;
    const boxWidth = imageWidth / 2;

    const boxes = document.querySelectorAll('.info-box .box');
    boxes.forEach(box => {
        box.style.width = boxWidth + 'px';
    });
});

showSlide(currentSlide);
setInterval(nextSlide, 5000); // 5초마다 자동 슬라이드
