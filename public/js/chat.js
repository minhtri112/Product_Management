import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'


// FILE UPLOAD WITH PREVIEW
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-image',{
    multiple : true,
    maxFileCount : 6
});

// FILE UPLOAD WITH PREVIEW


// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray || [];

        
        
        if (content || images.length > 0) {
            socket.emit("CLIENT_SEND_MESSAGE",{
                content : content,
                images : images
            });
            e.target.elements.content.value = "";
            // Xóa các hình ảnh trong thẻ input
            upload.resetPreviewPanel();

            // Ẩn typing khi đã gửi tin nhắn
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    });
}
// CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const boxTyping = document.querySelector(".inner-list-typing");
    const div = document.createElement("div");
    let htmlFullName = "";
    let htmlCotent = "";
    let htmlImages = "";

    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
    }
    else {
        div.classList.add("inner-incoming");
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    }

    if(data.content){
        htmlCotent = `<div class="inner-content">${data.content}</div>`;
    }

    if(data.images){
        htmlImages += `<div class="inner-images">`;

        for(const item of data.images){
            htmlImages += `
            <img src=${item}>
            `
        }
        htmlImages += ` </div>`
    }



    div.innerHTML = `
     ${htmlFullName}
     ${htmlCotent}
     ${htmlImages}
    `;
    body.insertBefore(div,boxTyping);
    body.scrollTop = body.scrollHeight;
});
// SERVER_RETURN_MESSAGE

// Scroll Chat To Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// Scroll Chat To Bottom


// Show typing
var timeOut;
const showTyping = ()=>{
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
};
// End Show typing

// emoji-picker
// show popup

const buttonIcon = document.querySelector(".button-icon");
const tooltip = document.querySelector('.tooltip');
Popper.createPopper(buttonIcon, tooltip);
if (buttonIcon) {
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}

// insert icon
const emojiPicker = document.querySelector('emoji-picker');
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input");
    emojiPicker.addEventListener('emoji-click', (even) => {
        const icon = even.detail.unicode;
        inputChat.value = inputChat.value + icon;
        const end = inputChat.value.length;
        inputChat.setSelectionRange(end,end);
        inputChat.focus();
        showTyping();
    });


    

    inputChat.addEventListener("keyup", () => {
        showTyping();
    });
}
// emoji-picker


// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if(data.type === "show"){
            const exitstTyping = elementListTyping.querySelector(`[user-id='${data.userId}']`);
            
            if(!exitstTyping){
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id",data.userId);

                boxTyping.innerHTML = `
                <div class = "inner-name">${data.fullName}</div>
                <div class = "inner-dots">
                     <span></span>
                     <span></span>
                     <span></span>
                </div>
                `;

                elementListTyping.appendChild(boxTyping);
                bodyChat.scrollTop = bodyChat.scrollHeight;
            }
        }
        else{
            const boxTypingRemove = elementListTyping.querySelector(`[user-id='${data.userId}']`);
            if(boxTypingRemove){
                elementListTyping.removeChild(boxTypingRemove);
            }
        }
    });
};
// SERVER_RETURN_TYPING