import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-28"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-blob"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {t("hero.eyebrow")}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-accent md:text-6xl">
            {t("hero.title").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-gradient-brand">
              {t("hero.title").split(" ").slice(-2).join(" ")}
            </span>
          </h1>
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 rounded-full border border-accent bg-transparent px-6 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="h-4 w-4" />
              {t("hero.cta2")}
            </a>
          </div>
        </div>

        {/* SVG line drawing */}
        <div className="relative mx-auto w-full max-w-lg">
          <svg
            viewBox="0 0 500 500"
            className="svg-draw w-full drop-shadow-xl"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer blob */}
            <path
              className="d1 text-accent"
              d="M250 40 C360 40 460 130 460 250 C460 370 360 460 250 460 C140 460 40 370 40 250 C40 130 140 40 250 40 Z"
              strokeWidth="2.5"
            />
            {/* Monitor */}
            <path
              className="d2 text-accent"
              d="M120 160 L380 160 Q400 160 400 180 L400 320 Q400 340 380 340 L120 340 Q100 340 100 320 L100 180 Q100 160 120 160 Z"
              strokeWidth="3"
            />
            <line className="d2 text-accent" x1="180" y1="380" x2="320" y2="380" strokeWidth="3" />
            <line className="d2 text-accent" x1="250" y1="340" x2="250" y2="380" strokeWidth="3" />
            {/* Code lines */}
            <polyline
              className="d3 text-primary"
              points="130,200 160,220 130,240"
              strokeWidth="3"
            />
            <line className="d3 text-primary" x1="180" y1="240" x2="260" y2="240" strokeWidth="3" />
            <line className="d3 text-primary" x1="130" y1="270" x2="320" y2="270" strokeWidth="2" />
            <line className="d4 text-primary" x1="150" y1="295" x2="290" y2="295" strokeWidth="2" />
            <line className="d4 text-primary" x1="130" y1="320" x2="240" y2="320" strokeWidth="2" />
            {/* Orbit dots */}
            <circle className="d5 text-primary" cx="80" cy="120" r="14" strokeWidth="2.5" />
            <circle className="d5 text-primary" cx="420" cy="400" r="10" strokeWidth="2.5" />
            <circle className="d5 text-accent" cx="430" cy="120" r="6" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
