export default function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-steel-700 bg-steel-950/95 backdrop-blur md:hidden">
      <a
        href="tel:+13056139378"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 font-display text-sm font-semibold tracking-wide text-steel-950 bg-amber-500"
      >
        Call now
      </a>
      <a
        href="sms:+13056139378?body=Hi%2C%20I%27m%20interested%20in%20a%20container%20quote"
        className="flex flex-1 items-center justify-center gap-2 border-l border-steel-700 py-3.5 font-display text-sm font-semibold tracking-wide text-bone"
      >
        Text us
      </a>
    </div>
  );
}
