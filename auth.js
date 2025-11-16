const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

function auth(role = null) {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Token missing" });

    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
      req.user = decoded;

      if (role && decoded.role !== role)
        return res.status(403).json({ error: "Role not allowed" });

      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
}

module.exports = auth;
