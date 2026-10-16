# By Night — pagos con Wompi

El checkout permite pagar en el Checkout Web seguro de Wompi. El cliente puede elegir Nequi si ese medio está habilitado para la cuenta del comercio. La transferencia manual por Nequi y WhatsApp siguen disponibles como alternativas.

## Configuración en Vercel

1. Despliega este repositorio como un proyecto Vercel. Las funciones de `api/` se publican automáticamente.
2. En tu cuenta de comercios Wompi, habilita Nequi y obtén las llaves del ambiente de pruebas (Sandbox).
3. En **Vercel → Settings → Environment Variables**, configura:
   - `WOMPI_ENVIRONMENT`: `sandbox` para pruebas, `production` para cobrar dinero real.
   - `WOMPI_PUBLIC_KEY`: llave `pub_test_...` o `pub_prod_...` del ambiente elegido.
   - `WOMPI_PRIVATE_KEY`: llave `prv_test_...` o `prv_prod_...` del mismo ambiente.
   - `WOMPI_INTEGRITY_SECRET`: secreto `test_integrity_...` o `prod_integrity_...` del mismo ambiente.
   - `SITE_URL`: origen HTTPS exacto del sitio, por ejemplo `https://mitienda.vercel.app` (sin ruta final).
4. Vuelve a desplegar. Prueba el flujo con las credenciales Sandbox y verifica los estados aprobado, pendiente y rechazado antes de cambiar **todas** las llaves a Producción.

No compartas ni incluyas la llave privada o el secreto de integridad en el frontend, en Git o en mensajes. Guárdalos únicamente como variables de entorno privadas en Vercel. El archivo `.env.example` contiene solo nombres y valores de ejemplo.

La función calcula el monto usando precios del servidor, genera la firma de integridad y rechaza solicitudes de otros orígenes. La página de retorno consulta el estado con la llave privada en el backend; no toma el parámetro de redirección como prueba de pago. Mantén los precios de `lib/wompi.js` sincronizados con los precios publicados en `catalogo.html` cuando los cambies.

Este checkout verifica el estado al regresar de Wompi; no guarda pedidos en una base de datos ni automatiza su despacho. Para conciliación y procesamiento de pedidos aunque el comprador cierre la página, configura también el webhook `transaction.updated` de Wompi y una base de datos para registrar pedidos.

## Pruebas

Ejecuta las pruebas de las funciones con Node.js:

```sh
node --test
```