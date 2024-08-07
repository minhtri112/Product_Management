module.exports.registerPost = (req, res,next)=>{
    if(!req.body.fullName){
        req.flash('error', `Vui lòng nhập fullName`);
        return;
    }
    if(!req.body.email){
        req.flash('error', `Vui lòng nhập Email`);
        return;
    }
    if(!req.body.password){
        req.flash('error', `Vui lòng nhập Password`);
        return;
    }
    next();
}



module.exports.forgotPasswordPost = (req, res,next)=>{
    if(!req.body.email){
        req.flash('error', `Vui lòng nhập Email`);
        res.redirect("back");
        return;
    }
    next();
}


module.exports.resetPasswordPost = (req, res,next)=>{
    if(!req.body.password){
        req.flash('error', `Vui lòng nhập Password`);
        res.redirect("back");
        return;
    }
    if(!req.body.confirmPassword){
        req.flash('error', `Vui lòng nhập xác nhận lại Password`);
        res.redirect("back");
        return;
    }
    if(req.body.password != req.body.confirmPassword){
        req.flash('error', `Mật khẩu không trùng khớp`);
        res.redirect("back");
        return;
    }
    next();
}