const Product = require("../../models/product.model.js");

// [GET] /products
module.exports.index = async (req, res) => { // truy cập vào trang product
    const products = await Product.find({
        status : "active",
        delete : false
    }).sort({postion : -1});

    products.forEach((item)=>{
        item.priceNew = (item.price - (item.price*item.discountPercentage/100)).toFixed(2);
    })

    res.render("client/pages/products/index.pug",{
        titlePage : "Trang danh sách sản phẩm",
        products : products
    });
}


// [GET] /products/:slug
module.exports.detail = async (req, res) => { // truy cập vào trang product
   try {
    const slug = req.params.slug;
    const product = await Product.findOne({delete : false,slug : slug});
    console.log(product);
    res.render("client/pages/products/detail.pug",{
        titlePage : "Trang chi tiết sản phẩm",
        product : product
    });
   } catch (error) {
    res.redirect("http://localhost:3000/products");
   }
}