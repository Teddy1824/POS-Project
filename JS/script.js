let products = 
JSON.parse(localStorage.getItem("products")) ?
 JSON.parse(localStorage.getItem("products")) : [ 
    {
    title: "Wool Hand-Made Sweater",
    catergory: "Sweater",
    price: "300",
    img: "https://i.postimg.cc/QM8yQn69/sweater.jpg"
},

{
    title: "The North Face",
    catergory: "T-Shirt",
    price: "150",
    img: "https://i.postimg.cc/TP3tL5wn/t-shirt.jpg"
},

{
    title: "Shorts",
    catergory: "Men Short",
    price: "150",
    img: "https://i.postimg.cc/qRtQQf2R/shorts.jpg"
},

{
    title: "Jonathan D",
    catergory: "Formal Men Shoes",
    price: "800",
    img: "https://i.postimg.cc/3xnBTrBN/jd.jpg"
},

{
    title: "Denim Top",
    catergory: "Denim Clothing",
    price: "500",
    img: "https://i.postimg.cc/qvMsjVTT/denimtop.jpg"
},

{
    title: "Denim Jean",
    catergory: "Denim Clothing",
    price: "700",
    img: "https://i.postimg.cc/mZY742Z4/denim-jean.jpg"
},
{
    title: "Casual Shoe",
    catergory: "Casual Men Shoes",
    price: "600",
    img: "https://i.postimg.cc/PqDPM2PH/casualshoe-jpg.webp"
}

];

let cart = [
    JSON.parse(localStorage.getItem("cart")) ?
JSON.parse(localStorage.getItem("cart")) : [],

]


function readProducts(products) {
    document.querySelector("#products").innerHTML = "";
    console.log(products);

    products.forEach((product, i) => {
        document.querySelector("#products").innerHTML += `
        
    
        <div class="clothes">
        <img src=${product.img}>
        <h4>${product.title}</h4>
        <h5>${product.price}</h4>
        <div class="cart-buttons">
               <input type="number" class="control" value=${product.quan} min=1 id="editCart${i}">
              </div>
             
        <button type="button" onclick="deleteProduct(${i}) " class="btn btn-danger" id="input-delete" >Delete</button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#input-edit${i}" >Edit</button>
        <button type="button" class="btn btn-success" onclick="readCart(${i})">Add to cart</button>
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

function readCart(i) {
    console.log(i)
    console.log(cart)
    let quan = document.querySelector(`#editCart${i}`).value;
    let inserted = false;
    cart.forEach(product => {
        if (product.title == products[i].title) {
            product.quan = parseInt(product.quan) + parseInt(quan);
            inserted = true;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    });

    if (!inserted) {
        cart.push({...products[i], quan});
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    console.log(cart)
}

function categorySort() {
    let category = document.querySelector("#categorySort").value;
    if (category == "All") {
        
        readProducts(products);
        return;
    }


  let filteredProducts = products.filter(product => {
       return product.category == category
    })
    readProducts(filteredProducts);
}

function arrangeName() {
    let direction = document.querySelector("#arrangeName").value;

    let arrangedProducts = products.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        }
        
    })
}