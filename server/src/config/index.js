import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,

    FRONTEND_URL: process.env.FRONTEND_URL,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,

    COOKIE_EXPIRY: process.env.COOKIE_EXPIRY,

    SMTP_MAIL_SERVICE: process.env.SMTP_MAIL_SERVICE,
    SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
    SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
    SMTP_MAIL_USERNAME: process.env.SMTP_MAIL_USERNAME,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
    SMTP_MAIL_EMAIL: process.env.SMTP_MAIL_EMAIL,

    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default config;
