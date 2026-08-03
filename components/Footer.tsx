export default function Footer() {
  return (
    <footer id="contact" className="bg-steel-950 pb-24 pt-14 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-bone">
            BROWARD INTERNATIONAL CONTAINERS
          </p>
          <p className="mt-2 text-sm text-steel-400">
            Container sales and custom conversions, delivered across South Florida.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-steel-500">
            Contact
          </p>
          <p className="mt-2 text-sm text-steel-200">(305) 613-9378</p>
          <p className="mt-1 text-sm text-steel-200">browardintlcontainers@gmail.com</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-steel-500">
            Service area
          </p>
          <p className="mt-2 text-sm text-steel-200">
            Delivery across Broward, Miami-Dade &amp; Palm Beach &mdash; call to confirm your zip.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-steel-800 px-5 pt-6">
        <p className="text-xs text-steel-500">
          &copy; {new Date().getFullYear()} Broward International Containers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
