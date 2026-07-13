import { useTranslation } from "react-i18next";
import { Code2, Palette, Rocket, Sparkles } from "lucide-react";

const skills = [
  { icon: Code2, label: "React · Vite · JS" },
  { icon: Palette, label: "UI / UX Design" },
  { icon: Rocket, label: "Django REST" },
  { icon: Sparkles, label: "Motion & CSS" },
];

export default function About() {
  const { t } = useTranslation();
  const stats = [
    { v: "1+", k: t("about.experience") },
    { v: "10+", k: t("about.projects_done") },
    { v: "2+", k: t("about.clients") },
  ];
  return (
    <section id="about" className="relative bg-surface py-20 md:py-28">
      <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="mx-auto aspect-square w-72 rounded-[2rem] bg-accent p-2 shadow-2xl md:w-96 animate-float">
            <div className="flex h-full w-full items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-primary to-[#c85a17] text-8xl font-black text-primary-foreground">
              MW
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 gap-4 rounded-2xl border border-border bg-background/90 px-5 py-3 shadow-xl backdrop-blur md:flex">
            {stats.map((s) => (
              <div key={s.k} className="text-center">
                <div className="text-xl font-extrabold text-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-accent md:text-5xl">{t("about.title")}</h2>
          <p className="text-base text-muted-foreground md:text-lg">{t("about.p1")}</p>
          <p className="text-base text-muted-foreground md:text-lg">{t("about.p2")}</p>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              {t("about.skills")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((s, i) => (
                <div
                  key={i}
                  className="card-hover flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:hidden">
            {stats.map((s) => (
              <div
                key={s.k}
                className="rounded-xl border border-border bg-background p-3 text-center"
              >
                <div className="text-xl font-extrabold text-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
