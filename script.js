// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add items to the cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    updateCart();
}

// Function to update the cart display
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total");

    if (!cartList || !totalPrice) return; // Prevents errors if elements are missing

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} - ₹${item.price} <button onclick='removeFromCart(${index})'>Remove</button>`;
        cartList.appendChild(listItem);
        total += item.price;
    });

    totalPrice.innerText = total;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    updateCart();
}

// Function to load cart data on checkout page
function loadCheckout() {
    let orderItemsList = document.getElementById("order-items");
    let totalPrice = document.getElementById("total-price");

    if (!orderItemsList || !totalPrice) return; // Prevents errors if elements are missing

    orderItemsList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        orderItemsList.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item) => {
            let listItem = document.createElement("li");
            listItem.textContent = `${item.name} - ₹${item.price}`;
            orderItemsList.appendChild(listItem);
            total += item.price;
        });
    }

    totalPrice.textContent = total;
}

// Function to handle checkout form submission
function handleCheckout(event) {
    event.preventDefault(); // Prevent page reload

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let paymentMethod = document.querySelector('input[name="payment"]:checked');

    if (!name || !email || !address || !phone || !paymentMethod) {
        alert("Please fill all details and select a payment method.");
        return;
    }

    alert(`Order placed successfully!\nTotal: ₹${document.getElementById("total-price").textContent}\nName: ${name}\nPayment: ${paymentMethod.value}`);

    localStorage.removeItem("cart"); // Clear cart after checkout
    window.location.href = "index.html"; // Redirect to homepage
}

// Attach event listeners when the DOM loads
document.addEventListener("DOMContentLoaded", function () {
    updateCart(); // Update cart on all pages

    if (window.location.pathname.includes("checkout.html")) {
        loadCheckout(); // Load checkout details
        let checkoutForm = document.getElementById("checkout-form");
        if (checkoutForm) {
            checkoutForm.addEventListener("submit", handleCheckout);
        }
    }
});
