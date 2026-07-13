import { Home, User, Briefcase, Star, Mail, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const items = [
  { id: "home", icon: Home, key: "nav.home" },
  { id: "about", icon: User, key: "nav.about" },
  { id: "projects", icon: Briefcase, key: "nav.projects" },
  { id: "reviews", icon: Star, key: "nav.reviews" },
  { id: "contact", icon: Mail, key: "nav.contact" },
  { id: "appointment", icon: Calendar, key: "nav.book" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Top navbar (desktop) */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-background/80 backdrop-blur border-b border-border" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <a href="#home" className="text-lg font-extrabold tracking-tight text-accent">
            <span className="text-primary">/</span>walid merabet
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {items.map((i) => (
              <a
                key={i.id}
                href={`#${i.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === i.id
                    ? "bg-accent text-accent-foreground"
                    : "text-accent hover:bg-surface"
                }`}
              >
                {t(i.key)}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Bottom navbar (mobile) */}
      <nav className="fixed inset-x-0 bottom-3 z-50 mx-auto flex w-[95%] max-w-md items-center justify-between rounded-2xl border border-border bg-background/95 px-2 py-2 shadow-2xl backdrop-blur md:hidden">
        {items.map((i) => {
          const isActive = active === i.id;
          return (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="group relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] transition"
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl transition ${
                  isActive
                    ? "bg-primary text-primary-foreground animate-pop-in shadow-lg shadow-primary/30"
                    : "text-accent"
                }`}
              >
                <i.icon className="h-4 w-4" />
              </span>
              <span
                className={`${isActive ? "font-semibold text-primary" : "text-muted-foreground"}`}
              >
                {t(i.key)}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
