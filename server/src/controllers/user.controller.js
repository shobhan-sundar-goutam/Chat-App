import crypto from 'crypto';
import config from '../config/index.js';
import User from '../models/user.schema.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/customError.js';
import sendEmail from '../utils/sendEmail.js';

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError('Please fill all the details', 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new CustomError('User Already Exists', 409);
    }

    // let avatar = null;

    // if (req.file) {
    //     avatar = await uploadOnCloudinary(req.file.path);
    // }

    const user = await User.create({
        name,
        email,
        password,
        isVerified: false,
    });

    const verificationToken = user.generateVerificationToken();

    user.save({ validateBeforeSave: false });

    // const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verify/${verificationToken}`;
    const verificationUrl = `${config.FRONTEND_URL}/verify/${verificationToken}`;

    const text = `Hey ${user.name}, \n\nThank you for signing up for our service! To complete your registration and start using our platform, please click the link below to verify your email address:- \n\n ${verificationUrl} \n\nIf you did not create an account, please disregard this email. \n\nBest regards,\nShobhan Sundar Goutam (Founder, Whispr)`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Verify your email address',
            text,
        });

        res.status(200).json(new ApiResponse(200, '', `Verification mail sent to ${user.email}`));
    } catch (error) {
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;

        await user.save({ validateBeforeSave: false });

        throw new CustomError(error.message || 'Password reset email failed to send', 500);
    }
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const verificationToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    console.log(req.params.token, verificationToken);
    const user = await User.findOne({
        verificationToken,
        verificationTokenExpiry: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
        throw new CustomError('Verification Token is Invalid or has been expired', 400);
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    user.password = undefined;

    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + config.COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    return res
        .status(201)
        .cookie('token', token, options)
        .json(new ApiResponse(200, user, 'Email verified and User registered Successfully'));
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
