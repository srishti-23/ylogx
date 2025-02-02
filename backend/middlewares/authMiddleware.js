const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    // Remove "Bearer " before verifying
    const tokenWithoutBearer = token.replace("Bearer ", "");
    
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
    
  }
};


module.exports = authMiddleware;
