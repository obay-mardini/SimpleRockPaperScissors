(function() {
  class Player {
    constructor(name, options = ["rock", "paper", "scissors"], score = 0) {
      this.name = name;
      this.score = score;
      this.options = options;
      this.option = "";
      this.renderPlayer();
    }

    increment() {
      this.score++;
    }

    reset() {
      this.score = 0;
    }

    pickOption(option) {
      this.option = option;
    }

    renderPlayer() {
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
        .map(img => {
          img.onclick = e => {
            this.pickOption(e.target.value);
          };
          return img;
        })
        .forEach(option => newPlayerDiv.appendChild(option));
    }
  }
  window.Player = Player;
})();
