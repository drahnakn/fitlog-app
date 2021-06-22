const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "this_is_where_a_long_secret_should_go");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!"});
  }

}
