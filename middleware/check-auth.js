// const jwt = require("jsonwebtoken")

// module.exports = (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1]
//     const verify = jwt.verify(token, "secretKey",)
//     console.log(verify,"sdhj")
//     next();
//   }
//   catch (error) {
//     return res.status(401).json({
//       message: "invalid request"
//     })
//   }
// }

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const verify = jwt.verify(token, "secretKey");
    next();
  } 
  catch (error) {
    console.log("Error during JWT verification:", error.message); 
    return res.status(401).json({
      message: "Invalid request",
      error: error.message 
    });
  }
};
