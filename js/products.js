//Function que almacena y muestra el usuario en la navbar
obtener_datos()

//Variables
let product_list = []; //Array que posteriormente almacena el JSON
let btn_AZ = document.getElementById('btn_AZ');//Button AZ
let btn_ZA = document.getElementById('btn_ZA');//Button ZA
let btn_Asc = document.getElementById('btn_Asc');//Button Asc by SoldCount
let btn_filter = document.getElementById('btn_filter');//Button filter
let btn_clean = document.getElementById('btn_clean');//Button clean
let min_input = document.getElementById('min_input');//Input minCost
let max_input = document.getElementById('max_input');//Input maxCost
let search_bar = document.getElementById('search_bar');//Search_input


//Evento botones filtros
btn_AZ.addEventListener('click',showSortedAZitems);
btn_ZA.addEventListener('click',showSortedZAitems);
btn_Asc.addEventListener('click',showSortedByRelevance);
btn_filter.addEventListener('click',filtered);
btn_clean.addEventListener('click',clean_filter);
search_bar.addEventListener('input',searchbar);

//FETCH
fetch(PRODUCTS_URL)
.then(response => response.json())
.then(data=>{
    document.getElementById('descripcion').innerHTML = `<p>Verás aquí todos los productos de la categoría ${data.catName}</p>`

    product_list = data.products;

    HTML_list(product_list)
})
.catch(error=>console.log(error))


//Funciones sort AZ, ZA, y SoldCount
function sortAZ(a,b){
    if(a.cost < b.cost){
        return -1;
    }
    if(a.cost > b.cost){
        return 1;
    }
    return 0;
}
//Function Sort by Z-A
function sortZA(a,b){
    if(a.cost < b.cost){
        return 1;
    }
    if(a.cost > b.cost){
        return -1;
    }
    return 0;
}
//Function Sort by Relevance
function sortbyRelevance(a,b){
    if(a.soldCount < b.soldCount){
        return 1;
    }
    if(a.soldCount > b.soldCount){
        return -1;
    }
    return 0;
}
//Function sortById
function sortbyId(a,b){
    if(a.id < b.id){
        return -1;
    }
    if(a.id > b.id){
        return 1;
    }
    return 0;
}

//Funciones de filtros
function showSortedByRelevance(){
    HTML_list(product_list.sort(sortbyRelevance))
}

function showSortedAZitems(){
    HTML_list(product_list.sort(sortAZ))
}

function showSortedZAitems(){
    HTML_list(product_list.sort(sortZA))
}

function filtered(){
    let product_filter = product_list;

    if(min_input.value !== ""){
        product_filter = product_filter.filter(a => a.cost >= min_input.value)
    }
    if(max_input.value !== ""){
        product_filter = product_filter.filter(a => a.cost <= max_input.value)
    }

    HTML_list(product_filter)
}

function searchbar(){
    let product_search = product_list;

    if(search_bar.value !== ""){
        product_search = product_search.filter(a => a.name.toLowerCase().includes(search_bar.value.toLowerCase()) || a.description.toLowerCase().includes(search_bar.value.toLowerCase()));
    }

    HTML_list(product_search);
}

function clean_filter(){
    HTML_list(product_list.sort(sortbyId))
}


//Lista que muestra products
function HTML_list(param){
    
    let Print_products = ""
    for (let i = 0; i < param.length; i++) {
    //Muestra una tabla de productos en el html
    Print_products += `
    <tr>
        <td class="tdbody">
            <img src="${param[i].image}" class="img-thumbnail" style="max-width:200px;">
        </td>
        <td>
            <h3>${param[i].name}</h3>
            <p class="text-muted">${param[i].description}</p>
            <h4>${param[i].currency} ${param[i].cost}</h4>
        </td>
        <td>
            <small class="text-muted">${param[i].soldCount} vendidos.</small>
        </td>
    </tr>
    `
    }

    let tablebody = document.getElementById('tablebody').innerHTML = Print_products;
}