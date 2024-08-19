document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function createCartItem(item) {
        return `
            <div class="col mb-5">
                <div class="card h-100">
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${item.name}</h5>
                            <p>$${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><button class="btn btn-outline-dark mt-auto" onclick="removeFromCart(${item.id})">Remove</button></div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            cartItemsContainer.innerHTML += createCartItem(item);
        });

        updateCartSummary();
    }

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    function updateCartSummary() {
        const cartTotalItems = document.getElementById('cart-total-items');
        const cartAveragePrice = document.getElementById('cart-average-price');
        const cartTotalPrice = document.getElementById('cart-total-price');

        const totalItems = cart.length;
        const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
        const averagePrice = totalItems ? totalPrice / totalItems : 0;

        cartTotalItems.textContent = totalItems;
        cartAveragePrice.textContent = averagePrice.toFixed(2);
        cartTotalPrice.textContent = totalPrice.toFixed(2);
    }

    // Clear cart function
    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    // Add event listener to clear cart button
    document.getElementById('clear-cart-button').addEventListener('click', clearCart);

    // Initialize cart items
    renderCartItems();
});
