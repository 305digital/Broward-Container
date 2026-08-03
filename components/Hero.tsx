export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-steel-700 bg-steel-900 bg-corrugated"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-28">
        <div>
          <p className="stencil-eyebrow font-mono text-xs font-medium uppercase text-corten-400">
            Serial No. BIC-0417 &middot; Est. 2011
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-bone md:text-6xl">
            New &amp; used shipping
            <br />
            containers, delivered fast
          </h1>
          <p className="mt-5 max-w-md text-base text-steel-200 md:text-lg">
            Plus custom conversions into offices, homes, and studios —
            built from the ground up on the steel you already trust.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#containers"
              className="rounded-sm bg-amber-500 px-6 py-3 text-center font-display text-sm font-semibold tracking-wide text-steel-950 transition hover:bg-amber-400"
            >
              Get a container quote
            </a>
            <a
              href="#conversions"
              className="rounded-sm border border-steel-600 px-6 py-3 text-center font-display text-sm font-semibold tracking-wide text-bone transition hover:border-amber-400 hover:text-amber-400"
            >
              See custom conversions
            </a>
          </div>

          <div className="mt-10 flex gap-8">
            <div>
              <p className="font-display text-2xl font-semibold text-bone">15+</p>
              <p className="text-xs text-steel-400">years in business</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-bone">2,000+</p>
              <p className="text-xs text-steel-400">containers sold</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-bone">40+</p>
              <p className="text-xs text-steel-400">conversions built</p>
            </div>
          </div>
        </div>

        {/* Signature element: customs-style inspection stamp */}
        <div className="flex justify-center md:justify-end">
          <div className="flex h-48 w-48 rotate-[-6deg] items-center justify-center rounded-full border-[3px] border-dashed border-corten-400/70 md:h-60 md:w-60">
            <div className="flex h-[85%] w-[85%] flex-col items-center justify-center rounded-full border border-corten-400/40 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-corten-400">
                Inspected &amp;
              </p>
              <p className="font-display text-xl font-semibold uppercase tracking-wide text-bone">
                Certified
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-corten-400">
                Every Unit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
