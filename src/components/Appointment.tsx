import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { CalendarCheck, Loader2 } from "lucide-react";

export default function Appointment() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const order = Object.fromEntries(fd.entries());

    setIsSubmitting(true);

    try {
      const response = await fetch("https://portfoliomrt.pythonanywhere.com/api/appointments/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData) {
          console.error("تفاصيل خطأ Django:", errorData);
          // تحويل مصفوفة الأخطاء إلى نص واضح
          const errorMessages = Object.entries(errorData)
            .map(([field, errors]) => {
              const errorText = Array.isArray(errors) ? errors.join(", ") : errors;
              return `${field}: ${errorText}`;
            })
            .join(" | ");
          toast.error(`خطأ: ${errorMessages}`);
        } else {
          toast.error(t("appointment.error_message") || "Something went wrong.");
        }
        throw new Error("Failed to submit appointment");
      }

      // نجاح العملية وتصفير الحقول
      toast.success(t("appointment.success_message") || "Appointment requested successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
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
          {/* الاسم */}
          <input
            required
            name="name"
            placeholder={t("appointment.name")}
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />

          {/* البريد الإلكتروني */}
          <input
            required
            type="email"
            name="email"
            placeholder={t("appointment.email")}
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />

          {/* رقم الهاتف - تم إرجاعه إلى phone ليطابق Django */}
          <input
            required
            type="tel"
            name="phone"
            placeholder={t("appointment.phone") || "Phone Number"}
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary md:col-span-2"
          />

          {/* التاريخ */}
          <input
            required
            type="date"
            name="date"
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />

          {/* الوقت */}
          <input
            required
            type="time"
            name="time"
            className="h-12 rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />

          {/* الخدمة - تم تعديل قيم الـ value لتطابق خيارات Django تماماً */}
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
            <option value="landing page">{t("appointment.services.landing") || "Landing Page"}</option>
            <option value="ecommerce">{t("appointment.services.ecommerce") || "E-commerce"}</option>
          </select>

          {/* الملاحظات */}
          <textarea
            name="note"
            rows={4}
            placeholder={t("appointment.note")}
            className="rounded-xl border border-border bg-surface p-4 outline-none focus:ring-2 focus:ring-primary md:col-span-2"
          />

          {/* زر الإرسال */}
          <button
            disabled={isSubmitting}
            className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3 font-semibold text-accent-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("appointment.submitting") || "Sending..."}
              </>
            ) : (
              t("appointment.submit")
            )}
          </button>
        </form>
      </div>
    </section>
  );
}