(function() {
  const playerVsComputerBtn = document.getElementsByClassName(
    "app__btn--player"
  )[0];
  const computerVsComputerBtn = document.getElementsByClassName(
    "app__btn--computers"
  )[0];
  const playerVsComputerHandler = players => {
    const playerName = prompt("Please insert your name here ;)") || "Player";
    const player = new Player(playerName);
    const computer = new Player("computer");
    hideBtns();
  };

  const computerVsComputerHandler = () => {
    [1, 2].forEach((num, index) => {
      const player = new Player(`computer_${num}`);
    });
    hideBtns();
  };

  const hideBtns = () => {
    const btns = document.getElementsByClassName("app__btn");
    for (let btn of btns) {
      btn.style.visibility = "hidden";
    }
  };
  playerVsComputerBtn.onclick = playerVsComputerHandler;
  computerVsComputerBtn.onclick = computerVsComputerHandler;
})();
