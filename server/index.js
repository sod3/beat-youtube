import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import profileRoutes from './routes/profile.js';
import feedbackRoutes from "./routes/feedback.js";
import shortsvideoRoutes from './routes/videoRoutes.js';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from "cloudinary";
import { app as socketApp, server } from "./backend/socket/socket.js";
import job from "./backend/cron/cron.js";

// imports from threads backend
import userRoutesThreads from "./backend/routes/userRoutes.js";
import postRoutes from "./backend/routes/postRoutes.js";
import messageRoutes from "./backend/routes/messageRoutes.js";

const app = express();
dotenv.config();

const corsOptions = {
  origin: 'https://your-frontend-domain.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
job.start();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

const storage = multer.memoryStorage(); // Use memory storage instead of disk storage
const upload = multer({ storage });

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send({ url: result.secure_url });
  }).end(file.buffer);
});

// Routes for API endpoints
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', shortsvideoRoutes);

// Routes for Threads application
app.use("/api/users", userRoutesThreads);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

// Define a default route handler for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to My API'); // Example response
});

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to Server");
});
