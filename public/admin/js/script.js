// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    })
}

// End Button Status


// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const fromChangeStatus = document.querySelector("#form-change-status");
    console.log(fromChangeStatus);
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

// From search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // hủy load mặc định 
        const keyword = e.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;

    })
}
// End From search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if (buttonPagination) {
    let url = new URL(window.location.href);

    buttonPagination.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}
// End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        }
        else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    });

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;
            }
        })
    })
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");


        const typeChange = e.target.elements.type.value;

        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn chắc chắn muốn xóa?");
            if(!isConfirm){
                return;
            }
        }

       if(inputsChecked.length > 0){
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            let ids = [];
            inputsChecked.forEach(input =>{
                const id = input.value;
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='postion']").value;

                    ids.push(`${id}-${position}`);
                }
                else{
                    ids.push(id);
                }
            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else{
            alert("Vui lòng chọn ít nhất một bản ghi");
        }

    })
}
//End Form Change Multi


// Delete Item

const buttonsDelete = document.querySelectorAll("[button-delete-item]");
if(buttonsDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach(button =>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("Bạn chắc chắn muốn xóa sản phẩm này?");

            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}



// End Delete Item

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time)

    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })

}
// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePriview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change",(e)=>{
        const file = e.target.files[0];
        if(file){
            uploadImagePriview.src = URL.createObjectURL(file);
        }
    });
}
// End Upload Image



// Sort
const sort = document.querySelector("[sort]");
if(sort){
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    let url = new URL(window.location.href);

    sortSelect.addEventListener("change",(e)=>{
        const value = sortSelect.value;
        const [sortKey,sortValue] = value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);

        window.location.href = url.href;
    });

    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortValue");
        url.searchParams.delete("sortKey");
        window.location.href = url.href;
    })


    // Thêm select cho option
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`);
        optionSelected.selected = true;
    }
}
// End Sort
