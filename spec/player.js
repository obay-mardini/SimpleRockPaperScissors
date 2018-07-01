describe("player", function() {
  const options = ["rock", "paper", "scissor"];
  let newPlayer;
  let playerWithTwoPoints;
  let mockedGetElementById;
  let mockedCreateElement;
  let mockedDOMElement;
  let mockedCreateDOMElement;
  let mockedCreateImgElement;
  let mockedIMG;
  beforeEach(() => {
    mockedDOMElement = {
      appendChild: sinon.spy()
    };
    mockedIMG = {};
    mockedCreateDOMElement = sinon.stub(window, "createDOMElement");
    mockedCreateImgElement = sinon.stub(window, "createImgElement");
    mockedCreateElement = sinon.spy(document, "createElement");
    mockedGetElementById = sinon.stub(document, "getElementById");
    mockedGetElementById.returns(mockedDOMElement);
    mockedCreateDOMElement.returns(mockedDOMElement);
    mockedCreateImgElement.returns(mockedIMG);
    newPlayer = new Player("obay");
    playerWithTwoPoints = new Player("john", [], 2);
  });
  // // beforeEach(() => {});
  afterEach(() => {
    mockedGetElementById.restore();
    mockedCreateElement.restore();
    mockedCreateDOMElement.restore();
    mockedCreateImgElement.restore();
  });
  it("should have correct name", function() {
    expect(newPlayer.name).to.be.equal("obay");
  });
  it("should have zero score", function() {
    expect(newPlayer.score).to.be.equal(0);
  });
  it("should have 3 options", function() {
    expect(newPlayer.options.length).to.be.equal(3);
  });
  it("should have two points in the score", function() {
    expect(playerWithTwoPoints.score).to.be.equal(2);
  });
  it("should have increment method", function() {
    newPlayer.increment();
    expect(newPlayer.score).to.be.equal(1);
  });
  it("should have reset method", function() {
    newPlayer.reset();
    expect(newPlayer.score).to.be.equal(0);
  });
  it("should render a div with player class inside app div", function() {
    expect(mockedCreateDOMElement.called).equal(true);
    expect(mockedCreateImgElement.args.length).equal(3);
    expect(mockedGetElementById.called).equal(true);
    expect(mockedGetElementById.args.length).equal(2);
    expect(mockedDOMElement.appendChild.args.length).equal(9);
  });

  it("should be able to pick an option", function() {
    const randomIndex = Math.floor(Math.random() * options.length);
    const option = options[randomIndex];
    newPlayer.pickOption(option);
    expect(newPlayer.option).equal(option);
  });

  it("should be able to pick an option when clicking on one image", function() {
    const randomIndex = Math.floor(Math.random() * options.length);
    const option = options[randomIndex];
    const mockedEvent = {
      target: {
        value: option
      }
    };
    mockedIMG.onclick(mockedEvent);
    expect(newPlayer.option).equal(option);
  });
});
