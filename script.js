// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ✔ Load cart from sessionStorage or create empty
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// -----------------------------
// Render all products
// -----------------------------
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// -----------------------------
// Render Cart List
// -----------------------------
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -----------------------------
// Add Product to Cart
// -----------------------------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);

    // ✔ Save updated cart to sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }
}

// -----------------------------
// Clear Cart
// -----------------------------
function clearCart() {
  cart = [];
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// -----------------------------
// Event Listeners
// -----------------------------
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// -----------------------------
// Initial Render
// -----------------------------
renderProducts();
renderCart();
