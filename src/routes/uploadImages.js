import { Router } from "express";
import { removeImage, uploadImage } from "../controllers/upload";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig";
import multer from "multer";

const routerUploadImages = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "web69",
    format: "jpg",
  },
});

const upload = multer({ storage: storage });
routerUploadImages.post("/upload", upload.array("images", 10), uploadImage);
routerUploadImages.delete("/delete/:publicId", removeImage);

export default routerUploadImages;
