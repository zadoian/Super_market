document.addEventListener("DOMContentLoaded", function() {
    let products;
    
    // Fetch the products JSON data
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts('All');
        });

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function createProductCard(product) {
        return `
            <div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="${product.image}" alt="${product.name}" />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${product.name}</h5>
                            <p>$${product.price.toFixed(2)} / ${product.unit}</p>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><button class="btn btn-outline-dark mt-auto" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to cart</button></div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderProducts(category) {
        const productContainer = document.querySelector('#product-list');
        productContainer.innerHTML = '';

        products.supermarket_products.forEach(cat => {
            if (category === 'All' || cat.category === category) {
                cat.products.forEach(product => {
                    productContainer.innerHTML += createProductCard(product);
                });
            }
        });
    }

    window.filterProducts = function(category) {
        renderProducts(category);
    }

    window.addToCart = function(id, name, price) {
        cart.push({ id, name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSummary();
    }

    function updateCartSummary() {
        const cartCount = document.getElementById('cart-count');
        const cartTotalItems = document.getElementById('cart-total-items');
        const cartAveragePrice = document.getElementById('cart-average-price');
        const cartTotalPrice = document.getElementById('cart-total-price');

        const totalItems = cart.length;
        const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
        const averagePrice = totalItems ? totalPrice / totalItems : 0;

        cartCount.textContent = totalItems;
        if (cartTotalItems) cartTotalItems.textContent = totalItems;
        if (cartAveragePrice) cartAveragePrice.textContent = averagePrice.toFixed(2);
        if (cartTotalPrice) cartTotalPrice.textContent = totalPrice.toFixed(2);
    }

    // Initialize the cart summary
    updateCartSummary();
});
