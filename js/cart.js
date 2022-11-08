//Variables

const tableCartHTML = document.getElementById('TableCartHTML');

const premiumRadio = document.getElementById('premiumradio');
const expressRadio = document.getElementById('expressradio');
const standardRadio = document.getElementById('standardradio');

const subtotal_cost = document.getElementById('subtotal_span');
const shipping_cost = document.getElementById('shipping_span');
const total_cost = document.getElementById('total_span');

const div_radios = document.getElementById('div_radios');

const input_addresses = document.querySelectorAll('.address')

const payment_type = document.getElementById('payment_type');

const modal = document.getElementById('staticBackdrop');

const radio_creditCard = document.getElementById('radio_creditCard');
const radio_bank_transfer = document.getElementById('bank_transfer');

const card_num = document.getElementById('card_number');
const card_sec = document.getElementById('card_sec');
const card_expiration = document.getElementById('card_expiration');

const transf_accountNum = document.getElementById('transf_accountNum');

const form = document.getElementById('form');
const adress = document.querySelectorAll('adress');
const form_send = document.getElementById('form_send');

let updatedTotal = 0;
let cost_of_shipping = 0;
let initial_cost_of_shipping = 0.15
let sumOfTotals = 0


document.addEventListener('DOMContentLoaded',displayAllItems)
//event that show totals
document.addEventListener('DOMContentLoaded',updateTotals)
//event that change the radios total
div_radios.addEventListener('change',updateShippingCost)


//display the totals
function displayTotals (){
    subtotal_cost.textContent = `USD ${updatedTotal}`
    shipping_cost.textContent = `USD ${cost_of_shipping}`
    total_cost.textContent = `USD ${sumOfTotals}`
}

//updating in realtime when radios change
function updateShippingCost(){
    if(premiumRadio.checked){
        cost_of_shipping = Math.floor(updatedTotal * premiumRadio.value)
        // console.log(cost_of_shipping);
        sumOfTotals = (updatedTotal + cost_of_shipping)
        shipping_cost.textContent = `USD ${cost_of_shipping}`
        total_cost.textContent = `USD ${sumOfTotals}`
    }
    if(expressRadio.checked){
        cost_of_shipping = Math.floor(updatedTotal * expressRadio.value)
        // console.log(cost_of_shipping);
        sumOfTotals = (updatedTotal + cost_of_shipping)
        shipping_cost.textContent = `USD ${cost_of_shipping}`
        total_cost.textContent = `USD ${sumOfTotals}`
    }
    if(standardRadio.checked){
        cost_of_shipping = Math.floor(updatedTotal * standardRadio.value)
        // console.log(cost_of_shipping);
        sumOfTotals = (updatedTotal + cost_of_shipping)
        shipping_cost.textContent = `USD ${cost_of_shipping}`
        total_cost.textContent = `USD ${sumOfTotals}`
    }
}


function updateTotals() {

    let local_cart_items = JSON.parse(localStorage.getItem('cart'));

    // consigo un array de los productos en pesos
    let producto_UYU = local_cart_items.filter(el => el.currency == "UYU")

    let producto_USD = local_cart_items.filter(elem => elem.currency == "USD")

    const sumUSD = producto_USD.reduce((summarize,num)=>{
        return Math.round(summarize + num.subtotal)
    },0)

    // convierto los productos en pesos a dolares
    const sumUYU = producto_UYU.reduce((total,number)=>{
        return Math.round(total + (number.subtotal / 40))
    }, 0)

    

    updatedTotal = sumUSD + sumUYU

    // console.log(updatedTotal);
    
    //updating in realtime when the quantity of items change
    if(premiumRadio.checked){
        cost_of_shipping = Math.round(updatedTotal * premiumRadio.value)
        // console.log(cost_of_shipping);
        sumOfTotals = updatedTotal + cost_of_shipping
    }
    if(expressRadio.checked){
        cost_of_shipping = Math.round(updatedTotal * expressRadio.value)
        // console.log(cost_of_shipping);
        sumOfTotals = updatedTotal + cost_of_shipping
    }
    if(standardRadio.checked){
        cost_of_shipping = Math.round(updatedTotal * standardRadio.value)
        // console.log(cost_of_shipping);
        sumOfTotals = updatedTotal + cost_of_shipping
    }


    //display the totals
    displayTotals()

    
}

function emptyCart(){
    let local_cart_items = JSON.parse(localStorage.getItem('cart'));

    if(local_cart_items.length === 0){
        document.getElementById('alert-info').classList.add('show')

        tableCartHTML.innerHTML =""
    }
}


function deleteItem(id){

    let local_cart_items = JSON.parse(localStorage.getItem('cart'));

    for (let i = 0; i < local_cart_items.length; i++) {

        if(local_cart_items[i].id === id){
            local_cart_items.splice(i,1)
            localStorage.setItem('cart',JSON.stringify(local_cart_items))
            updateTotals()
        }

        displayAllItems()
        emptyCart()
    }
}

function displayAllItems(){

    let local_cart_items = JSON.parse(localStorage.getItem('cart'))

    let cart_tableData = "";

    for(const item of local_cart_items){
        cart_tableData += `
        <tr style="vertical-align:middle; text-align:center;">
        <td scope="row">
            <img src="${item.image}" style="max-width:80px;max-height:50px">
        </td>
        <td>
            <p>${item.name}</p>
        </td>
        <td>
            <p>${item.cost}</p>
        </td>
        <td>
            <input class="form-control" id="input_${item.id}" style="max-width:60px" type="number" min="1" value="${item.count}">

        </td>
        <td>
        <strong id="cost${item.id}"> ${item.currency} ${item.cost * item.count} </strong>
        </td>
        <td>
            <button onclick="deleteItem(${item.id})" class="btn" style="border-color:red;"><i class="fa fa-trash-o" style="font-size:25px;color:red"></i></button>
        </td>
        <tr>
        `

        tableCartHTML.innerHTML = cart_tableData

    }
    emptyCart()

}


    //Event that update the subtotal by quantity 
    tableCartHTML.addEventListener('change',(e)=>{
        let local_cart_items = JSON.parse(localStorage.getItem('cart'))
        //target the input value
        let quantity = e.target.value
        //target the input id value to set the subtotal id after
        let quantity_id = e.target.id.slice(6)
        //setting the subtotal id
        let subtotal =  document.getElementById('cost'+quantity_id)
        //finding an elemenent that match the element.id with te quantity.id
        let product = local_cart_items.find(element =>
            element.id == quantity_id
        )

        let itemtoPush = local_cart_items.findIndex(it => it.id == quantity_id)
        

        // console.log(quantity_id);
        //modifying the subtotal content
        subtotal.textContent = `${product.currency} ${product.cost * quantity}`

        local_cart_items[itemtoPush].subtotal = (product.cost * quantity);
        local_cart_items[itemtoPush].count = parseInt(quantity);


        localStorage.setItem('cart',JSON.stringify(local_cart_items))

        updateTotals()
    })



function alertSuccess (){
    document.getElementById('alert-success').classList.add('show')
}

function alertDanger (){
    document.getElementById('alert-danger').classList.add('show')
}




function checkModal(){
    if(radio_creditCard.checked){
        //remove attribute disabled
        card_num.removeAttribute('disabled')
        card_sec.removeAttribute('disabled')
        card_expiration.removeAttribute('disabled')
        
        //set the attribute disabled to transf_accountNum
        transf_accountNum.setAttribute('disabled','')

        payment_type.textContent = `Tarjeta de crédito`
    }
    if(radio_bank_transfer.checked){
        //remove attribute disabled
        transf_accountNum.removeAttribute('disabled')

        //set the attribute disabled to card_inputs
        card_num.setAttribute('disabled','')
        card_sec.setAttribute('disabled','')
        card_expiration.setAttribute('disabled','')

        payment_type.textContent = `Transferencia bancaria`
    }
}


function checkModalradios(){

    const payment_modalLink = document.getElementById('payment_modalLink');

    if(radio_creditCard.checked && card_num.value != "" && card_sec.value !="" && card_expiration.value != ""){
        alertSuccess()
    }

    if(radio_bank_transfer.checked && transf_accountNum.value !=""){
        alertSuccess()
        
    }

    if(!radio_bank_transfer.checked && radio_creditCard.checked){
        payment_modalLink.classList.remove('is-invalid')
        payment_modalLink.classList.add('is-valid')
    }else if(!radio_creditCard.checked && radio_bank_transfer.checked){
        payment_modalLink.classList.remove('is-invalid')
        payment_modalLink.classList.add('is-valid')
    }else if(!radio_creditCard.checked && !radio_bank_transfer.checked){
        payment_modalLink.classList.add('is-invalid')
        alertDanger()
    }

}


function validatecheck(e){
    e.preventDefault()


    form.classList.remove('was-validated');
    modal.classList.remove('was-validated');


    if(!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
    }

    checkModalradios();

    form.classList.add('was-validated');
    modal.classList.add('was-validated')
}




form.addEventListener('submit',validatecheck)

modal.addEventListener('change',checkModal)
