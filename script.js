const products = [
    {
        id: 1,
        name: "Pijama Rosa Love",
        price: 65000,
        image: "img/pijama-rosa.jpg"
    },
    {
        id: 2,
        name: "Dreamy Celeste",
        price: 62000,
        image: "img/pijama-celeste.jpg"
    },
    {
        id: 3,
        name: "Lavender Night",
        price: 70000,
        image: "img/pijama-morada.jpg"
    },
    {
        id: 4,
        name: "Floral Dreams",
        price: 68000,
        image: "img/pijama-flores.jpg"
    },
    {
        id: 5,
        name: "Black Night",
        price: 65000,
        image: "img/pijama-negra.jpg"
    },
    {
        id: 6,
        name: "Sweet Hearts",
        price: 67000,
        image: "img/pijama-corazones.jpg"
    }
];

let cart = JSON.parse(localStorage.getItem("byNightCart")) || [];

const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutWhatsapp = document.getElementById("checkoutWhatsapp");
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

const whatsappNumber = "573229494731";

function formatPrice(price) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(price);
}

function saveCart() {
    localStorage.setItem("byNightCart", JSON.stringify(cart));
}

function updateCart() {
    renderCart();

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);

    updateWhatsappLink();
    saveCart();
}

function renderCart() {

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛍</span>
                <h3>Tu carrito está vacío</h3>
                <p>
                    Agrega una pijama para comenzar tu compra.
                </p>
                <button class="btn btn-primary" id="continueShopping">
                    Ver colección
                </button>
            </div>
        `;

        const continueShopping = document.getElementById("continueShopping");

        if (continueShopping) {
            continueShopping.addEventListener("click", closeCartPanel);
        }

        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">

            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="cart-item-info">
                <h4>${item.name}</h4>

                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                </div>

                <div class="quantity-control">

                    <button
                        class="decrease"
                        data-id="${item.id}">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        class="increase"
                        data-id="${item.id}">
                        +
                    </button>

                </div>
            </div>

            <button
                class="remove-item"
                data-id="${item.id}"
                aria-label="Eliminar ${item.name}">
                ×
            </button>

        </div>
    `).join("");

    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", () => {
            changeQuantity(Number(button.dataset.id), 1);
        });
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", () => {
            changeQuantity(Number(button.dataset.id), -1);
        });
    });

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {
            removeFromCart(Number(button.dataset.id));
        });
    });
}

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) {
        return;
    }

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    openCartPanel();
}

function changeQuantity(id, amount) {

    const product = cart.find(item => item.id === id);

    if (!product) {
        return;
    }

    product.quantity += amount;

    if (product.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function openCartPanel() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.classList.add("cart-open");
}

function closeCartPanel() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.classList.remove("cart-open");
}

function updateWhatsappLink() {

    if (cart.length === 0) {
        checkoutWhatsapp.href =
            `https://wa.me/${whatsappNumber}?text=Hola%20By%20Night%2C%20quiero%20realizar%20un%20pedido`;
        return;
    }

    let message = "Hola By Night, quiero realizar el siguiente pedido:%0A%0A";

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;

        message += `• ${item.name}%0A`;
        message += `Cantidad: ${item.quantity}%0A`;
        message += `Precio: ${formatPrice(item.price)}%0A`;
        message += `Subtotal: ${formatPrice(subtotal)}%0A%0A`;
    });

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    message += `Total: ${formatPrice(total)}%0A%0A`;
    message += "Quedo atenta para confirmar disponibilidad y envío.";

    checkoutWhatsapp.href =
        `https://wa.me/${whatsappNumber}?text=${message}`;
}

document.querySelectorAll(".add-cart, .quick-cart").forEach(button => {
    button.addEventListener("click", () => {
        addToCart(Number(button.dataset.id));
    });
});

document.querySelectorAll(".filter-button").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter-button").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        document.querySelectorAll(".product-card").forEach(card => {

            if (
                category === "todos" ||
                card.dataset.category === category
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});

openCart.addEventListener("click", openCartPanel);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);

menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCartPanel();
        nav.classList.remove("active");
    }
});

updateCart();