import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "User not Authorized!" });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodeToken.id) {
      req.userId = decodeToken.id;
      return next();
    } else {
      return res.status(401).json({ success: false, message: "User not Authorized!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;
