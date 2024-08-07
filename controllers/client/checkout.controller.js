const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product.js");
const Order = require("../../models/order.model.js");


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
    res.render("client/pages/checkout/index.pug",{
        titlePage : "Đặt hàng",
        cartDetail : cart
    });
}

// [POST] /checkout
module.exports.order = async (req,res)=>{
    const cartId = req.cookies.cartId;
    const userInfo = req.boby;

    const cart = await Cart.findOne({
        _id : cartId,
    });

    let products = [];

    for(const product of cart.products){
        const objectProduct = {
            product_id : product.product_id,
            price : 0,
            discountPercentage : 0,
            quantity : product.quantity
        }

        const productInfo = await Product.findOne({
            _id : product.product_id
        })

        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objectProduct);


    }

    const objectOrder = {
        cart_id : cartId,
        userInfo : {
            fullName : req.body.fullName,
            phone : req.body.phone,
            address : req.body.address
        },
        products : products
    }

    const order = new Order(objectOrder);
    await order.save();

    await Cart.updateOne(
        {
            _id : cartId
        },
        {
            products : []
        }
    );

    res.redirect(`/checkout/success/${order.id}`);
}

module.exports.success = async (req,res)=>{
    const orderId = req.params.orderId;
    
    const order = await Order.findOne({
        _id :  orderId
    });

    for(const item of order.products){
        const productInfo = await Product.findOne({
            _id : item.product_id,
        }).select("title thumbnail");

        item.productInfo = productInfo;
        item.priceNew = productHelper.newPrice(item);

        item.totalPrice = item.priceNew*item.quantity;
    }

    order.totalPrice = order.products.reduce((sum,item) => sum + item.totalPrice,0).toFixed(2);

    console.log(order.totalPrice);

    res.render("client/pages/checkout/success.pug",{
        pagaTitle : "Đặt hàng thành công",
        order : order
    });
}


