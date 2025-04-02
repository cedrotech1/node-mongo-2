const jwt = require("jsonwebtoken");
const User = require("../database/models/User"); // Adjust path as needed

const protect = async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
        console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
