let url = "https://japceibal.github.io/emercado-api/cats_products/101.json"

fetch(url)
    .then(response => response.json())
    .then(data => productos(data))
    .catch(error => console.log(error))



function productos(data) {
    console.log(data);
    let tablebody = document.getElementById('tablebody');
    for (let i = 0; i < data.products.length; i++) {
        tablebody.innerHTML += `
        <tr><td class="tdbody"><img src="${data.products[i].image}" class="img-thumbnail" style="max-width:200px;"></td>
        <td><h3>${data.products[i].name}</h3><p class="text-muted">${data.products[i].description}</p></td><td><small class="text-muted">${data.products[i].soldCount} vendidos.</small></td></tr>
        `
    }
}