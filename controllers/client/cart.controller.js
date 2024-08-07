const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product.js");


//[GET] /cart

module.exports.index = async (req,res)=>{
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id : cartId,
    })
    if(cart.products.length > 0){
        for(const item of cart.products){
            const productId = item.product_id;

            const product = await Product.findOne({
                delete : false,
                _id : productId
            })

            if(product){
                item.productThumbnail = product.thumbnail;
                item.productTitle = product.title;
                item.productPrice = productHelper.newPrice(product);
                item.total  = item.quantity*productHelper.newPrice(product);
                item.productSlug = product.slug;
            }

        }

        cart.totalPrice = cart.products.reduce((sum,item) => sum + item.total,0).toFixed(2);
    }
    res.render("client/pages/cart/index.pug",{
        titlePage : "Vỏ hàng",
        cartDetail : cart
    });
}

// [POST] /cart/add/:productId
module.exports.cartPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({
        _id : cartId
    })

    const existsProductInCart = cart.products.find(item => item.product_id == productId);

    if(existsProductInCart){
        const newQuantity = quantity + existsProductInCart.quantity;

        await Cart.updateOne(
            {
                _id : cartId,
                'products.product_id' : productId
            },
            {
                'products.$.quantity' : newQuantity
            }
        )
    }
    else{
        const objectCard = {
            product_id : productId,
            quantity : quantity
        }
    
        await Cart.updateOne(
            {_id : cartId},
            {
                $push : {products : objectCard}
            }
        )
    }

    req.flash("success","Thêm sản phẩm vào giỏ hàng thành công");
    res.redirect("/cart");
}



// [GET] /cart/deleted/:productId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne(
        {
            _id : cartId
        },
        {
            $pull : {products : { product_id : productId}}
        }
    )

    req.flash("success","Xóa sản phẩm khỏi vỏ hàng thành công");
    res.redirect("back");
}


// [GET] /cart/update/productId/quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;

    await Cart.updateOne(
        {
            _id : cartId,
            'products.product_id' : productId
        },
        {
            'products.$.quantity' : quantity
        }
    )


    req.flash("success","Cập nhật số lượng sản phẩm thành công");
    res.redirect("back");
}