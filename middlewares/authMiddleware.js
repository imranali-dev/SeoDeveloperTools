const jwt = require("jsonwebtoken");
const cookie = require('cookie');

function authenticateToken(req, res, next) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.authToken;

  if (!token) {
    return res.status(401).json({ Message: "I dont't know whose are you" ,Message2:"DO you know me?"});
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next(); 
  });
}
module.exports = authenticateToken;
