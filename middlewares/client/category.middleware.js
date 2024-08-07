const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system.js");
const createTreeHelper = require("../../helpers/create-tree.js");

module.exports.category = async (request, response, next)=>{
    const find = {
        delete : false,
    }
    const productCategory = await ProductCategory.find(find);

    const newProductCategory = createTreeHelper.tree(productCategory);

    response.locals.viewProductCategory = newProductCategory;


    next();
}