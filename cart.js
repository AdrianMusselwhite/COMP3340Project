const prodArr = ["Pens", "Pencils", "Notebook", "Highlighters", "Sticky Notes", "Dry Erase Board", "Dry Erase Markers", "Calculator", "Backpack", "3-Ring Binder", "Coloured Pencils", "12\" Ruler", "Glue Stick", "Crayons", "Stapler", "Scissors"];

document.addEventListener("readystatechange", addListeners);
location.reload()

function addListeners() {
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
        console.log("ADD-TO-CART BUTTON EVENT LISTENER ADDED");
    });

    const viewCartButton = document.getElementById("view-cart-button");
    viewCartButton.addEventListener("click", updateCartText)
}

function updateCartText() {
    const cartDiv = document.querySelector(".listCard");
    let html = '';
    let total = 0.0;
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
        for (let i = 0; i < prodArr.length; i++) {
            const product = prodArr[i];
            if (cart[product]) {
                const name = cart[product].name;
                const price = cart[product].price;
                const quantity = cart[product].quantity;
                html += `
                <div class="pro cart-item">
                    <div class="des">
                    <span>${name}</span>
                    <h4>$${price} each</h4>
                    <div class="counter">
                        <p>Quantity:</p>
                        <span class="down" onClick='decreaseCount(event, this)'>-</span>
                        <input type="text" value="${quantity}">
                        <span class="up" onClick='increaseCount(event, this)'>+</span>
                    </div>
                    </div>
                </div>
                `;
                total += (price * quantity);
            }
        }
    }

    
    html += `
    <button id="update-cart">Update Cart</button>
    <br>
    <h2>Total: $${total}</h2>
    <br>
    <button id="remove-all">Remove All Items</button>
    `  
    cartDiv.innerHTML = html;

    const updateCartButton = document.getElementById("update-cart");
    updateCartButton.addEventListener("click", updateCart)

    const removeAllButton = document.getElementById("remove-all");
    removeAllButton.addEventListener("click", removeAllItems);
}

function removeAllItems() {
    localStorage.removeItem("cart");
    updateCartText();
}

function updateCart(event) {
    const cartItems = document.querySelectorAll('.cart-item');
    const cart = JSON.parse(localStorage.getItem("cart"));
    cartItems.forEach(item => {
        const name = item.querySelector('div.des span').textContent;
        const quantity = item.querySelector('div.counter input[type="text"]').value;
        cart[name].quantity = quantity;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartText();
}

function addToCart(event) {
    const productName = event.target.parentNode.querySelector("span").textContent;
    const productPrice = parseFloat(event.target.parentNode.querySelector("h4").textContent.slice(1));
    const productQuantity = parseInt(event.target.parentNode.querySelector("input").value);
  
    console.log("ADD TO CART PRESSED!!!!");

  // Create an object to represent the product
    const product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity
    };

    console.log(product);
    
    // Get the shopping cart from localStorage or create a new one
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    
    // Add the product to the shopping cart
    if (cart[productName]) {
        cart[productName].quantity += productQuantity;
    } else {
        cart[productName] = product;
    }
    
    // Save the shopping cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

