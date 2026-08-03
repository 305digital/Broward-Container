const paths = [
  {
    id: "containers",
    label: "Buy a container",
    badge: "Most popular",
    desc: "New, used, and one-trip containers in every standard size. Delivered to your site.",
    cta: "Browse sizes & get a quote",
    href: "#containers",
  },
  {
    id: "conversions",
    label: "Custom living spaces",
    badge: null,
    desc: "Offices, tiny homes, cafes, and studios — designed and built from shipping containers.",
    cta: "See the process & portfolio",
    href: "#conversions",
  },
];

export default function ServicePaths() {
  return (
    <section className="border-b border-steel-700 bg-steel-950 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="stencil-eyebrow text-center font-mono text-xs uppercase text-steel-400">
          Two ways to work with us
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {paths.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className={`group relative rounded-md border p-7 transition ${
                p.badge
                  ? "border-amber-500/60 bg-steel-900"
                  : "border-steel-700 bg-steel-900 hover:border-corten-400/60"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-7 rounded-sm bg-amber-500 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-steel-950">
                  {p.badge}
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold text-bone">
                {p.label}
              </h3>
              <p className="mt-2 text-sm text-steel-300">{p.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold tracking-wide text-amber-400">
                {p.cta}
                <span className="transition group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
