import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';
import config from '../config/index.js';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a your Name'],
            maxLength: [50, 'Name must be less than 50 characters'],
        },
        email: {
            type: String,
            lowecase: true,
            required: [true, 'Email is required'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid Email'],
        },
        password: {
            type: String,
            required: [true, 'Please enter your Password'],
            minLength: [8, 'Password should be greater than 8 characters'],
            select: false,
        },
        avatar: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        role: {
            type: String,
            //   enum: Object.values(AuthRoles),
            //   default: AuthRoles.USER,
            default: 'user',
        },
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
};

export default mongoose.model('User', userSchema);
