const User = require("../../models/users.model");
const RoomChat = require("../../models/room-chat.model");
module.exports = (res)=>{
    _io.once('connection', (socket) => {
        // Người dùng gửi yêu cầu kết bạn
        socket.on("CLIENT_ADD_FRIEND", async (userId) =>{
            const myUserId = res.locals.user.id;

            // Thêm id của A vào acceptFriends của B
            const existsUserAtoB = await User.findOne({
                _id : userId,
                acceptFriends : myUserId
            });

            if(!existsUserAtoB){
                await User.updateOne(
                    {_id : userId},
                    {$push : {acceptFriends : myUserId}}
                )
            }
            // Thêm id của B vào requestFriends của A
            const existsUserBtoA = await User.findOne({
                _id : myUserId,
                requestFriends : userId
            });

            if(!existsUserBtoA){
                await User.updateOne(
                    {_id : myUserId},
                    {$push : {requestFriends : userId}}
                )
            }

            // Lấy độ dài của acceptFriends của B trả về cho B

            const infoUser = await User.findOne({
                _id : userId,
            });

            const lengthAcceptFriend = infoUser.acceptFriends.length;

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
                userId : userId,
                lengthAcceptFriend : lengthAcceptFriend
            });

            // Lấy thông tin của user A

            const infoUserA = await User.findOne({
                _id : myUserId
            });

            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND",{
                userId : userId,
                infoUserA : infoUserA
            });

        });


        // Người dùng hủy yêu cầu kết bạn
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) =>{
            const myUserId = res.locals.user.id;
            // Xóa id của A trong acceptFriends của B
                await User.updateOne(
                    {_id : userId},
                    {$pull : {acceptFriends : myUserId}}
                );
            // Xóa id của B trong requestFriends của A
                await User.updateOne(
                    {_id : myUserId},
                    {$pull : {requestFriends : userId}}
                );
            // Lấy độ dài của acceptFriends của B trả về cho B

            const infoUser = await User.findOne({
                _id : userId,
            });

            const lengthAcceptFriend = infoUser.acceptFriends.length;

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
                userId : userId,
                lengthAcceptFriend : lengthAcceptFriend
            });


            // Lấy userId của A trả về cho B
            socket.broadcast.emit("SERVER_RETURN_USER_ID_CACEL_FRIEND",{
                userIdB : userId,
                userIdA : myUserId
            });

        });


        // Người dùng xóa yêu cầu kết bạn
        socket.on("CLIENT_DELETED_FRIEND", async (userId) =>{
            const myUserId = res.locals.user.id;
            console.log(userId);
            console.log(myUserId);
            // Xóa id của B trong acceptFriends của A
                await User.updateOne(
                    {_id : myUserId},
                    {$pull : {acceptFriends : userId}}
                );
            // Xóa id của A trong requestFriends của B
                await User.updateOne(
                    {_id : userId},
                    {$pull : {requestFriends : myUserId}}
                );
        });


        // Chức năng kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) =>{
            const myUserId = res.locals.user.id;


            // Tạo phòng chat
            const roomChat = new RoomChat({
                typeRoom : "friend",
                users : [
                    {
                        user_id : userId,
                        role : "superAdmin",
                    },
                    {
                        user_id : myUserId,
                        role : "superAdmin" 
                    }
                ],
            });

           await roomChat.save();
            
            // Xóa id của B trong acceptFriends của A
                await User.updateOne(
                    {_id : myUserId},
                    {
                        $pull : {acceptFriends : userId},
                        $push : {
                           friendList : {
                           user_id : userId,
                           room_chat_id : roomChat.id
                         }}
                       }
                );
            // Xóa id của A trong requestFriends của B
                await User.updateOne(
                    {_id : userId},
                    {
                     $pull : {requestFriends : myUserId},
                     $push : {
                        friendList : {
                        user_id : myUserId,
                        room_chat_id : roomChat.id
                      } }
                    }
                );
        });

        
    });
}