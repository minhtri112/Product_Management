const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model.js");
const systemConfig = require("../../config/system.js");
const productHelper = require("../../helpers/product.js");

// [GET] /
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;

    const regex = new RegExp(keyword,"i");

    const products = await Product.find({
        title : regex,
        delete : false,
        status : 'active'
    })

    const newProducts = productHelper.priceNewProduct(products);

    res.render("client/pages/search/index.pug",{
        titlePage : "Trang tìm kiếm",
        keyword : keyword,
        products : newProducts
    });
}