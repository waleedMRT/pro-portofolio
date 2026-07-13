import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useTranslation();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message queued — will be sent when the API is connected.");
    (e.target as HTMLFormElement).reset();
  };
  return (
    <section id="contact" className="bg-background py-20 md:py-28">
      <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-accent md:text-5xl">{t("contact.title")}</h2>
          <p className="text-muted-foreground">{t("contact.subtitle")}</p>
          <ul className="space-y-4">
            {[
              { icon: Mail, label: "merabetwalid15@gmail.com" },
              { icon: Phone, label: "+213 558 18 47 17" },
              { icon: MapPin, label: "Tiaret, Algeria" },
            ].map((i, k) => (
              <li key={k} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <i.icon className="h-5 w-5" />
                </span>
                <span className="font-medium">{i.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-xl md:p-8"
        >
          <input
            required
            name="name"
            placeholder={t("contact.name")}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            required
            type="email"
            name="email"
            placeholder={t("contact.email")}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            required
            rows={5}
            name="message"
            placeholder={t("contact.message")}
            className="w-full rounded-xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5">
            <Send className="h-4 w-4" />
            {t("contact.send")}
          </button>
        </form>
      </div>
    </section>
  );
}
