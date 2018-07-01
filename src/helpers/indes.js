function createDOMElement(type, className, innerText = "") {
  const element = document.createElement(type);
  element.className = className;
  element.innerText = innerText;
  return element;
}

function createImgElement(option) {
  const img = document.createElement("img");
  img.src = `src/assets/images/${option}.svg`;
  img.alt = option;
  img.className = "player__img";
  return img;
}
