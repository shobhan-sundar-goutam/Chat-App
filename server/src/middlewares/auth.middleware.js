import JWT from 'jsonwebtoken';
import config from '../config/index.js';
import User from '../models/user.schema.js';
import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/customError.js';

const isLoggedIn = asyncHandler(async (req, _res, next) => {
    let token;

    if (
        req.cookies.token ||
        (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    ) {
        token = req.cookies.token || req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new CustomError('Please Login to access this resource', 401);
    }
    try {
        const decodedJWTPayload = JWT.verify(token, config.JWT_SECRET);
        req.user = await User.findById(decodedJWTPayload.id, 'name email');
        next();
    } catch (error) {
        throw new CustomError('Please Login to access this resource', 401);
    }
});

export default isLoggedIn;
