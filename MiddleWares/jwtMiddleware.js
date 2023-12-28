const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    // console.log(token);
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_CODE);
    req.payload = jwtResponse.userId;
    next();
  } catch {
    res.status(401).json("Authorisation Failed!!! Please Login....");
  }
};

module.exports = jwtMiddleware;