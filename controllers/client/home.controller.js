const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model.js");
const systemConfig = require("../../config/system.js");
const createTreeHelper = require("../../helpers/create-tree.js");
const productHelper = require("../../helpers/product.js");

// [GET] /
module.exports.index = async (req, res) => { 
    // Lấy ra sản phẩm nổi bật
    const productsFeatured = await Product.find({
        featured : "1",
        delete : false,
        status : "active"
    })
    const newProductsFeatured = productHelper.priceNewProduct(productsFeatured);
    // Lấy ra sản phẩm nổi bật

    // Lầy ra sản phẩm mới nhất
    const productNew = await Product.find({
        delete : false,
        status : 'active'
    }).sort({postion : -1}).limit(6)

    const newproductNew = productHelper.priceNewProduct(productNew);


    // Lầy ra sản phẩm mới nhất
    res.render("client/pages/home/index.pug",{
        titlePage : "Trang Chủ",
        productsFeatured : newProductsFeatured,
        productNew : newproductNew
    });
}