import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({
            message: "Token is necessary"
        })
    }
    else {
        try {
            const decodedToken = jwt.verify(token, 'tajemnica654');
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