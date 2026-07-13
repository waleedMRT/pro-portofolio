import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { CalendarCheck } from "lucide-react";

export default function Appointment() {
  const { t } = useTranslation();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const order = Object.fromEntries(fd.entries());
    // Persist locally until DRF is connected
    const list = JSON.parse(localStorage.getItem("orders") || "[]");
    list.unshift({ ...order, createdAt: new Date().toISOString() });
    localStorage.setItem("orders", JSON.stringify(list));
    toast.success("Appointment requested!");
    e.currentTarget.reset();
  };
  return (
    <section id="appointment" className="relative bg-surface py-20 md:py-28">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <CalendarCheck className="h-3.5 w-3.5" /> {t("appointment.title")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-accent md:text-5xl">
            {t("appointment.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("appointment.subtitle")}</p>
        </div>

        <form
          onSubmit={submit}
          className="grid grid-cols-1 gap-4 rounded-3xl border border-border bg-background p-6 shadow-xl md:grid-cols-2 md:p-8"
        >
          <input
            required
            name="name"
            placeholder={t("appointment.name")}
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            required
            type="email"
            name="email"
            placeholder={t("appointment.email")}
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            required
            type="date"
            name="date"
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            required
            type="time"
            name="time"
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            required
            name="service"
            defaultValue=""
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary md:col-span-2"
          >
            <option value="" disabled>
              {t("appointment.service")}
            </option>
            <option value="web">{t("appointment.services.web")}</option>
            <option value="design">{t("appointment.services.design")}</option>
            <option value="consult">{t("appointment.services.consult")}</option>
          </select>
          <textarea
            name="note"
            rows={4}
            placeholder={t("appointment.note")}
            className="rounded-xl border border-border bg-surface p-4 outline-none focus:ring-2 focus:ring-primary md:col-span-2"
          />
          <button className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3 font-semibold text-accent-foreground transition hover:bg-primary hover:text-primary-foreground">
            {t("appointment.submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
