import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const langs = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export function useApplyLang() {
  const { i18n } = useTranslation();
  useEffect(() => {
    // جلب اللغة المحفوظة في المتصفح أو اعتماد الإنجليزية كخيار افتراضي
    const lang = i18n.language || localStorage.getItem("lang") || "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [i18n.language]);
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  // حماية الكود وتحديد لغة افتراضية احتياطية في حال كانت قيمة i18n.language غير معرفة بعد
  const currentLang = i18n.language?.slice(0, 2) || "en";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background/80 px-3 text-sm font-medium backdrop-blur hover:bg-surface transition">
        <Globe className="h-4 w-4" />
        <span className="uppercase">{currentLang}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {langs.map((l) => (
          <DropdownMenuItem key={l.code} onClick={() => i18n.changeLanguage(l.code)}>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}