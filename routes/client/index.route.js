const productRoute = require("./product.route");
const homeRoute = require("./home.route");


module.exports = (app)=>{ // truyền vào tham số app của express
    
    // app.get('/', (req, res) => { // truy cập vào trang chủ
    //     res.render("client/pages/home/index.pug");// Mặc định đã vào folder views
    // })

    app.use('/', homeRoute);
    
    app.use('/products', productRoute);

    
}