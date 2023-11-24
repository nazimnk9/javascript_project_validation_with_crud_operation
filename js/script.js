document.addEventListener("DOMContentLoaded", function () {
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
    let userList = document.querySelector(".user-list ol");

    let passwordMatch = false;
    let isPassword = false;
    let emailMatch = false;

    form.addEventListener("submit",processFormData);

    function processFormData(e){
        e.preventDefault();
        // console.log(e);
        validateForm();
    }

    function validateForm() {
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
        let li = document.createElement("li");
        li.classList.add("user-item");

        let nameSpan = document.createElement("span");
        let phoneSpan = document.createElement("span");
        let emailSpan = document.createElement("span");
        let urlSpan = document.createElement("span");
        let passwordSpan = document.createElement("span");

        nameSpan.textContent = "Name: " + name.value;
        phoneSpan.textContent = "Phone: " + phone.value;
        emailSpan.textContent = "Email: " + email.value;
        urlSpan.textContent = "URL: " + url.value;
        passwordSpan.textContent = "Password: " + "*".repeat(password.value.length);

        let userActionsDiv = document.createElement("div");
        userActionsDiv.classList.add("user-actions");

        let editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.textContent = "Edit";

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        editButton.addEventListener("click", function () {
            editUser(li, nameSpan, phoneSpan, emailSpan, urlSpan, passwordSpan);
        });

        deleteButton.addEventListener("click", function () {
            li.remove();
        });

        userActionsDiv.appendChild(editButton);
        userActionsDiv.appendChild(deleteButton);

        li.appendChild(nameSpan);
        li.appendChild(phoneSpan);
        li.appendChild(emailSpan);
        li.appendChild(urlSpan);
        li.appendChild(passwordSpan);
        li.appendChild(userActionsDiv);

        userList.appendChild(li);
    }

    function editUser(li, nameSpan, phoneSpan, emailSpan, urlSpan, passwordSpan) {
        let editButton = li.querySelector(".edit-btn");
        let deleteButton = li.querySelector(".delete-btn");
        let updateButton = document.createElement("button");
        updateButton.classList.add("update-btn");
        updateButton.textContent = "Update";

        let nameInput = createInputField("text", nameSpan.textContent.split(": ")[1]);
        let phoneInput = createInputField("tel", phoneSpan.textContent.split(": ")[1]);
        let emailInput = createInputField("text", emailSpan.textContent.split(": ")[1]);
        let urlInput = createInputField("url", urlSpan.textContent.split(": ")[1]);
        let passwordInput = createInputField("password", "");

        updateButton.addEventListener("click", function () {
            nameSpan.textContent = "Name: " + nameInput.value;
            phoneSpan.textContent = "Phone: " + phoneInput.value;
            emailSpan.textContent = "Email: " + emailInput.value;
            urlSpan.textContent = "URL: " + urlInput.value;
            passwordSpan.textContent = "Password: " + "*".repeat(passwordInput.value.length);

            let userActionsDiv = li.querySelector(".user-actions");
            userActionsDiv.innerHTML = "";
            userActionsDiv.appendChild(editButton);
            userActionsDiv.appendChild(deleteButton);

            li.replaceChild(nameSpan, nameInput);
            li.replaceChild(phoneSpan, phoneInput);
            li.replaceChild(emailSpan, emailInput);
            li.replaceChild(urlSpan, urlInput);
            li.replaceChild(passwordSpan, passwordInput);
        });

        let cancelButton = document.createElement("button");
        cancelButton.classList.add("cancel-btn");
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", function () {
            let userActionsDiv = li.querySelector(".user-actions");
            userActionsDiv.innerHTML = "";
            userActionsDiv.appendChild(editButton);
            userActionsDiv.appendChild(deleteButton);

            li.replaceChild(nameSpan, nameInput);
            li.replaceChild(phoneSpan, phoneInput);
            li.replaceChild(emailSpan, emailInput);
            li.replaceChild(urlSpan, urlInput);
            li.replaceChild(passwordSpan, passwordInput);

            });

            let userActionsDiv = li.querySelector(".user-actions");
            userActionsDiv.innerHTML = "";
            userActionsDiv.appendChild(updateButton);
            userActionsDiv.appendChild(cancelButton);

            li.replaceChild(nameInput, nameSpan);
            li.replaceChild(phoneInput, phoneSpan);
            li.replaceChild(emailInput, emailSpan);
            li.replaceChild(urlInput, urlSpan);
            li.replaceChild(passwordInput, passwordSpan);
    }

    function createInputField(type, value) {
        let input = document.createElement("input");
        input.type = type;
        input.value = value;
        return input;
    }
});