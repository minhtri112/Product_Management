const Account = require("../../models/account.model");
const Role = require("../../models/role.model.js");
const md5 = require("md5");
const systemConfig = require("../../config/system.js");

// [GET] admin/auth/login
module.exports.login =  (req, res) => { 
    if(req.cookies.token){
     res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    }
    else{
        res.render("admin/pages/auth/login.pug",{
            pageTitle : "Trang đăng nhập",
        });
    }

}


// [POST] admin/auth/login
module.exports.loginPost = async (req, res) => { // truy cập vào trang chủ
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        delete : false,
        email : email
    })

    if(!user){
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }

    if(md5(password) != user.password){
        req.flash("error","Sai mật khẩu");
        res.redirect("back");
        return;
    }

    if(user.status != "active"){
        req.flash("error","Tài khoản dừng hoạt động");
        res.redirect("back");
        return;
    }
    res.cookie("token",user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);

}


// [GET] admin/auth/logout
module.exports.logout =  (req, res) => { // truy cập vào trang chủ
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}