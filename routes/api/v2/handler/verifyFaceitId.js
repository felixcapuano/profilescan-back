const regExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/g;

const isValidFaceitId = async (req, res, next) => {
  if (req.params.id.match(regExp)) {
    await next();
  } else {
    await next({ status: 400 });
  }
};

module.exports = isValidFaceitId;
