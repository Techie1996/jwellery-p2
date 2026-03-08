const DEFAULT_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
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
  const res = await fetch(`${DEFAULT_API_BASE}/api/contact`, {
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

