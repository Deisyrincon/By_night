const {
    getWompiConfig,
    isAllowedOrigin,
    sendJson
} = require("../../lib/wompi");

const REFERENCE_PATTERN =
    /^BYN-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

module.exports = async function transaction(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return sendJson(res, 405, { error: "Método no permitido." });
    }

    let config;

    try {
        config = getWompiConfig();
    } catch (error) {
        console.error("Configuración de Wompi incompleta o inválida:", error.message);
        return sendJson(res, 503, {
            error: "No se puede consultar el pago en este momento."
        });
    }

    if (!isAllowedOrigin(req, config.siteUrl)) {
        return sendJson(res, 403, { error: "Origen no permitido." });
    }

    const transactionId = req.query?.id;
    const expectedReference = req.query?.reference;

    if (
        typeof transactionId !== "string" ||
        !/^[A-Za-z0-9-]{1,100}$/.test(transactionId) ||
        typeof expectedReference !== "string" ||
        !REFERENCE_PATTERN.test(expectedReference)
    ) {
        return sendJson(res, 400, { error: "El identificador del pago no es válido." });
    }

    let response;

    try {
        response = await fetch(
            `${config.apiUrl}/transactions/${encodeURIComponent(transactionId)}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${config.privateKey}`
                },
                signal: AbortSignal.timeout(10000)
            }
        );
    } catch (error) {
        console.error("No fue posible consultar la transacción en Wompi:", error.message);
        return sendJson(res, 502, { error: "No fue posible consultar el estado del pago." });
    }

    if (!response.ok) {
        console.error("Wompi respondió con estado al consultar el pago:", response.status);
        return sendJson(res, 502, { error: "No fue posible consultar el estado del pago." });
    }

    let transaction;

    try {
        ({ data: transaction } = await response.json());
    } catch (error) {
        console.error("Respuesta inválida al consultar la transacción en Wompi.");
        return sendJson(res, 502, { error: "Wompi devolvió una respuesta inválida." });
    }

    if (
        !transaction ||
        transaction.reference !== expectedReference ||
        !Number.isSafeInteger(transaction.amount_in_cents) ||
        transaction.currency !== "COP" ||
        !["APPROVED", "PENDING", "DECLINED", "VOIDED", "ERROR"].includes(transaction.status)
    ) {
        return sendJson(res, 404, { error: "No se encontró un pago válido para esta tienda." });
    }

    return sendJson(res, 200, {
        amountInCents: transaction.amount_in_cents,
        currency: transaction.currency,
        status: transaction.status
    });
};
