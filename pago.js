const resultCard = document.getElementById("paymentResult");
const statusText = document.getElementById("paymentStatus");
const messageText = document.getElementById("paymentMessage");
const amountText = document.getElementById("paymentAmount");
const whatsappLink = document.getElementById("paymentWhatsapp");
const whatsappNumber = "573229494731";

const paymentStatusMessages = {
    APPROVED: {
        state: "approved",
        label: "Pago aprobado",
        message: "Wompi confirmó el pago. Gracias por tu compra."
    },
    PENDING: {
        state: "pending",
        label: "Pago pendiente",
        message: "Wompi todavía está procesando el pago. Revisa nuevamente más tarde antes de volver a pagar."
    },
    DECLINED: {
        state: "declined",
        label: "Pago rechazado",
        message: "Wompi no aprobó el pago. Puedes intentarlo de nuevo o contactarnos por WhatsApp."
    },
    VOIDED: {
        state: "declined",
        label: "Pago anulado",
        message: "El pago fue anulado. Puedes volver a la tienda para intentarlo de nuevo."
    },
    ERROR: {
        state: "error",
        label: "Error en el pago",
        message: "Wompi reportó un error. Contacta a la tienda antes de intentar otro pago."
    }
};

function formatCop(amountInCents) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(amountInCents / 100);
}

async function verifyPayment() {
    const transactionId = new URLSearchParams(window.location.search).get("id");
    const reference = sessionStorage.getItem("wompiReference");
    const order = JSON.parse(sessionStorage.getItem("wompiOrder") || "null");

    if (!transactionId || !reference || !order || order.reference !== reference) {
        throw new Error("No encontramos la referencia de este pago. Contacta a la tienda para verificarlo.");
    }

    const query = new URLSearchParams({ id: transactionId, reference });
    const response = await fetch(`/api/wompi/transaction?${query}`, {
        headers: { Accept: "application/json" },
        cache: "no-store"
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "No fue posible verificar el pago.");
    }

    if (
        !Number.isSafeInteger(order.amountInCents) ||
        order.amountInCents !== result.amountInCents
    ) {
        throw new Error("El monto verificado no coincide con el total de esta compra. Contacta a la tienda antes de continuar.");
    }

    const status = paymentStatusMessages[result.status];

    if (!status) {
        throw new Error("Wompi devolvió un estado de pago desconocido.");
    }

    resultCard.dataset.state = status.state;
    statusText.textContent = status.label;
    messageText.textContent = status.message;
    amountText.textContent = `Total verificado: ${formatCop(result.amountInCents)}`;

    if (result.status === "APPROVED") {
        const items = Array.isArray(order.items)
            ? order.items
                .filter(item => item && typeof item.name === "string" && Number.isInteger(item.quantity))
                .map(item => `${item.name} x ${item.quantity}`)
                .join("\n")
            : "";
        const customer = order.customer;
        const customerDetails = customer
            ? `\nCliente: ${customer.name}\nCelular: ${customer.phone}\nDirección: ${customer.address}`
            : "";
        const message = [
            "Hola By Night, Wompi confirmó el pago de mi pedido.",
            items ? `Productos:\n${items}` : "",
            `Total: ${formatCop(result.amountInCents)}`,
            `Referencia: ${reference}`,
            customerDetails
        ].filter(Boolean).join("\n\n");

        whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        whatsappLink.hidden = false;

        try {
            localStorage.removeItem("byNightCart");
        } catch (error) {
            console.error("No fue posible limpiar el carrito después del pago aprobado:", error);
        }
    }
}

verifyPayment().catch(error => {
    resultCard.dataset.state = "error";
    statusText.textContent = "No pudimos verificar el pago";
    messageText.textContent = error instanceof Error
        ? error.message
        : "Inténtalo de nuevo o contacta a la tienda para confirmar el estado.";
    console.error("Error al verificar el pago de Wompi:", error);
});
