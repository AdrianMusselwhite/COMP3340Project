const prodArr = ["Pens", "Pencils", "Notebook", "Highlighters", "Sticky Notes", "Dry Erase Board", "Dry Erase Markers", "Calculator", "Backpack", "3-Ring Binder", "Coloured Pencils", "12\" Ruler", "Glue Stick", "Crayons", "Stapler", "Scissors"];

function updateCartText() {

    console.log("UPDATING!!")
    const cartDiv = document.querySelector(".listCard");
    let html = '';
    let total = 0.0;
    let count = 0;
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
                        <span style="color:	#e61300"> x ${quantity}</span>
                        <h4>$${price} each</h4>
                    </div>
                </div>
                `;
                total += (price * quantity);
                count += quantity;
            }
        }
    }

    html += `
    <h2>Total: $${total.toFixed(2)}</h2>
    <br>
    <button id="remove-all">Remove All Items</button>
    `  
    cartDiv.innerHTML = html;

    const totalCount = document.getElementById("totalCount");
    totalCount.innerHTML = count;

    const removeAllButton = document.getElementById("remove-all");
    removeAllButton.addEventListener("click", removeAllItems);
}

function removeAllItems() {
    localStorage.removeItem("cart");
    updateCartText();
}

function addToCart(event) {

    console.log(event.parentNode)
    const productName = event.parentNode.querySelector("span").textContent;
    const productPrice = parseFloat(event.parentNode.querySelector("h4").textContent.slice(1));
    const productQuantity = parseInt(event.parentNode.querySelector("input").value);

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
    console.log(localStorage.getItem("cart"))

    updateCartText()
}

