const EXT_TYPE = ".json";
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
//Concatenado a esta variable esta el catID referente a la categoria del producto.
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem('catID') + EXT_TYPE;

const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem('prodID') + EXT_TYPE;

const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem('prodID') + EXT_TYPE;

const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/"+"25801"+ EXT_TYPE;

const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// variable boton ingresar
let login_btn = document.getElementById('login_btn');

function removeItem() {
  localStorage.removeItem('usuario')
}

// funcion para obtener datos
function obtener_datos() {
    if(localStorage.getItem('usuario')){
        login_btn.innerHTML = `
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          ${localStorage.getItem('usuario')}
        </button>
      
        <ul class="dropdown-menu dropdown-menu-dark w-25" aria-labelledby="dropdownMenuLink">
          <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
          <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
          <hr class="dropdown-divider">
          <li><a onclick="removeItem()" class="dropdown-item" href="login.html">Cerrar sesion</a></li>
        </ul>
      </div>
        `
    }else{
        login_btn.innerHTML = `<a href="login.html" class="btn btn-secondary">Ingresar</a>`;
    }
}

// llamando a la funcion
obtener_datos();

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}