const Account = require("../../models/account.model");
const Role = require("../../models/role.model.js");
const md5 = require("md5");
// [GET] admin/accounts
module.exports.index = async (req, res) => { // truy cập vào trang chủ
    const records = await Account.find({delete : false}).select("-password -token");
    for(const record of records){
        const role = await Role.findOne({delete : false, _id : record.role_id});
        record.role = role;
    }
    res.render("admin/pages/accounts/index.pug",{
        pageTitle : "Trang tài khoản",
        records : records
    });
}



// [GET] admin/accounts/create
module.exports.create = async (req, res) => { // truy cập vào trang chủ
    const records = await Role.find({delete : false});
    res.render("admin/pages/accounts/create.pug",{
        pageTitle : "Trang tạo tài khoản mới",
        records : records
    });
}


// [PATCH] admin/accounts/create
module.exports.createPatch = async (req, res) => { // truy cập vào trang chủ
    
    try {
        const emailExists = await Account.findOne(
            {
                email : req.body.email,
                delete : false
            }
        )
        if(emailExists){
            req.flash('error', `Tài khoản ${req.body.email} đã tồn tại`);
            res.redirect("back");
        }
        else{
            req.body.password = md5(req.body.password);
            const account = new Account(req.body);
            await account.save();
            req.flash('success', `Tạo tài khoản thành công`);
            res.redirect("back");
        }


    } catch (error) {
        req.flash('error', `Tạo tài khoản thành công`);
        res.redirect("back");
    }
    
}


// [GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => { // truy cập vào trang chủ
    const id = req.params.id;
    const record = await Account.findOne({_id : id});
    const records =  await Role.find({delete : false});
    res.render("admin/pages/accounts/edit.pug",{
        pageTitle : "Chỉnh sửa tài khoản",
        record : record,
        records : records
    });
}



// [PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => { // truy cập vào trang chủ
    try {
        const id = req.params.id;
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
        req.flash('error', `Cập nhật thât bại`);
        res.redirect("back");
    }
}

