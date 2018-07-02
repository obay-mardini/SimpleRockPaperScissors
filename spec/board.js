describe.only("board", () => {
  const players = ["obay", "computer"];
  let mockedPlayer;
  this.clock = sinon.useFakeTimers();

  beforeEach(() => {
    mockedPlayer = sinon.stub(window, "Player");
  });
  afterEach(() => {
    mockedPlayer.restore();
  });

  it("should create a board with any number players instances correctly", () => {
    const board = new Board(...players, "thirdPlayer");
    expect(board.players.length).equal(3);
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

  it("should set the first player as winner when its score is higer than the second", () => {
    mockedPlayer
      .onFirstCall()
      .returns({ score: 2 })
      .onSecondCall()
      .returns({ score: 1 });
    const board = new Board(...players);
    board.showWinner();
    console.log(board.winner);
    expect(board.winner.score).equal(2);
  });

  it("should set the second player as winner when its score is higer than the first", () => {
    mockedPlayer
      .onFirstCall()
      .returns({ score: 1 })
      .onSecondCall()
      .returns({ score: 2 });
    const board = new Board(...players);
    board.showWinner();
    console.log(board.winner);
    expect(board.winner.score).equal(2);
  });

  it("should set empty object to winner property when tie", () => {
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
