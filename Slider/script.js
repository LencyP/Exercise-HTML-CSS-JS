let images = [
    'https://i.redd.it/svi2zx472xr41.jpg',
    'https://images-cdn.9gag.com/photo/aEgeLgx_700b.jpg',
    'https://inteng-storage.s3.amazonaws.com/img/iea/lV6D8ka06x/problem-solve-like-programmer-meme.jpg',
    'https://vincentdnl.com/static/d39b503cebf83760d389b29b8c66d03b/6a068/semicolon2.jpg',
];

let currentImage = 0;
let sliderImage = document.querySelector('.slider_image');
let nextBtn = document.querySelector('.slider_button-next');
let prevBtn = document.querySelector('.slider_button-prev');
let playBtn = document.querySelector('.slider_button-play');

//display next img of the slider
function nextImage() {
    if (currentImage < images.length - 1) {
        currentImage++;
    } else {
        currentImage = 0;
    }
    sliderImage.src = images[currentImage];
}

//display prev img of the slider
function prevImage() {
    if (currentImage > 0) {
        currentImage--;
    } else {
        currentImage = images.length - 1;
    }
    sliderImage.src = images[currentImage];
}


//autoplay prev imgs of the slider
let interval;

function autoplay() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    } else {
        interval = setInterval(() => {
            nextImage();
        }, 1000);
    }

    playBtn.children[0].classList.toggle('fa-play');
    playBtn.children[0].classList.toggle('fa-pause');
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
playBtn.addEventListener('click', autoplay);