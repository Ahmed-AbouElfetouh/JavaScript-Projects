const allImages = document.querySelectorAll('#slider-container img');
const arrayFromImages = Array.from(allImages); // iam not use this in the app
let slidesLength = allImages.length;
let startSlide = 1;
const numberOfSlidesEl = document.getElementById('slide-number');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const bulletsContainer = document.getElementById('numbers');

const bulletsUl = document.createElement('ul');
bulletsUl.id = 'bullets';
for (let i = 1; i <= slidesLength; i++) {
  const bulletsLi = document.createElement('li');
  bulletsLi.setAttribute('data-number', i);
  const bulletsLiText = document.createTextNode(i);
  bulletsLi.appendChild(bulletsLiText);
  bulletsUl.appendChild(bulletsLi);
}
bulletsContainer.appendChild(bulletsUl);

const theCreatedBullets = document.getElementById('bullets');
const theCreatedBulletsLi = theCreatedBullets.childNodes;

theCreatedBulletsLi.forEach((bullet) => {
  bullet.addEventListener('click', function () {
    startSlide = parseInt(this.dataset.number);
    checker();
  });
});

const removeActiveHandler = function () {
  allImages.forEach((img) => {
    img.classList.remove('active');
  });
  theCreatedBulletsLi.forEach((bullet) => {
    bullet.classList.remove('active');
  });
};

const addOrRemoveDesiableClassHandler = function () {
  if (startSlide == 1) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }

  if (startSlide == slidesLength) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
};

const checker = function () {
  numberOfSlidesEl.textContent = `Slide ${startSlide} of ${slidesLength}`;
  removeActiveHandler();
  allImages[startSlide - 1].classList.add('active');
  theCreatedBulletsLi[startSlide - 1].classList.add('active');
  addOrRemoveDesiableClassHandler();
};
checker();


const nextSliderHandler = function () {
  if (nextBtn.classList.contains('disabled')) {
    return;
  } else {
    startSlide++;
    checker();
  }
};

const prevSliderHandler = function () {
  if (prevBtn.classList.contains('disabled')) {
    return;
  } else {
    startSlide--;
    checker();
  }
};

nextBtn.addEventListener('click', nextSliderHandler);
prevBtn.addEventListener('click', prevSliderHandler);
