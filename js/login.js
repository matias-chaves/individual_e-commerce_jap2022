let email = document.getElementById('email')
let pw = document.getElementById('password')
let sign_inBtn = document.getElementById('sign_in')
let alerta = document.getElementById('alerta')



function input_complete(e) {
    e.preventDefault()
    if(email.value.includes('@') && pw.value.length !== 0){
        localStorage.setItem('usuario',email.value);
        window.location.href = "index.html"
    }else{
        alert("Algo anda mal! Ingrese los campos correctamente.")
    }
}

function onsuccess (){
    window.location.href = "index.html"
}

sign_inBtn.addEventListener("click",input_complete)
