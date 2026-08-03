"use client";

import { useState, FormEvent } from "react";

const sizes = [
  { size: "10ft", use: "Small storage & job sites" },
  { size: "20ft", use: "General storage & shipping" },
  { size: "40ft", use: "Bulk storage & large loads" },
  { size: "40ft HC", use: "High cube, extra headroom" },
];

const perks = [
  "Every container inspected before sale",
  "Delivery to your site included",
  "Warranty on every unit",
  "New, used & one-trip options",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "container-quote",
          name: data.get("name"),
          phone: data.get("phone"),
          zip: data.get("zip"),
          size: data.get("size"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Submission failed");
      }

      setStatus("success");
      form.reset();
      setSelectedSize("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="containers" className="border-b border-steel-700 bg-steel-900 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="stencil-eyebrow font-mono text-xs uppercase text-corten-400">
          Buy a container
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-bone md:text-4xl">
          What size do you need?
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sizes.map((s) => (
            <button
              key={s.size}
              type="button"
              onClick={() => setSelectedSize(s.size)}
              className={`rounded-md border p-5 text-left transition ${
                selectedSize === s.size
                  ? "border-amber-500 bg-steel-950"
                  : "border-steel-700 bg-steel-950 hover:border-amber-500/70"
              }`}
            >
              <p className="font-display text-xl font-semibold text-bone">
                {s.size}
              </p>
              <p className="mt-1 text-xs text-steel-400">{s.use}</p>
            </button>
          ))}
        </div>

        <div id="why-us" className="mt-14 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold text-bone">
              Why buy from us
            </h3>
            <ul className="mt-5 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-steel-200">
                  <span className="mt-0.5 text-amber-400">&#10003;</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="rounded-md border border-steel-700 bg-steel-950 p-6">
            <h4 className="font-display text-lg font-semibold text-bone">
              Get a container quote
            </h4>
            <p className="mt-1 text-xs text-steel-400">
              We&rsquo;ll follow up with pricing and availability.
            </p>
            <div className="mt-5 space-y-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Full name"
                className="w-full rounded-sm border border-steel-600 bg-steel-900 px-3 py-2.5 text-sm text-bone placeholder:text-steel-400 focus:border-amber-500 focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone number"
                className="w-full rounded-sm border border-steel-600 bg-steel-900 px-3 py-2.5 text-sm text-bone placeholder:text-steel-400 focus:border-amber-500 focus:outline-none"
              />
              <input
                type="text"
                name="zip"
                required
                placeholder="Zip code"
                className="w-full rounded-sm border border-steel-600 bg-steel-900 px-3 py-2.5 text-sm text-bone placeholder:text-steel-400 focus:border-amber-500 focus:outline-none"
              />
              <select
                name="size"
                required
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full rounded-sm border border-steel-600 bg-steel-900 px-3 py-2.5 text-sm text-steel-300 focus:border-amber-500 focus:outline-none"
              >
                <option value="" disabled>
                  Container size
                </option>
                {sizes.map((s) => (
                  <option key={s.size} value={s.size}>
                    {s.size}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-sm bg-amber-500 py-2.5 font-display text-sm font-semibold tracking-wide text-steel-950 transition hover:bg-amber-400 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Request my quote"}
              </button>
              {status === "success" && (
                <p className="text-sm text-amber-400">
                  Got it — we&rsquo;ll follow up with pricing and availability shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-corten-400">
                  {errorMessage || "Something went wrong. Please call or text us instead."}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
