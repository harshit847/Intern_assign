import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Item from "./models/items.model.js";
import emailRoutes from './routes/email.js';


dotenv.config();

mongoose.connect(process.env.MONGO_URI)
const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => ({
    folder: "uploads",
    resource_type: "auto",
  }),
});
const upload = multer({ storage });

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
app.use(express.json());
app.use('/api', emailRoutes);

app.post("/api/items", upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 5 }
]), async (req, res) => {
  const { name, type, description } = req.body;
  const coverImage = req.files.coverImage?.[0]?.path || req.files.coverImage?.[0]?.secure_url;
  const images = req.files.images?.map(file => file.path || file.secure_url);

  if (!name || !type || !description || !coverImage || !images?.length) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  const newItem = new Item({ name, type, description, coverImage, image: images });
  await newItem.save();
  res.status(201).json({ success: true, data: newItem });
});

app.get("/api/viewItems", async (req, res) => {
  const items = await Item.find();
  res.status(200).json({ success: true, data: items });
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
