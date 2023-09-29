import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.headers.token;
  const flag = req.query.flag;
  if (!token) {
    res.status(401).json({ error: "missing access token" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.jwt_secret);
      req.email = decoded.email;
      if (flag === "initialAuth") {
        res.status(200).json({ message: "user verified" });
      }
      next();
    } catch (err) {
      res.status(401).json({ error: "fail to authorize" });
    }
  }
};

export default verifyJWT;
