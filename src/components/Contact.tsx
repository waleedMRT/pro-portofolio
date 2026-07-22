import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Star, MessageSquare, Award, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    
    const data = {
      name: fd.get("name"),
      role: fd.get("role"),
      text: fd.get("text"),
      rating: Number(fd.get("rating")),
    };

    try {
      const response = await fetch("https://portfoliomrt.pythonanywhere.com/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // ✅ تم حل مشكلة الـ fallback هنا لتعمل بشكل مضمون 100%
        toast.success(t("contact.success", "Thank you! Your review has been submitted successfully."));
        form.reset();
      } else {
        toast.error(t("contact.error", "Failed to submit review. Please try again."));
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(t("contact.error", "Something went wrong."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-background py-20 md:py-28">
      <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-2">
        
        {/* الجانب الأيسر */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-accent md:text-5xl">
            {t("contact.title", "Share Your Experience")}
          </h2>
          <p className="text-muted-foreground">
            {t("contact.subtitle", "Your feedback helps us continuously improve our services and deliver 5-star quality.")}
          </p>
          <ul className="space-y-4">
            {[
              { 
                icon: Star, 
                label: t("contact.benefit1", "Genuine feedback from real clients") 
              },
              { 
                icon: MessageSquare, 
                label: t("contact.benefit2", "Your opinion shapes our future features") 
              },
              { 
                icon: Award, 
                label: t("contact.benefit3", "Striving for absolute digital perfection") 
              },
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

        {/* الجانب الأيمن (الفورم) */}
        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-xl md:p-8"
        >
          <input
            required
            name="name"
            placeholder={t("contact.name", "Full Name")}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            required
            name="role"
            placeholder={t("contact.role", "Role / Company (e.g. Founder, Nova)")}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-primary"
          />

          <select
            required
            name="rating"
            defaultValue="5"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-primary text-muted-foreground focus:text-foreground"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="4">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
            <option value="2">⭐⭐ (2/5)</option>
            <option value="1">⭐ (1/5)</option>
          </select>

          <textarea
            required
            rows={5}
            name="text"
            placeholder={t("contact.message", "Write your honest review here...")}
            className="w-full rounded-xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary"
          />

          <button 
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? t("contact.submitting", "Sending...") : t("contact.submit", "Submit Review")}
          </button>
        </form>
      </div>
    </section>
  );
}