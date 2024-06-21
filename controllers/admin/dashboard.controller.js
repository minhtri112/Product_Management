// [GET] admin/dashboard
module.exports.dashboard =  (req, res) => { // truy cập vào trang chủ
    res.render("admin/pages/dashboard/index.pug",{
        pageTitle : "Trang tổng quan",
    });
}