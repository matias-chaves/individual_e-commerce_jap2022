//Array vacio
let product_info_list =[];
let comments = [];

//input comment y boton enviar
let input_textarea = document.getElementById('comment_area');
let btn_enviarcomment = document.getElementById('btn_enviarcomment');
let btn_buy = document.getElementById('btn-buy');


//Fetch product info
fetch(PRODUCT_INFO_URL)
  .then(res => res.json())
  .then(info_product => {
   // console.log(info_product);
    product_info_list = info_product

    PROD_INFO_LAYOUT(product_info_list)
    relatedProd(product_info_list)

    
  })
  .catch(err => console.log(err))

//Fetch comments
fetch(PRODUCT_INFO_COMMENTS_URL)
  .then(resp => resp.json())
  .then(comment_product=>{
  // console.log(comment_product);
  comments = comment_product;

  COMMT_PRODUCT(comments);
})


//Function Mostrar informacion de producto
function PROD_INFO_LAYOUT(param){

  let HTML_print = "";

      HTML_print = `
        <div class="mt-4">
          <h3>${param.name}</h3>
        </div>
        <hr>

        <!-- Carousel y Caracteristicas -->
        
        <div class="row">
          <div id="carousel_info_product">
            <div id="carousel_products_info" class="carousel slide" data-bs-touch="false">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="${param.images[0]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                  <img src="${param.images[1]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                  <img src="${param.images[2]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                  <img src="${param.images[3]}" class="d-block w-100">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carousel_products_info" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carousel_products_info" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div class="col" id="html_info_product">
          <div>
          <p><strong>Precio</strong></p>
          ${param.currency} ${param.cost}
          </div>
          <div>
          <p><strong>Descripci??n</strong></p>
          ${param.description}
          </div>
          <div>
          <p><strong>Categor??a</strong></p>
          ${param.category}
          </div>
          <div>
          <p><strong>Cantidad de vendidos</strong></p>
          ${param.soldCount}
          </div>
          </div>
        </div>
        `

        //function addtocart
        function addtocart (){
          //if cart key is not null then set cart key
          if(localStorage.getItem('cart') == null){
            localStorage.setItem('cart','[]')
          }

          //create an array that allocate the cart key value
          let localItems = JSON.parse(localStorage.getItem('cart'))
          
          //if array of items length is equal to 0 then push the product info, else if find an element id is equal to prod id increase element count by 1
          if(localItems.length == 0){
            localItems.push({
              id:param.id,
              image:param.images[0],
              name:param.name,
              cost:param.cost,
              count:1,
              subtotal:param.cost,
              currency:param.currency})
          }else{

           let found = localItems.find(element => element.id === param.id)
            if(found === undefined){
              localItems.push({
                id:param.id,
                image:param.images[0],
                name:param.name,
                cost:param.cost,
                count:1,
                subtotal:param.cost,
                currency:param.currency})
              }
          }
          //set localItems to localstorage
          localStorage.setItem('cart',JSON.stringify(localItems))

          //redirect to cart.html
          window.location.href='cart.html'
        }
        
        btn_buy.addEventListener('click',addtocart)

      // console.log(param);
      document.getElementById('info_contenedor').innerHTML = HTML_print
}

//function show product comments
function COMMT_PRODUCT(param) {
  let html_layout = "";
  for (let i = 0; i <param.length; i++) {

    let stars = "";

    //for loop que itera entre b y 5
    //mientras b sea menor al valor del score, se pintan estrellas
    //luego se pasa a mostrar sin pintar
    for (let b = 0; b < 5; b++) {
      if(b < param[i].score){
        stars+= `<span class="fa fa-star checked"></span>`
      }else{
        stars+= `<span class="far fa-star"></span>`
      }
    }
    
    html_layout += `
    <tr>
        <td style="vertical-align:top;">
          <small><strong>${param[i].user}</strong></small>
          <small class="text-muted"> - ${param[i].dateTime} - </small>
          ${stars}
          <p class="text-muted">${param[i].description}</p>
        </td>
    </tr>
    `
 
    document.getElementById('tbody_comments').innerHTML = html_layout

  }

}

//function add comment
function addComment(e) {
  //preventDefault que previene que la pagina se refresque
  e.preventDefault()
  if(input_textarea.value !== ""){
    //instanciando objeto date para crear el formato de fecha
    let date = new Date()
    let current_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    let current_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let date_time = current_date + " " + current_time

    let html_comment = "";
    
    let star_your_comment = "";

    let selectStar = document.getElementById('rating_stars')
    

    //for loop que itera en la cantidad de elementos dentro del elemento html select
    //mientras z sea menor a la opcion pinta estrellas, cuando z llega a este valor de opcion
    //pasa a mostrar estrellas sin pintar, o en caso que llegue al valor de la cantidad de elementos
    //que hay en el elemento select deja de funcionar
    for (let z = 0; z < selectStar.length; z++) {
      let option = selectStar.value;
      if(z < option){
        star_your_comment += `<span class="fa fa-star checked"></span>`
      }else{
        star_your_comment += `<span class="far fa-star"></span>`
      }
      
    }




    html_comment = `
    <tr>
      <td style="vertical-align:top;">
        <small><strong>${localStorage.getItem('usuario')}</strong></small>
        <small class="text-muted"> - ${date_time} - </small>
        ${star_your_comment}
        <p class="text-muted">${input_textarea.value}</p>
      </td>
    </tr>
    `

    document.getElementById('tbody_comments').innerHTML += html_comment

  }

}

function relatedProd(param) {
  for (let a = 0; a < param.relatedProducts.length; a++) {
    // console.log(param.relatedProducts[a]);
    document.getElementById('cards').innerHTML +=`
    <div onclick="setProdID(${param.relatedProducts[a].id})" class="card col cursor-active" style="max-width: 18rem; margin-right:2rem; padding:0px">
      <img src="${param.relatedProducts[a].image}" class="card-img-top">
    <div class="card-body">
      <h5 class"card-title">${param.relatedProducts[a].name}</h5>
    </div>
    </div>
    `
  }
}


//button enviar
btn_enviarcomment.addEventListener('click',addComment)

