(function() {
  class ComputerPlayer extends Player {
    constructor(props) {
      super(props);
      this.options = ["rock", "paper", "scissors"];
      this.type = "computer";
    }

    pickOption() {
      const random = Math.floor(Math.random() * 3);
      this.option = this.options[random];
      this.applyAnimation(random);
    }
  }
  window.ComputerPlayer = ComputerPlayer;
})();
