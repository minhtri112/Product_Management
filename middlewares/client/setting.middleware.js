const SettingGeneral = require("../../models/settings-gerenral.model");

module.exports.settingGeneral = async (req,res,next) =>{
    const settingGeneral = await SettingGeneral.findOne({});
    res.locals.settingGeneral = settingGeneral;
    next();
}