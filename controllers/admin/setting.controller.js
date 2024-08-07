const SettingGenreral = require("../../models/settings-gerenral.model");

// [GET] admin/dashboard
module.exports.general =  async (req, res) => { // truy cập vào trang chủ
    const settingGenreral = await SettingGenreral.findOne({});
    res.render("admin/pages/settings/general.pug",{
        pageTitle : "Cài đặt chung",
        settingGenreral : settingGenreral
    });
}


// [PATCH] admin/dashboard
module.exports.generalPatch = async (req, res) => { 
    const settingGenreral = await SettingGenreral.findOne({});
    if(settingGenreral){
        await SettingGenreral.updateOne(
            {
                _id : settingGenreral.id,
            }, req.body
        )
    }
    else{
        const record = new SettingGenreral(req.body);
        await record.save();
    }


    req.flash("success","Cập nhật thành công !");
    res.redirect("back");
}