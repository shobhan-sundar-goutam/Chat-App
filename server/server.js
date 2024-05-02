import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import connectToDb from './src/config/database.js';
import config from './src/config/index.js';

// Routes
import home from './src/routes/home.route.js';
import user from './src/routes/user.route.js';

connectToDb();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);
app.use(cookieParser());

app.use('/api/v1/users', user);
app.use('/api/v1', home);

server.listen(config.PORT, () => {
    console.log(`Server is running at http://localhost:${config.PORT}`);
});
