let cart =  JSON.parse(localStorage.getItem("cart")) ?
 JSON.parse(localStorage.getItem("cart")) : [];
console.log(cart);

function readCart(cart) {
    document.querySelector("#cart").innerHTML = ""

    cart.forEach((product, i ) => {
    document.querySelector("#cart").innerHTML += `
    
    <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.img}" class="cart-card img-fluid rounded-start">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.price}</p>
              <div class="cart-buttons">
               <input type="number" class="control" value=${product.quan} min=1 id="updateCartQ${i}" onchange="updateCart(${i})">
               <p>${parseInt(product.quan) * parseFloat(product.price)}</p>
              </div>

              <div>
            <button type="button" class="btn btn-danger w-50 ms-3" onclick="deleteCart(${i})" >
              Delete
            </button>
          </div>
      </div>

            </div>
          </div>
        </div>
      </div>
    `;
    })
    document.querySelector("#cart").innerHTML += `
    <h1 class="total">Your total is R${calculateTotal()}</h1>
    <button class="btn btn-primary" onclick="checkout()">Checkout</button>
    `;
      
}

readCart(cart);

function deleteCart(i) {
  let confirmation = confirm("Product being removed!");
    if (confirmation) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
    }
}

// function editCart(i) {
//   let quan = document.querySelector(`#delete${i}`).value;
//   localStorage.setItem("cart", JSON.stringify(cart));
//   readCart(cart);
// }

function updateCart(i) {
  let quan = document.querySelector(`#updateCartQ${i}`).value;
  cart[i] = {...cart[i], quan};
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
}

function calculateTotal() {
  let total = 0;
  cart.forEach(product => {
      total =  total + product.price * product.quan
  })
  return total.toFixed(2);
}

function checkout() {
  let total = calculateTotal()

  try {
    if (parseInt(total) == 0) throw new Error("Empty cart!");
    let confirmation = confirm(`Total payment required: R${calculateTotal()}`);

    if (confirmation) {
      cart.length = 0;
      localStorage.removeItem("cart");
    }

    readCart(cart);
  } catch (err) {
    alert (err);
  }
}