const Player = class {
  constructor(name, options = ["rock", "paper", "scissors"], score = 0) {
    this.name = name;
    this.score = score;
    this.options = options;
    this.renderCard();
  }

  increment() {
    this.score++;
  }

  reset() {
    this.score = 0;
  }

  renderCard() {
    const app = document.getElementById("app");
    const newPlayerDiv = createDOMElement("div", "player");
    const title = createDOMElement("h3", "player__title", this.name);
    const score = createDOMElement(
      "h3",
      "player__score",
      `results: ${this.score}`
    );
    newPlayerDiv.appendChild(title);
    newPlayerDiv.appendChild(score);
    app.appendChild(newPlayerDiv);
    this.options
      .map(createImgElement)
      .forEach(option => newPlayerDiv.appendChild(option));
  }
};
