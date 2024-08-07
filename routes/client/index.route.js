const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const categoryMiddlewares = require("../../middlewares/client/category.middleware");
const cartMiddlewares = require("../../middlewares/client/cart.middleware");
const userMiddlewares = require("../../middlewares/client/user.middleware");
const settingMiddlewares = require("../../middlewares/client/setting.middleware");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");
const chartRoute = require("./chart.route");
const usersRoute = require("./users.route");
const roomsChatRoute = require("./rooms-chat.roure");


module.exports = (app)=>{ // truyền vào tham số app của express

    app.use(categoryMiddlewares.category);
    app.use(cartMiddlewares.cartId);
    app.use(userMiddlewares.infoUser);
    app.use(settingMiddlewares.settingGeneral);

    app.use('/',homeRoute);
    
    app.use('/products',productRoute);

    app.use('/search',searchRoute);

    app.use('/cart',cartRoute);

    app.use('/checkout',checkoutRoute);

    app.use('/user',userRoute);

    app.use('/chat',chartRoute);

    app.use('/users',usersRoute);

    app.use('/rooms-chat',roomsChatRoute);


    
}