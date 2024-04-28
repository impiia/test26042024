const supportButton = document.querySelector('.button--dark');
const aboutButton = document.querySelector('.button--transparent');
const supportBlock = document.querySelector('#supportBlock');
const aboutBlock = document.querySelector('#aboutBlock');

supportButton.addEventListener('click', (e) => {
    e.preventDefault();
    supportBlock.scrollIntoView({ behavior: 'smooth' });
});

aboutButton.addEventListener('click', (e) => {
    e.preventDefault();
    aboutBlock.scrollIntoView({ behavior: 'smooth' });
});


window.onload = function () {
    let runningTexts = document.querySelectorAll('.runningText');

    runningTexts.forEach((runningText) => {
        let clone = runningText.cloneNode(true);
        runningText.appendChild(clone);
        let speed = 1;
        let position = 0;
        function updatePosition() {
            position -= speed;
            runningText.style.transform = 'translateX(' + position + 'px)';
            if (position <= -runningText.offsetWidth / 2) {
                position = 0;
            }
        }
        setInterval(updatePosition, 1000 / 60);
    });
};

const MOBILE_SLIDE_WIDTH = 100;
const DESKTOP_SLIDE_WIDTH = 33.33;

let slideIndex = 0;
const slides = document.querySelectorAll('.player');
const totalSlides = slides.length;

function updateSlideIndex(increment) {
    const slideCount = window.innerWidth > 768 ? 3 : 1;
    slideIndex += increment * slideCount;
    if (slideIndex < 0) {
        slideIndex = totalSlides - slideCount;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
}

document.getElementById('prevBtn').addEventListener('click', () => {
    updateSlideIndex(-1);
    updateSliderPosition();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    updateSlideIndex(1);
    updateSliderPosition();
});

function updateSliderPosition() {
    const slideWidth = window.innerWidth <= 768 ? MOBILE_SLIDE_WIDTH : DESKTOP_SLIDE_WIDTH;
    document.getElementById('slide-track').style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    let slideNumber = slideIndex + 1;
    if (window.innerWidth > 768) {
        slideNumber = slideIndex + 3;
    }
    document.querySelector('.slide-number').textContent = `${slideNumber} / 6`;
}

setInterval(() => {
    updateSlideIndex(1);
    updateSliderPosition();
}, 4000);

window.addEventListener('resize', updateSliderPosition);

let slideIndex2 = 0;
const slides2 = document.querySelectorAll('.stage-slide');
const totalSlides2 = slides2.length;
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function updateButtons() {
    prevButton.disabled = slideIndex2 === 0;
    nextButton.disabled = slideIndex2 === totalSlides2 - 1;
}

prevButton.addEventListener('click', () => {
    slideIndex2 = (slideIndex2 > 0) ? slideIndex2 - 1 : 0;
    updateSliderPosition2();
    updateButtons();
});

nextButton.addEventListener('click', () => {
    slideIndex2 = (slideIndex2 < totalSlides2 - 1) ? slideIndex2 + 1 : 0;
    updateSliderPosition2();
    updateButtons();
});

function updateSliderPosition2() {
    const slideWidth = 100;
    document.getElementById('slider').style.transform = `translateX(-${slideIndex2 * slideWidth}%)`;
    updateButtons();
}

updateButtons();



