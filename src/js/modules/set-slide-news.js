export function setSlideNews() {
  const rightBtn = document.querySelector(`.news__slide-button--right`);
  const leftBtn = document.querySelector(`.news__slide-button--left`);
  const container = document.querySelector(`.news__slider-container`);
  const slideItem = document.querySelector(`.news__item`);
  const slideItems = document.querySelectorAll(`.news__item`);
  const mainSlide = document.querySelector(`.news__wrapper`);
  const slidesCount = mainSlide.querySelectorAll(`li`).length;

  let activeSlideIndex = 0;

  let slidesOnView = Math.floor(container.clientWidth / slideItem.clientWidth);
  let stepCount = slidesCount - slidesOnView;

  function handleAnimationEnd() {
    mainSlide.classList.remove(`news__ease-in`);
  }

  function getStepCount() {
    slidesOnView = Math.floor(container.clientWidth / slideItem.clientWidth);
    if (slidesCount < slidesOnView) {
      stepCount = 0;
    } else {
      stepCount = slidesCount - slidesOnView;
    }
    if (stepCount === slidesCount) {
      stepCount--;
    }
    return stepCount;
  }

  rightBtn.addEventListener(`click`, () => {
    changeSlide(`right`);
  });

  leftBtn.addEventListener(`click`, () => {
    changeSlide(`left`);
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `ArrowRight`) {
      changeSlide(`right`);
    }
    if (evt.key === `ArrowLeft`) {
      changeSlide(`left`);
    }
  });

  window.addEventListener(`resize`, function () {
    mainSlide.style.transform = `translateX(0px)`;
    if (document.body.clientWidth < 959) {
      getStepCount();
      console.log(`getStepCount(): `, getStepCount());
      activeSlideIndex = 0;
    }
  });

  function changeSlide(direction) {
    mainSlide.classList.add(`news__ease-in`);
    if (direction === `right`) {
      activeSlideIndex++;
      if (activeSlideIndex === stepCount + 1) {
        activeSlideIndex = 0;
      }
    } else if (direction === `left`) {
      activeSlideIndex--;
      if (activeSlideIndex < 0) {
        activeSlideIndex = stepCount;
      }
    }

    const length = slideItem.clientWidth;

    if (document.body.clientWidth < 959) {
      mainSlide.style.transform = `translateX(-${activeSlideIndex * length}px)`;
      setTimeout(handleAnimationEnd, 500);
    }
  }

  slideItems.forEach((item) => {
    item.addEventListener(`touchstart`, handleTouchStart, false);
    item.addEventListener(`touchmove`, handleTouchMove, false);
  });

  let xDown = null;
  let yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        changeSlide(`right`);
      } else {
        changeSlide(`left`);
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}
