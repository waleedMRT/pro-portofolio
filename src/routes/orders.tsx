import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { useApplyLang } from "@/components/LanguageSwitcher";
import { ArrowLeft, Lock, Trash2 } from "lucide-react";

export const Route = createFileRoute("/orders")({
  component: Orders,
});

const ADMIN_PASS = "admin123";

function Orders() {
  useApplyLang();
  const { t } = useTranslation();
  const [ok, setOk] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

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

  useEffect(() => {
    if (sessionStorage.getItem("admin") === "1") {
      setOk(true);
    }
  }, []);

  useEffect(() => {
    if (ok) {
      try {
        const localData = localStorage.getItem("orders");
        setOrders(localData ? JSON.parse(localData) : []);
      } catch (e) {
        console.error("Error parsing localStorage data", e);
        setOrders([]);
      }
    }
  }, [ok]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASS) {
      sessionStorage.setItem("admin", "1");
      setOk(true);
      setErr("");
    } else {
      setErr(t("orders.wrong"));
    }
  };

  const remove = (i: number) => {
    const next = orders.filter((_, k) => k !== i);
    setOrders(next);
    localStorage.setItem("orders", JSON.stringify(next));
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
          <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5">
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
            {orders.map((o, i) => (
              <div
                key={i}
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
                    onClick={() => remove(i)}
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