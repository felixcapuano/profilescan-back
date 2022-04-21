const url = "/api/v2/steam/getrecentlyplayedgames/";

describe(`GET ${url}:steamId/`, () => {
  it("Correct user id", (done) => {
    request
      .get(url + constants.steamId.correct)
      .expect(200)
      .end((err, res) => {
        res.body.should.not.have.any.keys("cacheTime");
        done(err);
      });
  });

  it("Correct user id cached", (done) => {
    request
      .get(url + constants.steamId.correct)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.any.keys("cacheTime");
        done(err);
      });
  });

  it("Bad user id", (done) => {
    request
      .get(url + constants.steamId.bad)
      .expect(400)
      .end((err, res) => {
        done(err);
      });
  });
});