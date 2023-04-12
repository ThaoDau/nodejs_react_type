import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        // từ thằng cate connect sang thằng products
        
        products: [{type: mongoose.Types.ObjectId, ref: "Product"}],
        
    },
    { timestamps: true, versionKey: false }

)
export default mongoose.model('Category', categorySchema)