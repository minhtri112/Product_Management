// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const fromChangeStatus = document.querySelector("#form-change-status");
    const path = fromChangeStatus.getAttribute("data-path");
    
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let statusChange = statusCurrent == "active" ? "inactive" : "active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`;

            fromChangeStatus.action = action

            fromChangeStatus.submit() 
        })
    })
}
// End Change Status