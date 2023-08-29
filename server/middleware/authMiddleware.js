const jwt = require("jsonwebtoken")
const users = require("../modules/users");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
    
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await users.findById(decoded.user_id).select('-userpass');
          next();
        } else {
          throw new Error("Token not found!");
        }
      } catch (error) {
        res.status(401).send({ message: "Authentication failed. " + error.message });
      }
  };

  module.exports = authMiddleware;