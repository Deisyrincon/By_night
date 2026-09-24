const products = [
    {
        id: 1,
        name: "Pijama Vaca",
        price: 45000,
        image: "img/1.jpeg"
    },
    {
        id: 2,
        name: "Pijama Snoopy",
        price: 45000,
        image: "img/2.jpeg"
    },
    {
        id: 3,
        name: "Pijama Cherry",
        price: 70000,
        image: "img/3.jpeg"
    },
    {
        id: 4,
        name: "Pijama Love",
        price: 70000,
        image: "img/4.jpeg"
    },
    {
        id: 5,
        name: "Pijama Pucca",
        price: 45000,
        image: "img/5.jpeg"
    },
    {
        id: 6,
        name: "Pijama Osito",
        price: 65000,
        image: "img/6.jpeg"
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
const continueShopping = document.getElementById("continueShopping");
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

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agrega una pijama para comenzar tu compra.
                </p>

                <button
                    class="btn btn-primary"
                    id="continueShopping">
                    Ver colección
                </button>

            </div>
        `;

        const button = document.getElementById("continueShopping");

        if (button) {
            button.addEventListener("click", () => {
                closeCartPanel();

                const collection = document.getElementById("coleccion");

                if (collection) {
                    collection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            });
        }

        return;
    }

    cartItems.innerHTML = cart.map(item => {

        const subtotal = item.price * item.quantity;

        return `
            <div class="cart-item">

                <div class="cart-item-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}">
                </div>

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <div class="cart-item-price">
                        ${formatPrice(item.price)}
                    </div>

                    <div class="quantity-control">

                        <button
                            type="button"
                            class="decrease"
                            data-id="${item.id}"
                            aria-label="Disminuir cantidad">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            class="increase"
                            data-id="${item.id}"
                            aria-label="Aumentar cantidad">
                            +
                        </button>

                    </div>

                    <small>
                        Subtotal: ${formatPrice(subtotal)}
                    </small>

                </div>

                <button
                    type="button"
                    class="remove-item"
                    data-id="${item.id}"
                    aria-label="Eliminar ${item.name}">
                    ×
                </button>

            </div>
        `;
    }).join("");

    document.querySelectorAll(".increase").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            changeQuantity(id, 1);

        });

    });

    document.querySelectorAll(".decrease").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            changeQuantity(id, -1);

        });

    });

    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            removeFromCart(id);

        });

    });
}

function addToCart(id) {

    const product = products.find(product => product.id === id);

    if (!product) {
        return;
    }

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity += 1;

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

    if (!cartPanel || !cartOverlay) {
        return;
    }

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.classList.add("cart-open");
}

function closeCartPanel() {

    if (!cartPanel || !cartOverlay) {
        return;
    }

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");
}

function updateWhatsappLink() {

    if (!checkoutWhatsapp) {
        return;
    }

    if (cart.length === 0) {

        const message = "Hola By Night, quiero realizar un pedido";

        checkoutWhatsapp.href =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        return;
    }

    let message =
        "Hola By Night, quiero realizar el siguiente pedido:\n\n";

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        message +=
            `${item.name}\n` +
            `Cantidad: ${item.quantity}\n` +
            `Precio: ${formatPrice(item.price)}\n` +
            `Subtotal: ${formatPrice(subtotal)}\n\n`;

    });

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    message += `Total: ${formatPrice(total)}\n\n`;

    message +=
        "Quedo atenta para confirmar disponibilidad y envío.";

    checkoutWhatsapp.href =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}


document.querySelectorAll(".add-cart, .quick-cart").forEach(button => {

    button.addEventListener("click", () => {

        const id = Number(button.dataset.id);

        addToCart(id);

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

            const cardCategory = card.dataset.category;

            if (
                category === "todos" ||
                cardCategory === category
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


if (openCart) {

    openCart.addEventListener("click", openCartPanel);

}

if (closeCart) {

    closeCart.addEventListener("click", closeCartPanel);

}

if (cartOverlay) {

    cartOverlay.addEventListener("click", closeCartPanel);

}


if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}


document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        if (nav) {
            nav.classList.remove("active");
        }

    });

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCartPanel();

        if (nav) {
            nav.classList.remove("active");
        }

    }

});


updateCart();