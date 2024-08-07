// Chức năng gửi yêu cầu
const listBtnAddFriends = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriends) {
    listBtnAddFriends.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");

            socket.emit("CLIENT_ADD_FRIEND", userId);
        })
    });
}
// Chức năng gửi yêu cầu


// Chức năng hủy yêu cầu kết bạn
const listBtnCancelFriends = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriends.length > 0) {
    listBtnCancelFriends.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");

            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })
    });
}
// Chức năng hủy yêu cầu kết bạn


// Chức năng hủy yêu cầu thực hiện kết bạn
const listBtnDeleteFriends = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnDeleteFriends.length > 0) {
    listBtnDeleteFriends.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse");
            const userId = button.getAttribute("btn-refuse-friend");

            socket.emit("CLIENT_DELETED_FRIEND", userId);
        })
    });
}
// Chức năng hủy yêu cầu thực hiện kết bạn



// Chức năng kết bạn
const listBtnAppeptFriends = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAppeptFriends.length > 0) {
    listBtnAppeptFriends.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted");
            const userId = button.getAttribute("btn-accept-friend");

            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        })
    });
}
// Chức năng kết bạn


// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUsersAccept = document.querySelector("[badge-users-accept]");
    const id = badgeUsersAccept.getAttribute("badge-users-accept");

    if (data.userId == id) {
        badgeUsersAccept.innerHTML = data.lengthAcceptFriend;

        console.log("OK");
    }
});
// SERVER_RETURN_LENGTH_ACCEPT_FRIEND


// SERVER_RETURN_INFO_ACCEPT_FRIEND

socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    if(dataUsersAccept){
        const userId = dataUsersAccept.getAttribute("data-users-accept");

        if (userId == data.userId) {
            const newBox = document.createElement("div");
            newBox.classList.add("col-6");
            newBox.setAttribute("user-id",data.infoUserA._id);
    
            const html = `
             <div class="box-user" bis_skin_checked="1">
             <div class="inner-avatar" bis_skin_checked="1">
             <img src="https://png.pngtree.com/png-clipart/20190922/original/pngtree-business-male-user-avatar-vector-png-image_4774078.jpg" alt="${data.infoUserA.fullName}">
             </div><div class="inner-info" bis_skin_checked="1"><div class="inner-name" bis_skin_checked="1">${data.infoUserA.fullName}
             </div><div class="inner-button" bis_skin_checked="1">
             <button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserA._id}" fdprocessedid="gsgwj">Chấp nhận
             </button><button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.infoUserA._id}" fdprocessedid="66sykq">Xóa
             </button><button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="${data.infoUserA._id}" disabled="disabled">Đã xóa</button>
             <button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="${data.infoUserA._id} disabled="disabled">Đã chấp nhận</button></div>
             </div></div>
            `;
            newBox.innerHTML = html;
    
            dataUsersAccept.appendChild(newBox);
    
            // Xóa lời mời kết bạn
            const btnRefuseFriend = newBox.querySelector("[btn-refuse-friend]");
            btnRefuseFriend.addEventListener("click", () => {
                btnRefuseFriend.closest(".box-user").classList.add("refuse");
                const userId = btnRefuseFriend.getAttribute("btn-refuse-friend");
    
                socket.emit("CLIENT_DELETED_FRIEND", userId);
            })
            // Chấp nhận kết bạn
            const btnAccpetFriend = newBox.querySelector("[btn-accept-friend]");
            btnAccpetFriend.addEventListener("click", () => {
                btnAccpetFriend.closest(".box-user").classList.add("accepted");
                const userId = btnAccpetFriend.getAttribute("btn-accept-friend");
    
                socket.emit("CLIENT_ACCEPT_FRIEND", userId);
            })
        }
    }

    const dataUsersNotFriend = document.querySelector("[data-users-not-friend]");

    if(dataUsersNotFriend){
        const userId = dataUsersNotFriend.getAttribute("data-users-not-friend");
        if(userId == data.userId){
            const boxUserRemove = dataUsersNotFriend.querySelector(`[user-id = "${data.infoUserA._id}"]`);
            if(boxUserRemove){
                dataUsersNotFriend.removeChild(boxUserRemove);
            }
        }
    }
});
// END SERVER_RETURN_INFO_ACCEPT_FRIEND

// SERVER_RETURN_USER_ID_CACEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CACEL_FRIEND",(data)=>{
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    const userId = dataUsersAccept.getAttribute("data-users-accept");

    if(userId == data.userIdB){
        const boxA = dataUsersAccept.querySelector(`[user-id = "${data.userIdA}"]`);
        dataUsersAccept.removeChild(boxA);
    }
});
// SERVER_RETURN_USER_ID_CACEL_FRIEND


// SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE",(userId)=>{
    const dataUserFriend = document.querySelector("[data-user-friend]");
    if(dataUserFriend){
        const boxUser = dataUserFriend.querySelector(`[user_id = "${userId}"]`);
        boxUser.querySelector("[status]").setAttribute("status","online");
    }
});

// SERVER_RETURN_USER_ONLINE


// SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE",(userId)=>{
    const dataUserFriend = document.querySelector("[data-user-friend]");
    if(dataUserFriend){
        const boxUser = dataUserFriend.querySelector(`[user_id = "${userId}"]`);
        boxUser.querySelector("[status]").setAttribute("status","offline");
    }
});

// SERVER_RETURN_USER_ONLINE