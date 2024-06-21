// [GET] /

module.exports.index =  (req, res) => { // truy cập vào trang chủ
    res.render("client/pages/home/index.pug",{
        titlePage : "Trang Chủ" 
    });// Mặc định đã vào folder views
}