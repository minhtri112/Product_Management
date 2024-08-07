const Product = require("../../models/product.model.js");
const productHelper = require("../../helpers/product.js");
const productCategoryHelper = require("../../helpers/product-category.js");
const ProductCategory = require("../../models/product-category.model.js");

// [GET] /products
module.exports.index = async (req, res) => { // truy cập vào trang product
    const products = await Product.find({
        status : "active",
        delete : false
    }).sort({postion : -1});

    const newProducts = productHelper.priceNewProduct(products);

    res.render("client/pages/products/index.pug",{
        titlePage : "Trang danh sách sản phẩm",
        products : newProducts
    });
}


// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => { // truy cập vào trang product
   try {
    const slug = req.params.slugProduct;
    const product = await Product.findOne({delete : false,slug : slug});

    if(product.product_category_id){
        const category = await ProductCategory.findOne({
            delete : false,
            _id : product.product_category_id,
            status : "active"
        })

        product.category = category;
    }
    product.newPrice = productHelper.newPrice(product);
    res.render("client/pages/products/detail.pug",{
        titlePage : "Trang chi tiết sản phẩm",
        product : product
    });
   } catch (error) {
    res.redirect("http://localhost:3000/products");
   }
}


// [GET] /products/:slugCategory
module.exports.category = async (req, res) => { 
    const category = await ProductCategory.findOne({
        slug : req.params.slugCategory,
        delete : false,
    });

    const listSubCategory = await productCategoryHelper.getSubCategory(category.id);


    const listSubCategoryId = listSubCategory.map(item => item.id);

    const products = await Product.find({
        delete : false,
        status : 'active',
        product_category_id : {$in : [category.id,...listSubCategoryId]}
    }).sort({postion : -1})

    const newProducts = productHelper.priceNewProduct(products);
    res.render("client/pages/products/index.pug",{
        titlePage : category.title,
        products : newProducts
    });
}