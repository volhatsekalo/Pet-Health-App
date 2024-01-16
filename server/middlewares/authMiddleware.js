import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(403).json({
            message: "Token is necessary"
        })
    }
    else {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userId = decodedToken._id;
            next();
        }
        catch (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
    }

}