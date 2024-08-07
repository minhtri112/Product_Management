const mongoose = require("mongoose");

const settingGenreralSchema = new mongoose.Schema(
    {
        websiteName : String,
        logo : String,
        phone : String,
        email : String,
        address : String,
        copyright : String
    },
    {
        timestamps : true
    }
);

const SettingGenreral = mongoose.model('SettingGenreral', settingGenreralSchema,"settings-genreral");

module.exports = SettingGenreral