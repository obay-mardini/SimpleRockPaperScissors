describe.only("board", () => {
  const players = [{ name: "obay" }, { name: "computer" }];
  let mockedPlayer;
  let resetGameVisualsStub;
  this.clock = sinon.useFakeTimers();

  beforeEach(() => {
    resetGameVisualsStub = sinon.stub(Board.prototype, "resetGameVisuals");
    mockedPlayer = sinon.stub(window, "Player");
  });
  afterEach(() => {
    mockedPlayer.restore();
    resetGameVisualsStub.restore();
  });

  it("should create a board with any number players instances correctly", () => {
    const startTimerStub = sinon.stub(Board.prototype, "startTimer");
    const board = new Board(...players, "thirdPlayer");
    expect(board.players.length).equal(3);
    startTimerStub.restore();
  });

  it("should check the result at the end of each timer", () => {
    const board = new Board(...players);
    const checkResultsStub = sinon.stub(board, "checkResults");
    expect(checkResultsStub.called).equal(false);
    this.clock.tick(3000);
    expect(checkResultsStub.called).equal(true);
    checkResultsStub.restore();
  });

  it("should call showWinner at the end of the third round", () => {
    const board = new Board(...players);
    const showWinnerSpy = sinon.stub(board, "showWinner");
    mockedPlayer.returns({
      increment: sinon.spy()
    });
    board.incrementRound();
    expect(showWinnerSpy.called).equal(false);
    board.incrementRound();
    expect(showWinnerSpy.called).equal(true);
    showWinnerSpy.restore();
  });

  it.only("should set the first player as winner when its score is higer than the second", () => {
    const board = new Board(
      { name: players[0], score: 2 },
      { name: players[1], score: 1 }
    );
    board.showWinner();
    expect(board.winner.name).equal(players[0].name);
  });

  it("should set the second player as winner when its score is higer than the first", () => {
    const board = new Board(
      { name: players[0], score: 1 },
      { name: players[1], score: 2 }
    );
    board.showWinner();
    expect(board.winner.name).equal(players[1].name);
  });

  it("should set empty object to winner prplayers[1]operty when tie", () => {
    mockedPlayer
      .onFirstCall()
      .returns({ score: 1 })
      .onSecondCall()
      .returns({ score: 1 });
    const board = new Board(...players);
    board.showWinner();
    expect(board.winner).empty;
  });
});
