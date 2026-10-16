const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const test = require("node:test");
const checkout = require("../api/wompi/checkout");
const transaction = require("../api/wompi/transaction");
const { PRODUCT_PRICES_COP } = require("../lib/wompi");

test("server prices match the published catalog", () => {
    const catalog = readFileSync(resolve(__dirname, "../catalogo.html"), "utf8");
    const cards = [...catalog.matchAll(
        /<article class="product-card" data-category="[^"]+">([\s\S]*?)<\/article>/g
    )];

    assert.equal(cards.length, Object.keys(PRODUCT_PRICES_COP).length);

    for (const [, card] of cards) {
        const id = Number(card.match(/data-id="(\d+)"/)?.[1]);
        const price = Number(card.match(/<strong>\$([\d.]+)<\/strong>/)?.[1].replaceAll(".", ""));

        assert.ok(Object.hasOwn(PRODUCT_PRICES_COP, id), `Missing server price for product ${id}`);
        assert.equal(PRODUCT_PRICES_COP[id], price, `Price mismatch for product ${id}`);
    }
});

function createResponse() {
    return {
        headers: {},
        statusCode: 200,
        body: null,
        setHeader(name, value) {
            this.headers[name] = value;
        },
        status(statusCode) {
            this.statusCode = statusCode;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        }
    };
}

function setSandboxEnvironment() {
    process.env.WOMPI_ENVIRONMENT = "sandbox";
    process.env.WOMPI_PUBLIC_KEY = "pub_test_example";
    process.env.WOMPI_PRIVATE_KEY = "prv_test_example";
    process.env.WOMPI_INTEGRITY_SECRET = "test_integrity_example";
    process.env.SITE_URL = "https://tienda.example";
}

test("checkout recalculates the amount and signs the server-priced cart", () => {
    setSandboxEnvironment();
    const req = {
        method: "POST",
        headers: { origin: "https://tienda.example" },
        body: {
            items: [
                { id: 1, quantity: 2, price: 1 },
                { id: 40, quantity: 1, price: 1 }
            ]
        }
    };
    const res = createResponse();

    checkout(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.amountInCents, 10800000);
    assert.equal(res.body.currency, "COP");
    assert.equal(res.body.publicKey, "pub_test_example");
    assert.equal(res.body.redirectUrl, "https://tienda.example/pago.html");
    assert.match(res.body.reference, /^BYN-/);
    assert.equal(
        res.body.signature,
        createHash("sha256")
            .update(`${res.body.reference}10800000COPtest_integrity_example`)
            .digest("hex")
    );
    assert.equal(res.headers["Cache-Control"], "no-store");
});

test("checkout rejects products that are not in the server catalog", () => {
    setSandboxEnvironment();
    const res = createResponse();

    checkout({
        method: "POST",
        headers: { origin: "https://tienda.example" },
        body: { items: [{ id: 999, quantity: 1 }] }
    }, res);

    assert.equal(res.statusCode, 400);
});

test("checkout rejects requests from another origin", () => {
    setSandboxEnvironment();
    const res = createResponse();

    checkout({
        method: "POST",
        headers: { origin: "https://otra.example" },
        body: { items: [{ id: 1, quantity: 1 }] }
    }, res);

    assert.equal(res.statusCode, 403);
});

test("checkout refuses keys from a different Wompi environment", () => {
    setSandboxEnvironment();
    process.env.WOMPI_PRIVATE_KEY = "prv_prod_example";
    const res = createResponse();
    const originalConsoleError = console.error;
    console.error = () => {};

    try {
        checkout({
            method: "POST",
            headers: { origin: "https://tienda.example" },
            body: { items: [{ id: 1, quantity: 1 }] }
        }, res);
    } finally {
        console.error = originalConsoleError;
    }

    assert.equal(res.statusCode, 503);
});

test("transaction status is returned only for the matching checkout reference", async () => {
    setSandboxEnvironment();
    const originalFetch = global.fetch;
    const reference = "BYN-123e4567-e89b-42d3-a456-426614174000";
    let requestOptions;

    global.fetch = async (_url, options) => {
        requestOptions = options;
        return {
            ok: true,
            json: async () => ({
                data: {
                    amount_in_cents: 3800000,
                    currency: "COP",
                    reference,
                    status: "APPROVED"
                }
            })
        };
    };

    try {
        const res = createResponse();
        await transaction({
            method: "GET",
            headers: { origin: "https://tienda.example" },
            query: { id: "123-456-789", reference }
        }, res);

        assert.equal(res.statusCode, 200);
        assert.deepEqual(res.body, {
            amountInCents: 3800000,
            currency: "COP",
            status: "APPROVED"
        });
        assert.equal(requestOptions.headers.Authorization, "Bearer prv_test_example");
    } finally {
        global.fetch = originalFetch;
    }
});

test("transaction status rejects a reference not belonging to the transaction", async () => {
    setSandboxEnvironment();
    const originalFetch = global.fetch;

    global.fetch = async () => ({
        ok: true,
        json: async () => ({
            data: {
                amount_in_cents: 3800000,
                currency: "COP",
                reference: "BYN-123e4567-e89b-42d3-a456-426614174000",
                status: "APPROVED"
            }
        })
    });

    try {
        const res = createResponse();
        await transaction({
            method: "GET",
            headers: { origin: "https://tienda.example" },
            query: {
                id: "123-456-789",
                reference: "BYN-123e4567-e89b-42d3-a456-426614174001"
            }
        }, res);

        assert.equal(res.statusCode, 404);
    } finally {
        global.fetch = originalFetch;
    }
});
