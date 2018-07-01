const sum = (a, b) => a + b;

describe("example", function() {
  it("should return 3", function() {
    expect(sum(1, 2)).to.be.equal(3);
  });
});
