import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.status(401).json({ success: false, message: "Seller not Authorized!" });
    }

    try {
        const decodeToken = jwt.verify(sellerToken, process.env.JWT_SECRET);

        if (decodeToken.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.status(401).json({ success: false, message: "User not Authorized!" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default authSeller;
