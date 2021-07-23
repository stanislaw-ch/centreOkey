export function onNavClick(className, classNameActive) {
  const nodeElement = document.querySelectorAll(`.${className}`);

  function removeActiveClass() {
    nodeElement.forEach((item) => {
      item.classList.remove(classNameActive);
    });
  }

  nodeElement.forEach((element) => {
    element.addEventListener(`click`, (evt) => {
      removeActiveClass();
      if (evt.target.parentElement.classList.contains(className)) {
        evt.target.parentElement.classList.add(classNameActive);
      }
    });
  });
}
