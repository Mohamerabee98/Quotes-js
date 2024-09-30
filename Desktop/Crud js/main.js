var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCat = document.getElementById('productCat');
var productDesc = document.getElementById('productDesc');
var addBtn = document.getElementById('addBtn');
var productRow = document.getElementById('productRow');

var productList ;

if(localStorage.getItem('list') == null)
    productList =[]

else{
    productList = JSON.parse(localStorage.getItem('list'))
    display()
}




addBtn.onclick = function () {
    addProduct()


}

function addProduct() {
    var productObj = {
        pName: productName.value,
        pPrice: productPrice.value,
        PDesc: productDesc.value,
        pcat: productCat.value,
    }


    productList.push(productObj);
    localStorage.setItem('list',JSON.stringify(productList))
    clearForm()

}


function clearForm() {
    productName.value = null;
    productPrice.value = null;
    productCat.value = null;
    productDesc.value = null;

}

function display() {
    var box = ''
    for (var i = 0; i < productList.length; i++) {
        box += `  <div class="col-md-3 ">
        <div class="product position-relative  card ">
            <span  class="position-absolute end-0 top-0 badge bg-info">${i + 1}</span>
            <img src="image/work-4.jpg" alt="product" class="img-fluid my-2">
            <h2 class="h3">${productList[i].pName} </h2>
            <p class="my-2 lead">${productList[i].PDesc} </p>
            <div class="d-flex justify-content-between  ">
                <h3 class="h4">${productList[i].pcat} </h3>
                <h4 class="h5">${productList[i].pPrice} </h4>
            </div>
        </div>
    </div>`
    }
    productRow.innerHTML = box

}

