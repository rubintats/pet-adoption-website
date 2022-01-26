const { verify } = require("jsonwebtoken");
require("dotenv").config();
const jwt_decode = require("jwt-decode");

const validateToken = (req, res, next) => {
  const accessToken = req.headers.accesstoken;
  console.log(accessToken);
  if (!accessToken)
    return res.status(401).json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET_KEY);
    if (!validToken) {
      // what should i do here?
      return;
    }
    const decode = jwt_decode(accessToken);
    if (decode) {
      return next();
    }
    console.log("token failed to decode");
  } catch (err) {
    return res.json({ error: err });
  }
};

// admin middleware ??
// function authRole(role) {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       res.status(401);
//       return res.send("You have no access");
//     }
//     next();
//   };
// }
module.exports = { validateToken };
