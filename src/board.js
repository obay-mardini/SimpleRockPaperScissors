(function() {
  class Board {
    constructor(...players) {
      // const playersArray = players.map(player => {
      //   return new Player(player);
      // });
      this.players = players;
      this.round = 1;
      this.startTimer();
      this.renderBoard();
    }

    startTimer() {
      this.resetGameVisuals();
      setTimeout(() => {
        this.checkResults(this.players[0], this.players[1]);
      }, 3000);
    }

    resetGameVisuals() {
      changeOpacity(document.getElementById("app"), 1);
    }

    makeAllImagesBold() {}
    incrementRound() {
      this.round++;
      if (this.round === 3) {
        this.round = 1;
        return this.showWinner();
      }
      this.startTimer();
    }

    showWinner() {
      console.log(this.players[0]);
      console.log(this.players[1]);
      console.log({ rounds: this.round });
      if (this.players[0].score === this.players[1].score) {
        console.log("tie");
        return (this.winner = {});
      }
      if (this.players[0].score > this.players[1].score) {
        return (this.winner = this.players[0].name);
      }

      return (this.winner = this.players[1].name);
    }

    checkResults(firstPlayer, secondPlayer) {
      const { option: firstPlayerChoice } = firstPlayer;
      const { option: secondPlayerChoice } = secondPlayer;

      if (firstPlayerChoice === secondPlayerChoice) {
        return this.addOnePointToAll(firstPlayer, secondPlayer);
      }
      if (firstPlayerChoice === "rock" && secondPlayerChoice === "scissors") {
        return this.addOnePointToWinner(firstPlayer);
      }
      if (firstPlayerChoice === "paper" && secondPlayerChoice === "rock") {
        return this.addOnePointToWinner(firstPlayer);
      }
      if (firstPlayerChoice === "scissros" && secondPlayerChoice === "paper") {
        return this.addOnePointToWinner(firstPlayer);
      }
      this.addOnePointToWinner(secondPlayer);
    }

    addOnePointToWinner(player) {
      player.increment();
      this.incrementRound();
    }

    addOnePointToAll(playerOne, playerTwo) {
      playerOne.increment();
      playerTwo.increment();
      this.incrementRound();
    }
    renderBoard() {
      const result = document.createElement("p");
      document.body.appendChild(result);
      result.innerHTML = `The winner is ${this.winner}`;
      // render board with players on the screen;
    }
  }
  window.Board = Board;
})();
