export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-steel-700 bg-steel-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-corten-500 font-display text-sm font-semibold text-steel-950">
            BIC
          </span>
          <span className="font-display text-lg font-semibold tracking-wide text-bone">
            <span className="hidden sm:inline">BROWARD INTERNATIONAL CONTAINERS</span>
            <span className="sm:hidden">BROWARD INTL CONTAINERS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#containers" className="text-sm text-steel-200 transition hover:text-amber-400">
            Buy a container
          </a>
          <a href="#conversions" className="text-sm text-steel-200 transition hover:text-amber-400">
            Custom conversions
          </a>
          <a href="#why-us" className="text-sm text-steel-200 transition hover:text-amber-400">
            Why us
          </a>
          <a href="#contact" className="text-sm text-steel-200 transition hover:text-amber-400">
            Contact
          </a>
        </nav>

        <a
          href="tel:+15555550123"
          className="hidden rounded-sm bg-amber-500 px-4 py-2 font-display text-sm font-semibold tracking-wide text-steel-950 transition hover:bg-amber-400 md:inline-block"
        >
          (555) 555-0123
        </a>
      </div>
    </header>
  );
}
