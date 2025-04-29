const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;
let autoSlideInterval;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 33.333}%)`;
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
    } else {
        // Reset to first slide without animation
        carousel.style.transition = 'none';
        currentSlide = 0;
        updateCarousel();
        // Force reflow
        carousel.offsetHeight;
        // Restore animation
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }
    updateCarousel();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        // Jump to last slide without animation
        carousel.style.transition = 'none';
        currentSlide = slides.length - 1;
        updateCarousel();
        // Force reflow
        carousel.offsetHeight;
        // Restore animation
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }
    updateCarousel();
}

// Auto slide every 3 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Start auto sliding
startAutoSlide();

// Stop auto sliding when hovering over carousel
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

// Button controls
prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

// Navigation scroll effect
const nav = document.querySelector('.nav-container');
const carouselContainer = document.querySelector('.carousel-container');
const carouselBottom = carouselContainer.offsetTop + carouselContainer.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > carouselBottom - 100) {
        nav.classList.add('fixed');
    } else {
        nav.classList.remove('fixed');
    }
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}); 