const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/api/contact", (req, res) => {
  const { name, email, phone, company, message } = req.body || {};

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields.",
    });
  }

  // eslint-disable-next-line no-console
  console.log("New product inquiry:", {
    name,
    email,
    phone,
    company,
    message,
    receivedAt: new Date().toISOString(),
  });

  return res.status(200).json({
    ok: true,
    message: "Your inquiry has been received. Our team will get in touch shortly.",
  });
});

app.post("/api/custom-order", (req, res) => {
  const {
    productSlug,
    productName,
    customization,
    quantity,
    notes,
    name,
    email,
    phone,
    shippingCountry,
    message,
  } = req.body || {};

  if (!name || !email || !phone || !productSlug || !productName) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields.",
    });
  }

  // eslint-disable-next-line no-console
  console.log("New custom order:", {
    productSlug,
    productName,
    customization,
    quantity: quantity ?? 1,
    notes,
    name,
    email,
    phone,
    shippingCountry,
    message,
    receivedAt: new Date().toISOString(),
  });

  return res.status(200).json({
    ok: true,
    message: "Your custom order has been received. Our team will contact you shortly.",
  });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Not found" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express API listening on http://localhost:${port}`);
});

