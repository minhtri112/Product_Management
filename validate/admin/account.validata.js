module.exports.createPost = (req, res,next)=>{
    if(!req.body.fullName){
        req.flash('error', `Vui lòng nhập họ tên`);
        res.redirect("/admin/accounts/create");
        return;
    }
    if(!req.body.password){
        req.flash('error', `Vui lòng nhập password`);
        res.redirect("/admin/accounts/create");
        return;
    }

    if(!req.body.email){
        req.flash('error', `Vui lòng nhập eamil`);
        res.redirect("/admin/accounts/create");
        return;
    }

    next();
}