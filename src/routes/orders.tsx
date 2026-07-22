import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { useApplyLang } from "@/components/LanguageSwitcher";
import { ArrowLeft, Lock, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/orders")({
  component: Orders,
});

function Orders() {
  useApplyLang();
  const { t } = useTranslation();
  const [ok, setOk] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Orders - Admin";
    let metaRobots = document.querySelector("meta[name='robots']");
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex");
  }, []);

  // التحقق من وجود الـ Token عند فتح الصفحة
  useEffect(() => {
    const savedToken = sessionStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      setOk(true);
    }
  }, []);

  // جلب الحجوزات من الـ API بعد تسجيل الدخول بنجاح
  useEffect(() => {
    if (ok && token) {
      fetch("https://portfoliomrt.pythonanywhere.com/api/appointments/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            handleLogout();
            throw new Error("Session expired");
          }
          return res.json();
        })
        .then((data) => setOrders(data))
        .catch((e) => {
          console.error("Error fetching appointments:", e);
        });
    }
  }, [ok, token]);

  // تسجيل الخروج التلقائي في حال انتهاء صلاحية الجلسة
  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setOk(false);
    setOrders([]);
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErr("");

    try {
      const response = await fetch("https://portfoliomrt.pythonanywhere.com/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "admin", // القيمة الافتراضية المحددة في الـ View
          password: pwd,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        sessionStorage.setItem("admin_token", data.token);
        setToken(data.token);
        setOk(true);
        setErr("");
      } else {
        setErr(data.error || t("orders.wrong") || "Incorrect password");
      }
    } catch (error) {
      console.error("Login connection error:", error);
      setErr("Failed to connect to backend server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch(`https://portfoliomrt.pythonanywhere.com/api/appointments/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const next = orders.filter((o) => o.id !== id);
        setOrders(next);
        toast.success("Appointment deleted successfully.");
      } else {
        toast.error("Failed to delete appointment.");
      }
    } catch (e) {
      console.error("Error deleting appointment:", e);
      toast.error("Something went wrong.");
    }
  };

  if (!ok) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface p-6">
        <form
          onSubmit={login}
          className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-background p-8 shadow-2xl"
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-accent">
            {t("orders.login")}
          </h1>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder={t("orders.password")}
            className="h-12 w-full rounded-xl border border-border bg-surface px-4 outline-none focus:ring-2 focus:ring-primary"
          />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button 
            disabled={isLoggingIn}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isLoggingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {t("orders.enter")}
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Home
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-extrabold text-accent">
              {t("orders.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("orders.subtitle")}
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm hover:bg-surface"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {orders.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-background p-16 text-center text-muted-foreground">
            {t("orders.empty")}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((o) => (
              <div
                key={o.id}
                className="card-hover rounded-2xl border border-border bg-background p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-primary">
                      {o.service}
                    </div>
                    <div className="mt-1 font-bold">{o.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {o.email}
                    </div>
                    {o.phone && (
                      <div className="text-sm text-muted-foreground mt-0.5">
                        {o.phone}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => remove(o.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex gap-2 text-xs">
                  <span className="rounded-full bg-surface px-3 py-1">
                    {o.date}
                  </span>
                  <span className="rounded-full bg-surface px-3 py-1">
                    {o.time}
                  </span>
                </div>
                {o.note && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {o.note}
                  </p>
                )}
                <div className="mt-3 text-[11px] text-muted-foreground">
                  {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
