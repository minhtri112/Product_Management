
const User = require("../../models/users.model.js");

const userSocket = require("../../sockets/clients/users.socket.js");


// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
    // socket
    userSocket(res);
    // socket
    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id : userId,
    });

    const requestFriends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;


    const user = await User.find({
        $and : [
            {_id : {$ne : userId}},
            {_id : {$nin : requestFriends}},
            {_id : {$nin : acceptFriends}},
        ],
        status : 'active',
        delete : false
    })
    
    res.render("client/pages/users/not-friend.pug",{
        titlePage : "Danh sách users",
        users : user
    });
}

// [GET] /users/request
module.exports.request = async (req, res) => {
    // socket
    userSocket(res);
    // socket
    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id : userId,
    });

    const requestFriends = myUser.requestFriends;


    const user = await User.find({
        _id : {$in : requestFriends },
        status : 'active',
        delete : false
    })
    
    res.render("client/pages/users/request.pug",{
        titlePage : "Các user đã gửi yêu cầu kết bạn",
        users : user
    });
}


// [GET] /users/accept
module.exports.accept = async (req, res) => {
    // socket
    userSocket(res);
    // socket
    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id : userId,
    });

    const acceptFriends = myUser.acceptFriends;


    const user = await User.find({
        _id : {$in : acceptFriends },
        status : 'active',
        delete : false
    })
    
    res.render("client/pages/users/accept.pug",{
        titlePage : "Lời mời kết bạn",
        users : user
    });
}


// [GET] /users/friends
module.exports.friends = async (req, res) => {
    // socket
    userSocket(res);
    // socket
    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id : userId,
    });

    const friendList = myUser.friendList;

    const friendListId = friendList.map(item =>{
        return item.user_id;
    });



    const users = await User.find({
        _id : {$in : friendListId },
        status : 'active',
        delete : false
    });

    users.forEach(user => {
        const infoUser = friendList.find(item => item.user_id == user.id);
        user.room_chat_id = infoUser.room_chat_id;
    });

    res.render("client/pages/users/friends.pug",{
        titlePage : "Bạn bè",
        users : users
    });
}