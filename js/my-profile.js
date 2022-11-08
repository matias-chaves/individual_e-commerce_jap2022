
function $(id) {
    return document.querySelector(id)
}

//Variables
const my_profile_form = $('#my-profile-from');

const userNameInput = $('#username');
const userSecondNameInput = $('#usersecondname');

const userSurnameInput = $('#usersurname');
const userSecondSurnameInput = $('#usersecondsurname');

const userEmailInput = $('#userEmail');
const userTelInput = $('#userTel');

const userProfileImg = $('#userProfilePhoto')

//Ask if there's an email in localStorage
function emailfinder(){
    if(localStorage.getItem('usuario')){
        userEmailInput.value = localStorage.getItem('usuario')
    }
}

//Stores UserInfo in localStorage
function StoringUserData() {
    if(!localStorage.getItem('userData')){
        localStorage.setItem('userData','[]')
    }

    let NewUserData = JSON.parse(localStorage.getItem('userData'))

    NewUserData.push({
        FirstName:userNameInput.value,
        SecondName:userSecondNameInput.value,
        Surname:userSurnameInput.value,
        SecondSurname:userSecondSurnameInput.value,
        Photo:"",
        Tel:userTelInput.value
    })

    localStorage.setItem('userData',JSON.stringify('NewUserData'))
}

//Form event
my_profile_form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(!my_profile_form.checkValidity()){
        e.preventDefault()
        e.stopPropagation()
    }

    StoringUserData()

    my_profile_form.classList.add('was-validated')

    console.log('Se envia el formulario');
})

emailfinder()
