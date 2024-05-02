import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';
import config from '../config/index.js';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a your Name'],
            trim: true,
            maxLength: [50, 'Name must be less than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid Email'],
        },
        password: {
            type: String,
            required: [true, 'Please enter your Password'],
            minLength: [8, 'Password should be greater than 8 characters'],
            select: false,
        },
        avatar: String,
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: String,
        verificationTokenExpiry: Date,
        // role: {
        // type: String,
        //  enum: Object.values(AuthRoles),
        //  default: AuthRoles.USER,
        // default: 'user',
        // },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

userSchema.methods = {
    getJWTToken: function () {
        return JWT.sign(
            {
                id: this._id,
                // role: this.role,
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY,
            }
        );
    },

    comparePassword: async function (enterdPassword) {
        return await bcrypt.compare(enterdPassword, this.password);
    },

    generateVerificationToken: function () {
        const token = crypto.randomBytes(20).toString('hex');

        this.verificationToken = crypto.createHash('sha256').update(token).digest('hex');

        this.verificationTokenExpiry = Date.now() + 20 * 60 * 1000;

        return token;
    },

    generateForgotPasswordToken: function () {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

        return resetToken;
    },
};

export default mongoose.model('User', userSchema);
