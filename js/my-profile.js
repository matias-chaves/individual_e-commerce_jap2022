
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

const userProfileImg = $('#userProfilePhoto');
const userImgInput = $('#userprofileimage');



userImgInput.addEventListener('change',()=>{
    const reader = new FileReader();

    reader.readAsDataURL(userImgInput.files[0])

    reader.addEventListener('load',()=>{
        const url = reader.result

        userProfileImg.src = `${url}`

        localStorage.setItem('userimg', url)

        console.log(url);
    })

})

function loadUserImage() {
    if(localStorage.getItem('userimg')){
        userProfileImg.src = localStorage.getItem('userimg')
    }
}


//Ask if there's an email in localStorage
function emailfinder(){
    if(localStorage.getItem('usuario')){
        userEmailInput.value = localStorage.getItem('usuario')
    }
}

//Load UserInfo

function userInfoLoaded() {
    emailfinder()
    if(localStorage.getItem('userData')){
        let StoredUserData = JSON.parse(localStorage.getItem('userData'))

        let index = StoredUserData[0]

        userNameInput.value = index.FirstName
        userSecondNameInput.value = index.SecondName
        userSurnameInput.value = index.Surname
        userSecondSurnameInput.value = index.SecondSurname
        userTelInput.value = index.Tel

        userEmailInput.value = localStorage.getItem('usuario');
    }
}

//Stores UserInfo in localStorage
function StoringUserData() {
    if(!localStorage.getItem('userData')){
        localStorage.setItem('userData','[]')
    }

    let NewUserData = JSON.parse(localStorage.getItem('userData'))

    let i = NewUserData[0];

    if(NewUserData.length == 0){
        NewUserData.push({
            FirstName:userNameInput.value,
            SecondName:userSecondNameInput.value,
            Surname:userSurnameInput.value,
            SecondSurname:userSecondSurnameInput.value,
            Tel:userTelInput.value
        })
    }else{
        i.FirstName = userNameInput.value,
        i.SecondName = userSecondNameInput.value,
        i.Surname = userSurnameInput.value,
        i.SecondSurname = userSecondSurnameInput.value,
        i.Tel = userTelInput.value
    }

    localStorage.setItem('usuario',userEmailInput.value)

    localStorage.setItem('userData',JSON.stringify(NewUserData))

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

userInfoLoaded()

loadUserImage()




