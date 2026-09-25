const products = [
    {
        id: 1,
        name: "Pijama Vaca",
        price: 45000,
        image: "img/1.jpeg",
        category: "enterizas"
    },
    {
        id: 2,
        name: "Pijama Snoopy",
        price: 45000,
        image: "img/2.jpeg",
        category: "enterizas"
    },
    {
        id: 3,
        name: "Pijama Cherry",
        price: 70000,
        image: "img/3.jpeg",
        category: "tres-piezas"
    },
    {
        id: 4,
        name: "Pijama Love",
        price: 70000,
        image: "img/4.jpeg",
        category: "tres-piezas"
    },
    {
        id: 5,
        name: "Pijama Pucca",
        price: 45000,
        image: "img/5.jpeg",
        category: "shorts-top"
    },
    {
        id: 6,
        name: "Pijama Osito",
        price: 65000,
        image: "img/6.jpeg",
        category: "capri"
    },
    {
        id: 7,
        name: "Pijama Luna",
        price: 60000,
        image: "img/7.jpeg",
        category: "enterizas"
    },
    {
        id: 8,
        name: "Pijama Corazones",
        price: 65000,
        image: "img/8.jpeg",
        category: "enterizas"
    },
    {
        id: 9,
        name: "Pijama Floral",
        price: 68000,
        image: "img/9.jpeg",
        category: "enterizas"
    },
    {
        id: 10,
        name: "Pijama Estrellas",
        price: 62000,
        image: "img/10.jpeg",
        category: "enterizas"
    },
    {
        id: 11,
        name: "Pijama Dulce",
        price: 65000,
        image: "img/11.jpeg",
        category: "enterizas"
    },
    {
        id: 12,
        name: "Pijama Rosada",
        price: 60000,
        image: "img/12.jpeg",
        category: "tres-piezas"
    },
    {
        id: 13,
        name: "Pijama Celeste",
        price: 65000,
        image: "img/13.jpeg",
        category: "tres-piezas"
    },
    {
        id: 14,
        name: "Pijama Fresas",
        price: 70000,
        image: "img/14.jpeg",
        category: "tres-piezas"
    },
    {
        id: 15,
        name: "Pijama Gatito",
        price: 68000,
        image: "img/15.jpeg",
        category: "tres-piezas"
    },
    {
        id: 16,
        name: "Pijama Nubes",
        price: 65000,
        image: "img/16.jpeg",
        category: "tres-piezas"
    },
    {
        id: 17,
        name: "Pijama Cereza",
        price: 70000,
        image: "img/17.jpeg",
        category: "tres-piezas"
    },
    {
        id: 18,
        name: "Pijama Mariposas",
        price: 68000,
        image: "img/18.jpeg",
        category: "tres-piezas"
    },
    {
        id: 19,
        name: "Pijama Love Pink",
        price: 62000,
        image: "img/19.jpeg",
        category: "capri"
    },
    {
        id: 20,
        name: "Pijama Snoopy Rosa",
        price: 65000,
        image: "img/20.jpeg",
        category: "capri"
    },
    {
        id: 21,
        name: "Pijama Oso",
        price: 60000,
        image: "img/21.jpeg",
        category: "capri"
    },
    {
        id: 22,
        name: "Pijama Flores",
        price: 65000,
        image: "img/22.jpeg",
        category: "capri"
    },
    {
        id: 23,
        name: "Pijama Cherry Pink",
        price: 68000,
        image: "img/23.jpeg",
        category: "capri"
    },
    {
        id: 24,
        name: "Pijama Corazón",
        price: 62000,
        image: "img/24.jpeg",
        category: "capri"
    },
    {
        id: 25,
        name: "Pijama Dream",
        price: 65000,
        image: "img/25.jpeg",
        category: "capri"
    },
    {
        id: 26,
        name: "Pijama Violeta",
        price: 70000,
        image: "img/26.jpeg",
        category: "cuatro-piezas"
    },
    {
        id: 27,
        name: "Pijama Cute",
        price: 68000,
        image: "img/27.jpeg",
        category: "cuatro-piezas"
    },
    {
        id: 28,
        name: "Pijama Rosé",
        price: 65000,
        image: "img/28.jpeg",
        category: "cuatro-piezas"
    },
    {
        id: 29,
        name: "Pijama Night",
        price: 70000,
        image: "img/29.jpeg",
        category: "cuatro-piezas"
    },
    {
        id: 30,
        name: "Pijama Bear",
        price: 68000,
        image: "img/30.jpeg",
        category: "cuatro-piezas"
    },
    {
        id: 31,
        name: "Pijama Floral Pink",
        price: 70000,
        image: "img/31.jpeg",
        category: "cuatro-piezas"
    },
    {
        id: 32,
        name: "Pijama Moon",
        price: 45000,
        image: "img/32.jpeg",
        category: "shorts-top"
    },
    {
        id: 33,
        name: "Pijama Sweet",
        price: 50000,
        image: "img/33.jpeg",
        category: "shorts-top"
    },
    {
        id: 34,
        name: "Pijama Blossom",
        price: 55000,
        image: "img/34.jpeg",
        category: "shorts-top"
    },
    {
        id: 35,
        name: "Pijama Candy",
        price: 45000,
        image: "img/35.jpeg",
        category: "shorts-top"
    },
    {
        id: 36,
        name: "Pijama Soft",
        price: 50000,
        image: "img/36.jpeg",
        category: "shorts-top"
    },
    {
        id: 37,
        name: "Pijama Dreamy",
        price: 55000,
        image: "img/37.jpeg",
        category: "shorts-top"
    },
    {
        id: 38,
        name: "Bata Rosada",
        price: 65000,
        image: "img/38.jpeg",
        category: "batas"
    },
    {
        id: 39,
        name: "Bata Celeste",
        price: 65000,
        image: "img/39.jpeg",
        category: "batas"
    },
    {
        id: 40,
        name: "By Night Premium",
        price: 100000,
        image: "img/39.jpeg",
        category: "batas"
    }
];

let cart = [];

try {
    const storedCart = JSON.parse(localStorage.getItem("byNightCart"));

    if (Array.isArray(storedCart)) {
        cart = storedCart.filter(item => {
            return (
                item &&
                Number.isInteger(item.id) &&
                Number.isFinite(Number(item.price)) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0
            );
        });
    }
} catch (error) {
    cart = [];

    try {
        localStorage.removeItem("byNightCart");
    } catch (storageError) {
        console.warn("No fue posible limpiar el carrito.");
    }
}

const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutWhatsapp = document.getElementById("checkoutWhatsapp");
const checkoutNequi = document.getElementById("checkoutNequi");
const nequiConfirm = document.getElementById("nequiConfirm");

const nequiModal = document.getElementById("nequiModal");
const nequiClose = document.getElementById("nequiClose");
const nequiBackdrop = document.getElementById("nequiBackdrop");
const nequiCancel = document.getElementById("nequiCancel");
const copyNequi = document.getElementById("copyNequi");

const continueShopping = document.getElementById("continueShopping");

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");



const whatsappNumber = "573229494731";

const nequiNumber = "3229494731";


function formatPrice(price) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(Number(price) || 0);
}

function getItemSubtotal(item) {
    const price = Number(item.price);
    const quantity = Number(item.quantity);

    if (!Number.isFinite(price) || !Number.isFinite(quantity)) {
        return 0;
    }

    return price * quantity;
}


function getCartTotal() {
    return cart.reduce((total, item) => {
        return total + getItemSubtotal(item);
    }, 0);
}


function saveCart() {
    try {
        localStorage.setItem(
            "byNightCart",
            JSON.stringify(cart)
        );
    } catch (error) {
        console.warn("No se pudo guardar el carrito.");
    }
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getProductFromCard(id, sourceCard = null) {
    const card =
        sourceCard ||
        document.querySelector(
            `.product-card [data-id="${id}"]`
        )?.closest(".product-card");

    if (!card) {
        return null;
    }

    const image = card.querySelector(".product-image img");
    const name = card.querySelector("h3");
    const price = card.querySelector(".product-bottom strong");

    if (!image || !name || !price) {
        return null;
    }

    const numericPrice = Number(
        price.textContent.replace(/[^0-9]/g, "")
    );

    if (!Number.isFinite(numericPrice)) {
        return null;
    }

    return {
        id: Number(id),
        name: name.textContent.trim(),
        price: numericPrice,
        image: image.getAttribute("src"),
        category: card.dataset.category || ""
    };
}


function getProductById(id) {
    return products.find(product => product.id === Number(id));
}

function syncCartWithProducts() {
    cart = cart
        .map(item => {
            const product =
                getProductFromCard(item.id) ||
                getProductById(item.id);

            if (!product) {
                return null;
            }

            return {
                ...product,
                quantity: item.quantity
            };
        })
        .filter(Boolean);
}

function updateCart() {
    syncCartWithProducts();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = getCartTotal();

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }

    renderCart();
    updateWhatsappLink();
    saveCart();
    updateNequiInfo();
}

function renderCart() {
    if (!cartItems) {
        return;
    }

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
                    type="button"
                    class="btn btn-primary"
                    id="continueShopping">
                    Ver catálogo
                </button>
            </div>
        `;

        const button =
            document.getElementById("continueShopping");

        if (button) {
            button.addEventListener("click", () => {
                closeCartPanel();

                const collection =
                    document.getElementById("coleccion");

                if (collection) {
                    collection.scrollIntoView({
                        behavior: "smooth"
                    });
                } else {
                    window.location.href = "catalogo.html";
                }
            });
        }

        return;
    }

    cartItems.innerHTML = cart
        .map(item => {
            const subtotal =
                getItemSubtotal(item);

            return `
                <div class="cart-item">

                    <div class="cart-item-image">
                        <img
                            src="${escapeHtml(item.image)}"
                            alt="${escapeHtml(item.name)}">
                    </div>

                    <div class="cart-item-info">

                        <h4>
                            ${escapeHtml(item.name)}
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
                            Subtotal:
                            ${formatPrice(subtotal)}
                        </small>

                    </div>

                    <button
                        type="button"
                        class="remove-item"
                        data-id="${item.id}"
                        aria-label="Eliminar ${escapeHtml(item.name)}">
                        ×
                    </button>

                </div>
            `;
        })
        .join("");
}

function addToCart(id, sourceCard = null) {
    const numericId = Number(id);

    let product =
        getProductFromCard(
            numericId,
            sourceCard
        );

    if (!product) {
        product = getProductById(numericId);
    }

    if (!product) {
        console.warn(
            "Producto no encontrado:",
            numericId
        );
        return;
    }

    const existingProduct =
        cart.find(item => item.id === numericId);

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
    const numericId = Number(id);

    const product =
        cart.find(item => item.id === numericId);

    if (!product) {
        return;
    }

    product.quantity += amount;

    if (product.quantity <= 0) {
        cart = cart.filter(
            item => item.id !== numericId
        );
    }

    updateCart();
}

function removeFromCart(id) {
    const numericId = Number(id);

    cart = cart.filter(
        item => item.id !== numericId
    );

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
        const message =
            "Hola By Night, quiero realizar un pedido.";

        checkoutWhatsapp.href =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        return;
    }

    let message =
        "Hola By Night, quiero realizar el siguiente pedido:\n\n";

    cart.forEach(item => {
        const subtotal =
            getItemSubtotal(item);

        message +=
            `Producto: ${item.name}\n` +
            `Cantidad: ${item.quantity}\n` +
            `Precio: ${formatPrice(item.price)}\n` +
            `Subtotal: ${formatPrice(subtotal)}\n\n`;
    });

    const total =
        getCartTotal();

    message +=
        `Total: ${formatPrice(total)}\n\n`;

    message +=
        "Quedo atenta para confirmar disponibilidad, talla y envío.";

    checkoutWhatsapp.href =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}


function updateNequiInfo() {
    const nequiTotal =
        document.getElementById("nequiTotal");

    const nequiPhone =
        document.getElementById("nequiPhone");

    if (!nequiTotal || !nequiPhone) {
        return;
    }

    const total =
        getCartTotal();

    nequiTotal.textContent =
        formatPrice(total);

    nequiPhone.textContent =
        nequiNumber;

    if (nequiConfirm) {
        const message =
            `Hola By Night, realicé un pago por Nequi de ${formatPrice(total)}. ` +
            "Adjunto el comprobante para confirmar mi pedido.";

        nequiConfirm.href =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    }
}


function openNequiModal() {
    if (!nequiModal) {
        return;
    }

    updateNequiInfo();

    nequiModal.classList.add("active");
    nequiModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("cart-open");
}


function closeNequiModal() {
    if (!nequiModal) {
        return;
    }

    nequiModal.classList.remove("active");
    nequiModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("cart-open");
}



document.addEventListener("click", event => {
    const target =
        event.target instanceof Element
            ? event.target
            : null;

    if (!target) {
        return;
    }

    const addButton =
        target.closest(
            ".add-cart, .quick-cart"
        );

    const increaseButton =
        target.closest(".increase");

    const decreaseButton =
        target.closest(".decrease");

    const removeButton =
        target.closest(".remove-item");


    if (addButton) {
        const id =
            Number(addButton.dataset.id);

        const card =
            addButton.closest(".product-card");

        if (Number.isInteger(id)) {
            addToCart(id, card);
        }

        return;
    }


    if (increaseButton) {
        const id =
            Number(increaseButton.dataset.id);

        changeQuantity(id, 1);

        return;
    }


    if (decreaseButton) {
        const id =
            Number(decreaseButton.dataset.id);

        changeQuantity(id, -1);

        return;
    }


    if (removeButton) {
        const id =
            Number(removeButton.dataset.id);

        removeFromCart(id);
    }
});




if (checkoutNequi) {
    checkoutNequi.addEventListener(
        "click",
        event => {
            event.preventDefault();

            if (cart.length === 0) {
                alert(
                    "Agrega al menos un producto al carrito antes de pagar con Nequi."
                );
                return;
            }

            openNequiModal();
        }
    );
}


if (nequiClose) {
    nequiClose.addEventListener(
        "click",
        closeNequiModal
    );
}


if (nequiCancel) {
    nequiCancel.addEventListener(
        "click",
        closeNequiModal
    );
}


if (nequiBackdrop) {
    nequiBackdrop.addEventListener(
        "click",
        closeNequiModal
    );
}

if (copyNequi) {
    copyNequi.addEventListener("click", async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(nequiNumber);
            } else {
                const input = document.createElement("textarea");
                input.value = nequiNumber;
                input.setAttribute("readonly", "");
                input.style.position = "fixed";
                input.style.opacity = "0";
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                input.remove();
            }

            copyNequi.textContent = "Número copiado";
        } catch (error) {
            copyNequi.textContent = nequiNumber;
        }

        window.setTimeout(() => {
            copyNequi.textContent = "Copiar número";
        }, 1800);
    });
}


function filterProducts(category) {

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );

    productCards.forEach(card => {

        const cardCategory =
            card.dataset.category;

        if (
            category === "todos" ||
            cardCategory === category
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}


document
    .querySelectorAll(".filter-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-button")
                    .forEach(item => {
                        item.classList.remove("active");
                    });

                button.classList.add("active");

                const category =
                    button.dataset.category;

                filterProducts(category);
            }
        );

    });


if (openCart) {
    openCart.addEventListener(
        "click",
        openCartPanel
    );
}



if (closeCart) {
    closeCart.addEventListener(
        "click",
        closeCartPanel
    );
}


if (cartOverlay) {
    cartOverlay.addEventListener(
        "click",
        closeCartPanel
    );
}



if (menuButton && nav) {

    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle("active");

            const isOpen =
                nav.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        }
    );

}



document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (nav) {
                    nav.classList.remove("active");
                }

                if (menuButton) {
                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            }
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        closeCartPanel();
        closeNequiModal();

        if (nav) {
            nav.classList.remove("active");
        }

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }
);

updateCart();