"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";

const processSteps = [
  { step: "01", title: "Consult", desc: "Walk through your use case, site, and budget." },
  { step: "02", title: "Design", desc: "Layout, finishes, and utilities mapped to your space." },
  { step: "03", title: "Build", desc: "Fabrication in our yard, quality-checked at every stage." },
  { step: "04", title: "Deliver", desc: "Transported and set on-site, ready to use." },
];

type Project =
  | { title: string; media: "image"; src: string; tag?: string }
  | { title: string; media: "video"; src: string; tag?: string }
  | { title: string; media: "placeholder"; tag?: string };

const projects: Project[] = [
  { title: "Two-story container office", media: "image", src: "/images/2-story-office.jpg" },
  { title: "Container bar & event space", media: "image", src: "/images/conversion-bar.jpg" },
  { title: "Backyard container studio", media: "image", src: "/images/conversion-front.jpg" },
  { title: "Glass-front office pod", media: "image", src: "/images/conversion-office-pod.jpg" },
  { title: "Compact container office", media: "image", src: "/images/conversion-yard-build.jpg" },
  { title: "Interior walkthrough", media: "video", src: "/videos/conversion-interior.mp4" },
  { title: "Container pool", media: "image", src: "/images/conversion-pool-render.jpg", tag: "Concept render" },
  { title: "Container pool — overhead", media: "image", src: "/images/conversion-pool-render-above.jpg", tag: "Concept render" },
];

const pricing = [
  { type: "Office pod", range: "$18k – $32k" },
  { type: "Cafe / kiosk", range: "$25k – $45k" },
  { type: "Studio / ADU", range: "$45k – $85k" },
  { type: "Full home", range: "$90k+" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function Conversions() {
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
          formType: "conversion-inquiry",
          name: data.get("name"),
          phone: data.get("phone"),
          intendedUse: data.get("intendedUse"),
          budgetRange: data.get("budgetRange"),
          description: data.get("description"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Submission failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="conversions" className="border-b border-steel-700 bg-steel-950 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="stencil-eyebrow font-mono text-xs uppercase text-corten-400">
          Custom conversions
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-bone md:text-4xl">
          Built for how you&rsquo;ll actually use it
        </h2>

        {/* Portfolio - real project photos/video where we have them, placeholder otherwise */}
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <div key={p.title} className="overflow-hidden rounded-md border border-steel-700 bg-steel-900">
              <div className="relative aspect-video border-b border-steel-700 bg-steel-800">
                {p.tag && (
                  <span className="absolute right-2 top-2 z-10 rounded-sm bg-steel-950/85 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-amber-400">
                    {p.tag}
                  </span>
                )}
                {p.media === "image" && (
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
                {p.media === "video" && (
                  <video
                    src={p.src}
                    controls
                    className="h-full w-full object-cover"
                  />
                )}
                {p.media === "placeholder" && (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-steel-400">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-steel-600">
                        &#9654;
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wide">
                        Video coming soon
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-semibold text-bone">
                  {p.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <div key={s.step}>
              <p className="font-mono text-xs text-corten-400">{s.step}</p>
              <p className="mt-1 font-display text-lg font-semibold text-bone">
                {s.title}
              </p>
              <p className="mt-1 text-xs text-steel-400">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing + inquiry form */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold text-bone">
              Starting price ranges
            </h3>
            <div className="mt-5 divide-y divide-steel-700 rounded-md border border-steel-700">
              {pricing.map((row) => (
                <div
                  key={row.type}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm text-steel-200">{row.type}</span>
                  <span className="font-mono text-sm text-amber-400">
                    {row.range}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-steel-500">
              Final pricing depends on size, finishes, and site conditions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-md border border-steel-700 bg-steel-900 p-6">
            <h4 className="font-display text-lg font-semibold text-bone">
              Start your conversion inquiry
            </h4>
            <p className="mt-1 text-xs text-steel-400">
              Tell us a bit more so we can scope it right the first time.
            </p>
            <div className="mt-5 space-y-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Full name"
                className="w-full rounded-sm border border-steel-600 bg-steel-950 px-3 py-2.5 text-sm text-bone placeholder:text-steel-400 focus:border-amber-500 focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone number"
                className="w-full rounded-sm border border-steel-600 bg-steel-950 px-3 py-2.5 text-sm text-bone placeholder:text-steel-400 focus:border-amber-500 focus:outline-none"
              />
              <select
                name="intendedUse"
                required
                defaultValue=""
                className="w-full rounded-sm border border-steel-600 bg-steel-950 px-3 py-2.5 text-sm text-steel-300 focus:border-amber-500 focus:outline-none"
              >
                <option value="" disabled>
                  Intended use
                </option>
                <option>Office</option>
                <option>Home / ADU</option>
                <option>Cafe / retail</option>
                <option>Other</option>
              </select>
              <select
                name="budgetRange"
                required
                defaultValue=""
                className="w-full rounded-sm border border-steel-600 bg-steel-950 px-3 py-2.5 text-sm text-steel-300 focus:border-amber-500 focus:outline-none"
              >
                <option value="" disabled>
                  Budget range
                </option>
                <option>Under $30k</option>
                <option>$30k &ndash; $60k</option>
                <option>$60k &ndash; $100k</option>
                <option>$100k+</option>
              </select>
              <textarea
                name="description"
                placeholder="Tell us about your project"
                rows={3}
                className="w-full rounded-sm border border-steel-600 bg-steel-950 px-3 py-2.5 text-sm text-bone placeholder:text-steel-400 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-sm bg-amber-500 py-2.5 font-display text-sm font-semibold tracking-wide text-steel-950 transition hover:bg-amber-400 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Submit inquiry"}
              </button>
              {status === "success" && (
                <p className="text-sm text-amber-400">
                  Thanks — we&rsquo;ll be in touch to talk through your project.
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
