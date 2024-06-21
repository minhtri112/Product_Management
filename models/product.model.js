
const slug = require('mongoose-slug-updater');
const mongoose = require("mongoose");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {

        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        delete: {
            type : Boolean,
            default : false
        },
        slug: { type: String, slug: "title",unique: true },
        postion: Number,
        status: String,
        deletedAt: Date
    },
    {
        timestamps : true
    }
);

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product