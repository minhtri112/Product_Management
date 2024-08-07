const Chat = require("../../models/chat.model");
const User = require("../../models/users.model");
const chatSocket = require("../../sockets/clients/chat.socket");
// [GET] /chat/:room_chat_id
module.exports.index = async (req, res) => {
    const roomChatId = req.params.room_chat_id;
    //SOCKET
    chatSocket(req,res);
    //End SOCKET

    // Lấy ra data
    const chats = await Chat.find({
        delete : false,
        room_chat_id : roomChatId
    });

    for(const chat of chats){
        const infoUser = await User.findOne({
            _id : chat.user_id,
        }).select("fullName");

        chat.infoUser = infoUser;
    }
    res.render("client/pages/chart/index.pug", {
        titlePage: "Chart",
        chats : chats
    });
}