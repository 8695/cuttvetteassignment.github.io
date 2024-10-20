const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "Unauthorized." });
  }
   
  const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized. Please add a valid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY); // Decode the token
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Unauthorized. Please add a valid token" });
  }
}

module.exports = authenticationMiddleware;