const Role = require("../../models/role.model.js");
const systemConfig = require("../../config/system.js");
// [GET] admin/roles
module.exports.index = async (req, res) => { // truy cập vào trang chủ
    const find = {
        delete : false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/index.pug",{
        pageTitle : "Nhóm quyền",
        records : records
    });
}

// [GET] admin/roles/create
module.exports.create =  (req, res) => { // truy cập vào trang chủ
    res.render("admin/pages/roles/create.pug",{
        pageTitle : "Thêm mới nhóm quyền",
    });
}

// [POST] admin/roles/create
module.exports.createPost =  async (req, res) => { // truy cập vào trang chủ
    try {
        const role = new Role(req.body);
        await role.save();
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
    }
}


// [GET] admin/roles/edit
module.exports.edit = async (req, res) => { // truy cập vào trang chủ
    const id = req.params.id;
    const data = await Role.findOne({delete : false,_id : id});
    res.render("admin/pages/roles/edit.pug",{
        pageTitle : "Chỉnh sửa nhóm quyền",
        data : data
    });
}


// [PATHC] admin/roles/edit/:id
module.exports.editPatch =  async (req, res) => { 
    const id = req.params.id;
    try {
        await Role.updateOne({_id : id},req.body);
        req.flash('success', `Cập nhập sản phẩm thành công`);

    } catch (error) {
        
    }
    res.redirect(`back`);
}


// [PATHC] admin/roles/premissions
module.exports.premissions =  async (req, res) => { 
    const find = {
        delete : false
   }
   const records = await Role.find(find);
   res.render("admin/pages/roles/premissions.pug",{
    pageTitle : "Phân quyền",
    records : records
   });
}



// [PATCH] admin/roles/premissions
module.exports.premissionsPatch =  async (req, res) => { 
    try {
        const premisstions = JSON.parse( req.body.permissions);
        if(premisstions){
            for(const item of premisstions){
                await Role.updateOne({_id : item.id}, {premissions : item.premissions});
            }
            req.flash("success","Cập nhật phân quyền thành công")
            res.redirect(`back`);
        }
    } catch (error) {
        req.flash("error","Cập nhật phân quyền thất bại");
        res.redirect(`back`);
    }
}