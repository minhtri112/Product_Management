
const slug = require('mongoose-slug-updater');
const mongoose = require("mongoose");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {
        title: String,
        product_category_id : {
            type : String,
            default : ""
        },
        featured : String,
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
        createBy : {
            account_id : String,
            createAt : {
                type : Date,
                default : Date.now
            }
        },
        deleteBy : {
          account_id : String,
          deleteAt : Date
        },
        updateBy : [
            {
                account_id : String,
                updateAt : Date
            }
        ],
        postion: Number,
        status: String,
    },
    {
        timestamps : true
    }
);

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product