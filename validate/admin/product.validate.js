module.exports.createPost = (req, res,next)=>{
    if(req.body.title.trim().length == 0){
        req.flash('error', `Vui lòng nhập tiêu đề`);
        res.redirect("http://localhost:3000/admin/products/create");
        return;
    }
    next();
}