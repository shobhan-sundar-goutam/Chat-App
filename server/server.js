import express from 'express';
import http from 'http';
import connectToDb from './config/database.js';
import config from './config/index.js';

// Routes
import home from './routes/home.route.js';

connectToDb();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', home);

server.listen(config.PORT, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
