const uploadToCloudinary = require("../../helpers/uploadToCloudinary");
const Chat = require("../../models/chat.model");
module.exports = async (req,res)=>{
    const user_id = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const roomChatId = req.params.room_chat_id;
    _io.once('connection', (socket) => {
        socket.join(roomChatId);
        socket.on("CLIENT_SEND_MESSAGE", async (data)=>{

            let images = [];

            for(const imageBuffet of data.images){
                const image = await uploadToCloudinary(imageBuffet);
                images.push(image);
            }

            // Lưu tin nhắn vào data
            const chat = new Chat({
                user_id : user_id,
                room_chat_id : roomChatId,
                content : data.content,
                images : images
            });
            await chat.save();

            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE",{
                userId : user_id,
                fullName : fullName,
                content : data.content,
                images : images
            });
        });


        socket.on("CLIENT_SEND_TYPING",(type)=>{
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING",{
                userId : user_id,
                fullName : fullName,
                type : type
            });
        });
    });
}