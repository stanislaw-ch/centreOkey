export function setToggle() {
  const toggle = document.querySelector(`.main-nav__toggle`);
  const mainNav = document.querySelector(`.main-nav`);

  toggle.addEventListener(`click`, () => {
    if (mainNav.classList.contains(`main-nav--opened`)) {
      mainNav.classList.remove(`main-nav--opened`);
      mainNav.classList.add(`main-nav--closed`);
    } else if (mainNav.classList.contains(`main-nav--closed`)) {
      mainNav.classList.remove(`main-nav--closed`);
      mainNav.classList.add(`main-nav--opened`);
    }
  });
}
