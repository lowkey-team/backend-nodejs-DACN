import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token không tồn tại" }); 
    }

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token không hợp lệ" }); 
        }
        req.user = user; 
        next(); 
    });
};
