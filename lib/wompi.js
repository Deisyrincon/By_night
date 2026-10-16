const PRODUCT_PRICES_COP = Object.freeze({
    1: 38000, 2: 38000, 3: 38000, 4: 38000, 5: 38000, 6: 38000, 7: 38000,
    8: 40000, 9: 40000, 10: 40000, 11: 40000, 12: 40000, 13: 40000,
    14: 32000, 15: 32000, 16: 32000, 17: 32000, 18: 32000, 19: 32000,
    20: 32000, 21: 32000,
    22: 42000, 23: 42000, 24: 42000, 25: 42000, 26: 42000, 27: 42000,
    28: 40000, 29: 40000, 30: 40000, 31: 40000, 32: 40000,
    33: 32000, 34: 32000, 35: 32000, 36: 32000, 37: 32000, 38: 32000,
    39: 32000, 40: 32000
});

function getWompiConfig() {
    const environment = process.env.WOMPI_ENVIRONMENT;
    const isProduction = environment === "production";

    if (environment !== "production" && environment !== "sandbox") {
        throw new Error("WOMPI_ENVIRONMENT debe ser sandbox o production.");
    }

    const publicKey = process.env.WOMPI_PUBLIC_KEY;
    const privateKey = process.env.WOMPI_PRIVATE_KEY;
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;
    const siteUrlValue = process.env.SITE_URL;

    if (!publicKey || !privateKey || !integritySecret || !siteUrlValue) {
        throw new Error("Falta configurar una o más variables de Wompi.");
    }

    const keyPrefix = isProduction ? "prod" : "test";

    if (
        !publicKey.startsWith(`pub_${keyPrefix}_`) ||
        !privateKey.startsWith(`prv_${keyPrefix}_`) ||
        !integritySecret.startsWith(`${keyPrefix}_integrity_`)
    ) {
        throw new Error("Las llaves de Wompi no corresponden al ambiente configurado.");
    }

    const siteUrl = new URL(siteUrlValue);
    const validProtocol =
        siteUrl.protocol === "https:" ||
        (siteUrl.protocol === "http:" && siteUrl.hostname === "localhost");

    if (
        !validProtocol ||
        siteUrl.origin !== siteUrlValue.replace(/\/$/, "")
    ) {
        throw new Error("SITE_URL debe ser un origen HTTPS válido.");
    }

    return {
        apiUrl: isProduction
            ? "https://production.wompi.co/v1"
            : "https://sandbox.wompi.co/v1",
        integritySecret,
        privateKey,
        publicKey,
        siteUrl
    };
}

function isAllowedOrigin(req, siteUrl) {
    const origin = req.headers.origin;
    return !origin || origin === siteUrl.origin;
}

function sendJson(res, statusCode, body) {
    res.setHeader("Cache-Control", "no-store");
    res.status(statusCode).json(body);
}

module.exports = {
    PRODUCT_PRICES_COP,
    getWompiConfig,
    isAllowedOrigin,
    sendJson
};
