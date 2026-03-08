// Use same-origin API when no external server URL is set (avoids Failed to fetch when Express isn't running)
function getApiBase() {
  if (typeof window !== "undefined") return ""; // browser: use relative URL
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
};

export type CustomOrderPayload = {
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

export type ContactResponse =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      error: string;
    };

export async function submitProductInquiry(
  payload: ContactPayload,
): Promise<ContactResponse> {
  const base = getApiBase() || (typeof window !== "undefined" ? "" : "http://localhost:4000");
  const url = base ? `${base}/api/contact` : "/api/contact";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as ContactResponse;

  if (!res.ok) {
    return {
      ok: false,
      error:
        "error" in data && data.error
          ? data.error
          : "Something went wrong while submitting the form.",
    };
  }

  return data;
}

export async function submitCustomOrder(
  payload: CustomOrderPayload,
): Promise<ContactResponse> {
  const base = getApiBase();
  const url = base ? `${base}/api/custom-order` : "/api/custom-order";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as ContactResponse;

    if (!res.ok) {
      return {
        ok: false,
        error:
          "error" in data && data.error
            ? data.error
            : "Something went wrong while submitting your order.",
      };
    }

    return data;
  } catch (err) {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

