let form = document.getElementById("form");
let name = document.getElementById("name");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let url = document.getElementById("url");
let password = document.getElementById("password");
let conPassword = document.getElementById("con_password");
let nameError = document.getElementById("name_err");
let phoneError = document.getElementById("phone_err");
let emailError = document.getElementById("email_err");
let emailValidateRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let passValidateRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

let urlError = document.getElementById("url_err");
let passwordError = document.getElementById("password_err");
let conPasswordError = document.getElementById("con_password_err");
let messageContainer = document.querySelector(".message-container");
let message = document.getElementById("message");

/* let isValid = false; */
let passwordMatch = false;
let isPassword = false;
let emailMatch = false;

function validateForm(){
    // console.log(name);
    if(!name.value){
        nameError.textContent = "Please enter your name";
        nameError.style.color = "red";
        name.style.borderColor = "red";
    }else{
        nameError.textContent = "";
        name.style.borderColor = "green";
    }
    if(!phone.value){
        phoneError.textContent = "Please enter your phone number";
        phoneError.style.color = "red";
        phone.style.borderColor = "red";
    }else{
        phoneError.textContent = "";
        phone.style.borderColor = "green";
    }
    if(!email.value){
        emailError.textContent = "Please enter your email";
        emailError.style.color = "red";
        email.style.borderColor = "red";
    }else{
        emailError.textContent = "";
        if(email.value.match(emailValidateRegx)){
            emailMatch = true;
            message.textContent = "Match email!";
            message.style.color = "green";
            messageContainer.style.borderColor = "green";
            email.style.borderColor = "green";
        }else{
            emailMatch = false;
            emailError.textContent = "Don't match email";
            emailError.style.color = "red";
            email.style.borderColor = "red";
        }
    }
    if(!url.value){
        urlError.textContent = "Please enter your url";
        urlError.style.color = "red";
        url.style.borderColor = "red";
    }else{
        urlError.textContent = "";
        url.style.borderColor = "green";
    }
    if(!password.value){
        passwordError.textContent = "Please enter your password";
        passwordError.style.color = "red";
        password.style.borderColor = "red";
    }else{
        if(password.value.match(passValidateRegx)){
            isPassword = true;
            passwordError.textContent = "strong password";
            passwordError.style.color = "green";
            password.style.borderColor = "green";
        }else{
            isPassword = false;
            passwordError.textContent = "weak password";
            passwordError.style.color = "red";
            password.style.borderColor = "red";
        }
    }
    if(!conPassword.value){
        conPasswordError.textContent = "Please enter password again";
        conPasswordError.style.color = "red";
        conPassword.style.borderColor = "red";
    }else{
        conPasswordError.textContent = "";
        if(conPassword.value.match(passValidateRegx) && password.value.match(conPassword.value)){
            passwordMatch = true;
            message.textContent = "Match password!";
            message.style.color = "green";
            messageContainer.style.borderColor = "green";
            password.style.borderColor = "green";
            conPassword.style.borderColor = "green";
        }else{
            passwordMatch = false;
            conPasswordError.textContent = "don't match password!";
            message.textContent = "don't match password!";
            message.style.color = "red";
            messageContainer.style.borderColor = "red";
            password.style.borderColor = "red";
            conPassword.style.borderColor = "red";
            return;
        }
    }
    // isValid = form.checkValidity();
    if(!name.value || !phone.value || !email.value || !url.value || !password.value || !conPassword.value){
        message.textContent = "Please fill up the form!";
        message.style.color = "red";
        messageContainer.style.borderColor = "red";
        return;
    }else{
        message.textContent = "Filled up";
        message.style.color = "green";
        messageContainer.style.borderColor = "green";
    }
    if(name.value && phone.value && email.value && url.value && password.value && conPassword.value && emailMatch && isPassword && passwordMatch){
        addUserToList();
        message.textContent = "Successfully Register!";
        message.style.color = "green";
        messageContainer.style.borderColor = "green";

    }
}


function addUserToList() {
    /* let userList = document.querySelector(".user-list ol");
    let li = document.createElement("li");
    li.classList.add("user-item");

    // Create span elements for each form field
    let nameSpan = document.createElement("span");
    let phoneSpan = document.createElement("span");
    let emailSpan = document.createElement("span");
    let urlSpan = document.createElement("span");
    let passwordSpan = document.createElement("span");

    // Set the text content for each span
    nameSpan.textContent = "Name: " + name.value;
    phoneSpan.textContent = "Phone: " + phone.value;
    emailSpan.textContent = "Email: " + email.value;
    urlSpan.textContent = "URL: " + url.value;
    passwordSpan.textContent = "Password: " + password.value;

    
    li.appendChild(nameSpan);
    li.appendChild(phoneSpan);
    li.appendChild(emailSpan);
    li.appendChild(urlSpan);
    li.appendChild(passwordSpan);

    
    let userActionsDiv = document.createElement("div");
    userActionsDiv.classList.add("user-actions");

    let editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";

    userActionsDiv.appendChild(editButton);
    userActionsDiv.appendChild(deleteButton);

    li.appendChild(userActionsDiv);

    userList.appendChild(li); */

    
    let userObject = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        url: url.value,
        password: password.value
    };
    
    let userListArr = [];
    // console.log(userObject);
    
    userListArr.push(userObject);
    // console.log(userListArr);
    info(userListArr);
    
}
function info(userListArr){
    let userList = document.querySelector(".user-list ol");
    // userList.innerHTML = "";
    // userList.innerHTML = "";
    userListArr.map((item) =>{
        // console.log(item);
        // console.log(key);
        userList.innerHTML += `<li class="user-item">
        <span>Name: ${item.name}</span>
        <span>Phone: ${item.phone}</span>
        <span>Email: ${item.email}</span>
        <span>URL: ${item.url}</span>
        <span>Password: ${item.password}</span>
        
        <div class="user-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    </li>`;

});

// console.log(userListArr);

let deleteBtns = document.querySelectorAll(".delete-btn");
    console.log(deleteBtns);
    let deleteBtnArr = Array.from(deleteBtns);

    deleteBtnArr.map((deleteItem,index) =>{
        // console.log(deleteItem);
        // console.log(index);
        console.log(userListArr);
        deleteItem.addEventListener("click",function(){
            console.log(index);
            // userListArr.splice(index,1);
            // console.log(userListArr);
            // info(userListArr);
        });
    });
}

function processFormData(e){
    e.preventDefault();
    // console.log(e);
    validateForm();
}

form.addEventListener("submit",processFormData);