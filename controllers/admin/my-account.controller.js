const Account = require("../../models/account.model");
const Role = require("../../models/role.model.js");
const md5 = require("md5");
// [GET] admin/my-account
module.exports.index =  (req, res) => { // truy cập vào trang chủ
    res.render("admin/pages/my-account/index.pug",{
        pageTitle : "Chi tiết tài khoản",
    });
}



// [GET] admin/my-account/edit
module.exports.edit =  (req, res) => { // truy cập vào trang chủ
    res.render("admin/pages/my-account/edit.pug",{
        pageTitle : "Cập nhật tài khoản",
    });
}


// [PATCH] admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    try {
        const id = res.locals.user.id;
        const emailExists = await Account.findOne(
            {
                _id : {$ne : id},
                email : req.body.email,
                delete : false
            }
        )
        if(!emailExists){
            if(req.body.password){
                req.body.password = md5(req.body.password);
            }else{
                delete req.body.password;
            }
            await Account.updateOne({_id : id},req.body);
            req.flash('success', `Cập nhật thành công`);
            res.redirect("back");
        }
        else{
            req.flash('error', `Tài khoản ${req.body.email} đã tồn tại`);
            res.redirect("back");
        }


    } catch (error) {
        console.log(error);
        req.flash('error', `Cập nhật thât bại`);
        res.redirect("back");
    }
}