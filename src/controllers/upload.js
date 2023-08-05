import cloudinary from "../config/cloudinaryConfig";
export const uploadImage = async (req, res) => {
  const images = req.files.map((file) => file.path);
  const uploadedImages = [];
  for (let image of images) {
    try {
      const result = await cloudinary.uploader.upload(image);
      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  return res.json({ urls: uploadedImages });
};

export const removeImage = async (req, res) => {
  try {
    const publicId = req.params.publicId;
    const results = await cloudinary.uploader.destroy(publicId);
    console.log(results);
    if (results.result === "not found") {
      throw new Error("Delete image failed!");
    }
    return res.status(200).json({
      message: "Delete image successfully completed!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
