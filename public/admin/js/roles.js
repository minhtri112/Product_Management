// Premissions
const tablePermissions = document.querySelector("[table-permission]");
if(tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let premissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");

        rows.forEach(row =>{
            const name = row.getAttribute("data-name");
            if(name == "id"){
                const inputs = row.querySelectorAll("input");
                inputs.forEach(input =>{
                    premissions.push({
                        id : input.value,
                        premissions : []
                    })
                });
            }
            else{
                const checks = row.querySelectorAll("input[type='checkbox']");
                checks.forEach((check,index) => {
                    if(check.checked){
                        premissions[index].premissions.push(name);
                    }
                })
            }
        });


    const formChangePremissions = document.querySelector("#form-change-premissions");
    console.log(formChangePremissions);
    if(premissions.length > 0){
        const inputChangePremissions = formChangePremissions.querySelector("input[name='permissions']");
        console.log(inputChangePremissions);
        inputChangePremissions.value = JSON.stringify(premissions);
        formChangePremissions.submit();
    }

    });
    
}
// End Premissions