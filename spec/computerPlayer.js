describe.only("computerPlayer", function() {
  const options = ["rock", "paper", "scissors"];
  let mockedRenderPlayer;
  let mockedGetElementById;
  let mockedCreateElement;
  let mockedDOMElement;
  let mockedCreateDOMElement;
  let mockedCreateImgElement;
  let mockedchangeOpacity;
  let mockedIMG;
  beforeEach(() => {
    mockedRenderPlayer = sinon.stub(Player.prototype, "renderPlayer");
    mockedDOMElement = {
      appendChild: sinon.spy()
    };
    mockedchangeOpacity = sinon.stub(window, "changeOpacity");
    mockedIMG = {};
    mockedCreateDOMElement = sinon.stub(window, "createDOMElement");
    mockedCreateImgElement = sinon.stub(window, "createImgElement");
    mockedCreateElement = sinon.spy(document, "createElement");
    mockedGetElementById = sinon.stub(document, "getElementById");
    mockedGetElementById.returns(mockedDOMElement);
    mockedCreateDOMElement.returns(mockedDOMElement);
    mockedCreateImgElement.returns(mockedIMG);
  });

  afterEach(() => {
    mockedRenderPlayer.restore();
    mockedGetElementById.restore();
    mockedCreateElement.restore();
    mockedCreateDOMElement.restore();
    mockedchangeOpacity.restore();
    mockedCreateImgElement.restore();
  });

  it("should not call pickOption of the parent class when calling pickOption on computerPlayer", function() {
    const mockPickOptionPlayer = sinon.stub(Player, "pickOption");
    const computerPlayer = new ComputerPlayer("computer");
    const applyAnimation = sinon.stub(computerPlayer, "applyAnimation");

    computerPlayer.pickOption();
    expect(applyAnimation.called).equal(true);
    expect(mockPickOptionPlayer.called).equal(false);
  });

  it("should randomly pick one of the options when calling pickOption", function() {
    const computerPlayer = new ComputerPlayer("computer");
    const applyAnimation = sinon.stub(computerPlayer, "applyAnimation");
    expect(computerPlayer.option).empty;
    computerPlayer.pickOption();
    expect(options).include(computerPlayer.option);
  });
});
