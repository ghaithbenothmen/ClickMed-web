import { ShifaLogo } from "@/components/brand/ShifaLogo";
import { Container } from "@/components/ui/Container";
import { footer, site } from "@/data/content";
import { accessHref, navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer data-nav-theme="dark" className="bg-night text-white">
      <Container size="wide" className="border-t border-white/10 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <ShifaLogo tone="light" markSize={32} />
            <p className="text-[15px] text-white/60">{site.tagline}</p>
          </div>

          <nav aria-label="Navigation du pied de page" className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <ul className="flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[15px] text-white/75 transition-colors duration-200 hover:text-lime"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <a
                href={accessHref}
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors duration-200 hover:text-lime"
              >
                <span className="size-1.5 rounded-full bg-lime" aria-hidden />
                {footer.access}
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/45 sm:flex-row sm:justify-between">
          <p>{footer.copyright}</p>
          <p>Images temporaires : Unsplash</p>
        </div>
      </Container>
    </footer>
  );
}
