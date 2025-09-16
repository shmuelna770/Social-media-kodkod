import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
    const token = await req.cookies.token;
    console.log("token:", req.cookies);

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
}