import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();
connectDB();

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(helmet());


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

export default app;
