import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { deleteImage, uploadImage } from "../controllers/upload";
import cloudinary from "../configs/cloudinaryConfig";

const imageUploadRouter = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "web69",
    format: "jpg",
  },
});

const upload = multer({ storage: storage });

imageUploadRouter.post("/upload", upload.array("images", 10), uploadImage);
imageUploadRouter.delete("/:publicId", deleteImage);

export default imageUploadRouter;
