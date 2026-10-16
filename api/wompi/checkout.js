const { createHash, randomUUID } = require("node:crypto");
const {
    PRODUCT_PRICES_COP,
    getWompiConfig,
    isAllowedOrigin,
    sendJson
} = require("../../lib/wompi");

module.exports = function checkout(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return sendJson(res, 405, { error: "Método no permitido." });
    }

    let config;

    try {
        config = getWompiConfig();
    } catch (error) {
        console.error("Configuración de Wompi incompleta o inválida:", error.message);
        return sendJson(res, 503, {
            error: "El pago en línea no está configurado todavía. Intenta de nuevo más tarde."
        });
    }

    if (!isAllowedOrigin(req, config.siteUrl)) {
        return sendJson(res, 403, { error: "Origen no permitido." });
    }

    const body = req.body;

    if (!body || !Array.isArray(body.items) || body.items.length === 0 || body.items.length > 40) {
        return sendJson(res, 400, { error: "El carrito no contiene productos válidos." });
    }

    const quantities = new Map();

    for (const item of body.items) {
        if (
            !item ||
            !Number.isInteger(item.id) ||
            !Object.hasOwn(PRODUCT_PRICES_COP, item.id) ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1 ||
            item.quantity > 99
        ) {
            return sendJson(res, 400, { error: "El carrito contiene un producto o cantidad inválidos." });
        }

        const quantity = (quantities.get(item.id) || 0) + item.quantity;

        if (quantity > 99) {
            return sendJson(res, 400, { error: "La cantidad solicitada supera el límite permitido." });
        }

        quantities.set(item.id, quantity);
    }

    const totalCop = [...quantities].reduce((total, [id, quantity]) => {
        return total + PRODUCT_PRICES_COP[id] * quantity;
    }, 0);
    const amountInCents = totalCop * 100;
    const reference = `BYN-${randomUUID()}`;
    const signature = createHash("sha256")
        .update(`${reference}${amountInCents}COP${config.integritySecret}`)
        .digest("hex");

    return sendJson(res, 200, {
        amountInCents,
        currency: "COP",
        publicKey: config.publicKey,
        redirectUrl: new URL("/pago.html", config.siteUrl).toString(),
        reference,
        signature
    });
};
