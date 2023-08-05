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
    //   {"url1": "https://cloudinary/jhsdjshcnncjdc", "title": "anh A", "alt": "chu thich cho anh A"},
    //   {"url1": "https://cloudinary/jhsdjshcnncjdc", "title": "anh A", "alt": "chu thich cho anh A"},
    //   {"url1": "https://cloudinary/jhsdjshcnncjdc", "title": "anh A", "alt": "chu thich cho anh A"},
    // ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
