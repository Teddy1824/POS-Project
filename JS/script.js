let products = 
// JSON.parse(localStorage.getItem("products")) ?
//  JSON.parse(localStorage.getItem("products")) : [];

[ {
    title: "Wool Hand-Made Sweater",
    catergory: "Sweater",
    price: "R300.00",
    img: "https://i.postimg.cc/QM8yQn69/sweater.jpg"
},

{
    title: "The New Face",
    catergory: "T-Shirt",
    price: "R150.00",
    img: "https://i.postimg.cc/TP3tL5wn/t-shirt.jpg"
},

{
    title: "Shorts",
    catergory: "Men Short",
    price: "R150.00",
    img: "https://i.postimg.cc/qRtQQf2R/shorts.jpg"
},

{
    title: "Jonathan D",
    catergory: "Formal Men Shoes",
    price: "R800.00",
    img: "https://i.postimg.cc/3xnBTrBN/jd.jpg"
},

{
    title: "Denim Top",
    catergory: "Denim Clothing",
    price: "R500.00",
    img: "https://i.postimg.cc/qvMsjVTT/denimtop.jpg"
},

{
    title: "Denim Jean",
    catergory: "Denim Clothing",
    price: "R700.00",
    img: "https://i.postimg.cc/mZY742Z4/denim-jean.jpg"
},
{
    title: "Casual Shoe",
    catergory: "Casual Men Shoes",
    price: "R600.00",
    img: "https://i.postimg.cc/PqDPM2PH/casualshoe-jpg.webp"
}

];

function readProducts(products) {
    document.querySelector("#products").innerHTML = "";
    console.log(products);

    products.forEach((product, i) => {
        document.querySelector("#products").innerHTML += `
        
        <div class="clothes">
        <img src=${product.img}>
        <h4>${product.title}</h4>
        <h5>${product.price}</h4>
        <button type="button" onclick="deleteProduct(${i}) " class="btn btn-danger" id="input-delete" >Delete</button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#input-edit${i}" >Edit</button>
        </div>

        <div class="modal fade" id="input-edit${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Updating!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

        <div class="modal-body">
        <h4>Product title</h4>
        <input type="text" id="input-title-${i}"><br>
        <h4>Category</h4>
        <select name="choosen-item" id="select-category-${i}">
            <option>-SELECT ONE-</option>
            <option>Men Shorts</option>
            <option>Formal Men Shoes</option>
            <option>Denim Clothing</option>
            <option>Casual Men Shoes</option>
            <option>Sweater</option>
        </select>
        
        <h4>Price</h4>
        <input type="text" id="input-price-${i}"  placeholder="R0.00">
        
        <h4>Image URL</h4>
        <input type="text" id="input-img-${i}">
        
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="updateProduct(${i})" data-bs-dismiss="modal">Save changes</button>
        </div>
    
    </div>
  </div>
</div>

        `;
    })
}

readProducts(products);


function viewProducts() {
    // let product = document.querySelector("#products").value;
    let title = document.querySelector("#input-title").value;
    let catergory = document.querySelector("#select-category").value;
    let price = document.querySelector("#input-price").value;
    let img = document.querySelector("#input-img").value;
    try {
        if(!title || !price || !img) throw new Error ("Please select an item.");
        products.push({
            title,
            catergory,
            price,
            img,
        });
        localStorage.setItem("products", JSON.stringify(products));
    
readProducts(products);

    } catch (err) {
        alert (err)
    };
}

function deleteProduct(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
}

function updateProduct(i) {
    let title = document.querySelector(`#input-title-${i}`).value;
    let catergory = document.querySelector(`#select-category-${i}`).value;
    let price = document.querySelector(`#input-price-${i}`).value;
    let img = document.querySelector(`#input-img-${i}`).value;
    console.log(products);
    try {
        if(!title || !price || !img) throw new Error ("Please select an item.");
    products[i] = {
            title,
            catergory,
            price,
            img,
    };

    localStorage.setItem("products", JSON.stringify(products));

    readProducts(products);
    
} catch (err) {
    alert (err)
};

}