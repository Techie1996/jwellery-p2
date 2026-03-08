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

  // In a real project, this is where you would send an email
  // or persist the inquiry to your CRM or database.
  // For now, we simply log the payload.
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

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Not found" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express API listening on http://localhost:${port}`);
});

