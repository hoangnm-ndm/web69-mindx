import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    // commentId: 
    // rate:
    // urlImages: [] -> Xử lý upload ảnh: multer, cloudiary.
    // thumnails:
}, {
    versionKey: false, timestamps: true
})

export default mongoose.model('Product', productSchema)