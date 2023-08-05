import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    // imgs: [
    //   {"url1": "https://res.cloudinary.com/dby8jthcx/image/upload/v1691241248/web69/fszgou3x4lv1scgv0mub.jpg", "title": "anh A", "alt": "chu thich cho anh A"},
    //   {"url1": "https://res.cloudinary.com/dby8jthcx/image/upload/v1691241248/web69/fszgou3x4lv1scgv0mub.jpg", "title": "anh A", "alt": "chu thich cho anh A"},
    //   {"url1": "https://res.cloudinary.com/dby8jthcx/image/upload/v1691241248/web69/fszgou3x4lv1scgv0mub.jpg", "title": "anh A", "alt": "chu thich cho anh A"},
    // ]
    imgs: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
