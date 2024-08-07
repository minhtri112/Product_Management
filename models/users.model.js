
const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const userSchema = new mongoose.Schema(
    {
        fullName : String,
        email : String,
        password : String,
        token : {
            type : String,
            default : generate.generateRandomString(20)
        },
        phone : String,
        avatar : String,
        statusOnline : String,
        friendList : [
            {
                user_id : String,
                room_chat_id : String
            }
        ],
        acceptFriends : Array,
        requestFriends : Array,
        role_id : String,
        status : {
            type : String,
            default : 'active'
        },
        delete :{
            type : Boolean,
            default : false
        },
        deleteAt : Date,
    },
    {
        timestamps : true,
    }
);

const User = mongoose.model('User',  userSchema, "users");

module.exports = User