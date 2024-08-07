const mongoose = require("mongoose");

const roomChatSchema = new mongoose.Schema(
    {
        title : String,
        avatar : String,
        typeRoom : String,
        users : [
            {
                user_id : String,
                role : String,
            }
        ],
        delete : {
            type : Boolean,
            default : false
        },
        deleteAt : Date
    },
    {
        timestamps : true
    }
);

const RoomChat = mongoose.model('RoomChat', roomChatSchema,"rooms-chat");

module.exports = RoomChat;