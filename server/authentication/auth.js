import jwt from 'jsonwebtoken';
import userModel from '../models/User.js'; // Ensure you have the correct path

const authenticateToken = async (req, res, next) => {
    // const authHeader = req.header('Authorization')
    const authHeader = req
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied, token missing!' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user; // Attach the user to the request object
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Token is invalid' });
    }
};

export default authenticateToken;
