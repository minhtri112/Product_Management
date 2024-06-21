const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route.js")
const systemConfig = require("../../config/system.js");
module.exports = (app)=>{ // truyền vào tham số app của express

    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use( PATH_ADMIN + '/dashboard',dashboardRoutes);
    app.use( PATH_ADMIN + '/products',productRoutes);
    

    
}