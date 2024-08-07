const md5 = require("md5");
const User = require("../../models/users.model.js");
const ForgotPassword = require("../../models/forgot-password.model.js");
const systemConfig = require("../../config/system.js");
const productHelper = require("../../helpers/product.js");
const generateHelper = require("../../helpers/generate.js");
const sendMailHelper = require("../../helpers/sendMail.js");
const Cart = require("../../models/cart.model.js");

// [GET] /user/register
module.exports.register = async (req, res) => {

    res.render("client/pages/user/register.pug",{
        titlePage : "Trang đăng kí",
    });
}


// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const emailExists = await User.findOne({
        delete : false,
        email : req.body.email
    })

    if(emailExists){
        req.flash("error","Email đã tồn tại");
        res.redirect("back");
        return;
    }
    req.body.password = md5(req.body.password);
    
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser",user.token);
    res.redirect("/");
}


// [GET] /user/login
module.exports.login = async (req, res) => {

    res.render("client/pages/user/login.pug",{
        titlePage : "Trang đăng nhập",
    });
}


// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const user = await User.findOne({
        delete : false,
        email : req.body.email
    })

    if(!user){
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }

    
    if(md5(req.body.password) != user.password){
        req.flash("error","Password không đúng");
        res.redirect("back");
        return;
    }


    
    if(user.status == "inactive"){
        req.flash("error","Tài khoản đã bị khóa");
        res.redirect("back");
        return;
    }


    res.cookie("tokenUser",user.token);

    // Cập nhập user online

    await User.updateOne({
        _id : user.id
    },{
        statusOnline : "online"
    });

    // Lưu user_id vào collection carts
    await Cart.updateOne(
        {
            _id : req.cookies.cartId,
        },{
            user_id : user.id,
        }
    );



    // Trả về user đang onlines
    _io.once('connection', (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_ONLINE",user.id);
    });



    res.redirect("/");
    req.flash("success","Đăng nhập thành công");

}



// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    // Cập nhập user offline
    await User.updateOne({
        _id : res.locals.user.id
    },{
        statusOnline : "offline"
    });
    // Cập nhật user offline
    _io.once('connection', (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_OFFLINE", res.locals.user.id);
    });
    res.redirect("/");
}


// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password",{
        titlePage : "Lấy lại mật khẩu",
    });
}


// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email : email,
        delete : false
    });

    if(!user){
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }

    // Tạo mã OTP và lưu thông tin yêu cầu vào collection forgot-pasword
    const otp =  generateHelper.generateRandomNumber(5);
    const objectForgotPassword = {
        email : email,
        otp :otp,
        expireAt : Date.now()
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Gửi mã OTP qua email của user
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `
      Mã OTP xác min lấy lại mật khẩu là ${otp}. Thời hạn sử dụng là 3 phút.
      Lưu ý không được lộ OTP
    `
    sendMailHelper.sendMail(email,subject,html);

    res.redirect(`/user/password/otp?email=${email}`);
}


// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;
    res.render("client/pages/user/otp.pug",{
        titlePage : "Nhập mã OTP",
        email : email
    });
}


// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    console.log(email);
    console.log(otp);

    const result = await ForgotPassword.findOne({
        email : email,
        otp : otp
    });

    if(!result){
        req.flash("error","OTP không hợp lệ");
        res.redirect("back");
        return;
    }
    const user = await User.findOne({
        email : email
    });
    res.cookie("tokenUser",user.token);

    res.redirect("/user/password/reset");
}


// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password.pug",{
        titlePage : "Đổi mật khẩu",
    });
}


// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const token = req.cookies.tokenUser;

    await User.updateOne(
        {
            token : token
        },{
            password : md5(password),
        }
    )

    req.flash("success","Đổi mật khẩu thành công");
    res.redirect("/");

}


// [GET /user/info
module.exports.info = async (req, res) => {
    console.log("OK");
    res.render("client/pages/user/info.pug",{
        titlePage : "Thông tin tài khoản",
    });
}