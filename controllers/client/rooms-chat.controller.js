const User = require("../../models/users.model");
const RoomChat = require("../../models/room-chat.model");
//[GET] /rooms-chat
module.exports.index = async (req,res)=>{
    const userId = res.locals.user.id;
    const rooms_chat = await RoomChat.find(
        {
            typeRoom : "group",
            "users.user_id" : userId
        }
    ) 
    res.render("client/pages/rooms-chat/index.pug",{
        titlePage : "Phòng chat",
        rooms_chat : rooms_chat
    });
}


//[GET] /rooms-chat/create
module.exports.create = async (req,res)=>{
    const friendList = res.locals.user.friendList;
    
    for(const friend of friendList){
        const infoUser = await User.findOne({
            _id : friend.user_id 
        }).select("fullName avatar");

        friend.infoUser = infoUser;
    };

    res.render("client/pages/rooms-chat/create.pug",{
        titlePage : "Tạo phòng",
        friendList : friendList
    });
}

//[POST] /rooms-chat/create
module.exports.createPost = async (req,res)=>{
    const title = req.body.title;
    const userId = req.body.userId;

    const dataChat = {
        title : title,
        typeRoom : "group",
        users : [],
    };

    userId.forEach(id => {
        dataChat.users.push(
            {
                user_id : id,
                role : "user",
            }
        );
    });

    dataChat.users.push(
        {
            user_id : res.locals.user.id,
            role : "superAdmin",
        }
    );

    const room = new RoomChat(dataChat);
    await room.save();

    res.redirect(`/chat/${room.id}`);
}