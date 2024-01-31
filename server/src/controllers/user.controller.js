import config from '../config/index.js';
import User from '../src/models/user.schema.js';
import ApiResponse from '../src/utils/apiResponse.js';
import asyncHandler from '../src/utils/asyncHandler.js';
import CustomError from '../src/utils/customError.js';

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError('Please fill all the details', 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new CustomError('User already exists', 409);
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'this is a public id',
            url: 'urlstring',
        },
    });

    user.password = undefined;

    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + config.COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    return res
        .status(201)
        .cookie('token', token, options)
        .json(new ApiResponse(200, user, 'User registered Successfully'));
});

export const login = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError('Please fill all the details', 400);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new CustomError('Invalid email or password', 401);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        throw new CustomError('Invalid email or password', 401);
    }

    user.password = undefined;

    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + config.COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    return res
        .status(201)
        .cookie('token', token, options)
        .json(new ApiResponse(200, user, 'User logged In Successfully'));
});

export const logout = asyncHandler(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged out',
    });
});
