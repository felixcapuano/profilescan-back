const url = "/api/v2/steam/getsteamid/";

describe(`GET ${url}:steamId/`, () => {
  it("Correct user id", (done) => {
    request
      .get(url + constants.steamAlias.correct)
      .expect(200)
      .end((err, res) => {
        res.body.should.not.have.any.keys("cacheTime");
        done(err);
      });
  });

  it("Correct user id cached", (done) => {
    request
      .get(url + constants.steamAlias.correct)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.any.keys("cacheTime");
        done(err);
      });
  });

  it("Bad user id", (done) => {
    request
      .get(url + constants.steamAlias.bad)
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });
});