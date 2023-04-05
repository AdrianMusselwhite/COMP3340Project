fetch('http://localhost:5000/get_products')
  .then(response => response.json())
  .then(data => {
    const productContainer = document.getElementById('pro-container');
    console.log("website")
    let html = '';
    console.log(data)
    data.products.forEach(product => {
      html += `
          <div class="pro">
            <img src="${product.image}" alt="">
            <div class="des">
              <span>${product.name}</span>
              <h3>${product.description}</h3>
              <h4>$${product.price.toFixed(2)} each</h4>
              <div class="counter">
                <p>Quantity:</p>
                <span class="down" onClick='decreaseCount(event, this)'>-</span>
                <input type="text" value="1">
                <span class="up" onClick='increaseCount(event, this)'>+</span>
              </div>
              <button class="add-to-cart" onclick="addToCart(this)">Add to Cart</button>
            </div>
          </div>
      `;
    });
    productContainer.innerHTML = html;
  });