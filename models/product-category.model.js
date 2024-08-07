
const slug = require('mongoose-slug-updater');
const mongoose = require("mongoose");
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
    {
        title: String,
        parent_id : {
            type : String,
            default : ""
        },
        description: String,
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

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, "products-category");

module.exports = ProductCategory