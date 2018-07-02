describe.only("init", function() {
  const template = createDOMElement("template");
  const playerVsComputerBtn = createDOMElement(
    "button",
    "app__btn--player app__btn"
  );
  const computerVsComputerBtn = createDOMElement(
    "button",
    "app__btn--computers app__btn"
  );
  let mockedPlayer;
  let prompt;
  document.body.appendChild(template);
  template.appendChild(playerVsComputerBtn);
  template.appendChild(computerVsComputerBtn);
  beforeEach(() => {
    prompt = sinon.stub(window, "prompt");
    mockedPlayer = sinon.stub(window, "Player");
  });
  afterEach(() => {
    prompt.restore();
    mockedPlayer.restore();
  });

  it("should add new player and a computer when clicking Player Vs Computer button", function() {
    const playerName = "obay";
    const expectedPlayers = [playerName, "computer"];
    prompt.returns(playerName);
    playerVsComputerBtn.onclick();
    expect(mockedPlayer.called).equal(true);
    expectedPlayers.forEach((player, index) => {
      expect(mockedPlayer.args[index][0]).equal(player);
    });
  });

  it("should add two computers when clicking Computer Vs Computer button", function() {
    computerVsComputerBtn.onclick();
    expect(mockedPlayer.called).equal(true);
    [1, 2].forEach((num, index) => {
      expect(mockedPlayer.args[index][0]).equal(`computer_${num}`);
    });
  });

  it("should hide buttons when clicked", function() {
    computerVsComputerBtn.onclick();
    expect(
      document.getElementsByClassName("app__btn--computers")[0].style.visibility
    ).equal("hidden");
  });
});
