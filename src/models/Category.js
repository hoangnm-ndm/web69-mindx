import mongoose from "mongoose"
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        default: "uncategorized"
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        default: "uncategorized"
    },
    products: [{
        type: mongoose.Types.ObjectId, ref: "Product",
    }]
}, {
    versionKey: false, timestamps: true
})

export default mongoose.model("Category", categorySchema)

