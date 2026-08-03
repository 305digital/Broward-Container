import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  formType: "container-quote" | "conversion-inquiry";
  [key: string]: string;
};

const REQUIRED_FIELDS = ["formType", "name", "phone"];

export async function POST(request: NextRequest) {
  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !payload[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const subject =
    payload.formType === "container-quote"
      ? `New container quote request — ${payload.name}`
      : `New conversion inquiry — ${payload.name}`;

  const summary = Object.entries(payload)
    .filter(([key]) => key !== "formType")
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  try {
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(subject, summary);
    } else if (process.env.FORMSPREE_ENDPOINT) {
      await sendViaFormspree(payload);
    } else {
      // No provider configured yet — surfaces the lead in server logs so
      // nothing is silently dropped during local dev / before setup.
      console.log("[lead] No RESEND_API_KEY or FORMSPREE_ENDPOINT configured. Lead payload:", payload);
    }
  } catch (err) {
    console.error("[lead] Failed to deliver lead", err);
    return NextResponse.json(
      { error: "Something went wrong submitting your request. Please call or text us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function sendViaResend(subject: string, text: string) {
  // TODO: sign up at https://resend.com, verify a sending domain, and set
  // RESEND_API_KEY, LEAD_FROM_EMAIL, and LEAD_TO_EMAIL as environment variables.
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "leads@example.com",
      to: process.env.LEAD_TO_EMAIL || "hello@browardinternationalcontainers.com",
      subject,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend request failed with status ${res.status}`);
  }
}

async function sendViaFormspree(payload: LeadPayload) {
  // TODO: create a form at https://formspree.io and set FORMSPREE_ENDPOINT
  // to its endpoint URL (e.g. https://formspree.io/f/xxxxxxx).
  const res = await fetch(process.env.FORMSPREE_ENDPOINT as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Formspree request failed with status ${res.status}`);
  }
}
