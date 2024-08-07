module.exports.createPost = (req, res,next)=>{
    if(!req.body.title){
        console.log("Lỗi");
        req.flash('error', `Vui lòng nhập tiêu đề`);
        res.redirect("back");
        return;
    }
    next();
}