import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import AppRouter from './routes';

const app = express();
dotenv.config();
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

router.init();

const port = app.get("port");
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);

export default server;