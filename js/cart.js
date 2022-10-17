
let tabledata = document.getElementById('cart_tableData');

fetch(CART_INFO_URL)
    .then(res => res.json())
    .then(cart_usrData =>{
        console.log(cart_usrData);
        showArcticles(cart_usrData)
    })


function showArcticles(cart_usrData){
    let html_articles = "";

    let article = cart_usrData.articles[0]
    console.log(article);

        html_articles = `
        <tr>
        <td scope="row">
            <img src="${article.image}" style="max-width:80px;max-height:50px">
        </td>
        <td>
            <p>${article.name}</p>
        </td>
        <td>
            <p>${article.unitCost}</p>
        </td>
        <td>
            <input id="articlevalue" class="form-control" style="max-width:60px" type="number" min="1" value="${article.count}">
        </td>
        <td>
            <p><strong id="unitcost">${article.currency} ${article.unitCost}</strong></p>
        </td>
        <tr>
        `

        tabledata.innerHTML = html_articles

        if(localStorage.getItem('cart_item')){
            local_cartitems = JSON.parse(localStorage.getItem('cart_item'))

            let cart_td = "";
        
            for (const object of local_cartitems) {
                cart_td += `
                <tr>
                <td scope="row">
                <img src="${object.images[0]}" style="max-width:80px;max-height:50px">
                </td>
                <td>
                    <p>${object.name}</p>
                </td>
                <td>
                    <p>${object.cost}</p>
                </td>
                <td>
                    <input class="form-control" id="${object.name}" style="max-width:60px" type="number" min="1" value="1">
                </td>
                <td>
                    <p><strong id="${object.cost}">${object.currency} ${object.cost}</strong></p>
                </td>
                <tr>
                `
                tabledata.innerHTML =html_articles + cart_td
    
                console.log(object)
                //change subtotal value local product
                let cantidad = document.getElementById(`${object.name}`)
                
                cantidad.addEventListener('change', () =>{
                    document.getElementById(`${object.cost}`).innerHTML = `${object.currency} ${object.cost * cantidad.value}`
                }) 

            }
        }

        //change subtotal value fetched product
        document.addEventListener('change',()=>{
            let subtotal = document.getElementById('unitcost')
            let sumsubtotal = document.getElementById('articlevalue').value * article.unitCost
            
            subtotal.innerHTML = `${article.currency} ${sumsubtotal}`
        })

}