module.exports.loginPost = (req, res,next)=>{
    
    if(!req.body.email){
        req.flash('error', `Vui lòng nhập eamil`);
        res.redirect("/admin/auth/login");
        return;
    }

    if(!req.body.password){
        req.flash('error', `Vui lòng nhập password`);
        res.redirect("/admin/auth/login");
        return;
    }

    next();
}