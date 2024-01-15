const jwt = require("jsonwebtoken")
const key = "123456"

function authenticator(req, res, next) {
  const {username, password} = req.headers;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, key);
  if(decoded.username == username && decoded.password == password){
    next();
  }else{
    res.status(501).send("Authantication error!");
  }
}

module.exports = authenticator