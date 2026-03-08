import { NextRequest, NextResponse } from "next/server";

type CustomOrderPayload = {
  productSlug: string;
  productName: string;
  customization?: string;
  quantity: number;
  notes?: string;
  name: string;
  email: string;
  phone: string;
  shippingCountry?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CustomOrderPayload;
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
    } = body;

    if (!name || !email || !phone || !productSlug || !productName) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // In production: send email, save to MongoDB, etc.
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log("Custom order:", {
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
    }

    return NextResponse.json({
      ok: true,
      message:
        "Your custom order has been received. Our team will contact you shortly.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
