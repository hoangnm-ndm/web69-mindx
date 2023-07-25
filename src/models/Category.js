import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        defaultValue: "UnCategorized"
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        defaultValue: "uncategorized"
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
}, {
    versionKey: false, timestamps: true
})

export default mongoose.model("Category", categorySchema)
