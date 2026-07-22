import { useEffect, useState } from "react"; // استيراد الخطافات اللازمة
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";

// مصفوفة التدرجات اللونية لتوزيعها ديناميكيًا على المشاريع القادمة من قاعدة البيانات
const colorGradients = [
  "from-[#FE7F2D] to-[#c85a17]",
  "from-[#233D4D] to-[#0f2029]",
  "from-[#000000] to-[#333]",
  "from-[#FE7F2D] to-[#233D4D]",
  "from-[#233D4D] to-[#FE7F2D]",
];

// تعريف واجهة البيانات للمشروع (اختياري للـ TypeScript)
interface Project {
  id?: number;
  title: string;
  tag: string;
  link?: string;
  url?: string; // دعم في حال كان الحقل في قاعدة البيانات باسم url
  color?: string;
}

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب البيانات من الـ API الخاص بالمشاريع
    // يمكنك استبدال الرابط بمتغير البيئة الخاص بك إذا كنت تستخدم .env (مثل: import.meta.env.VITE_API_URL)
    fetch("https://portfoliomrt.pythonanywhere.com/api/projects/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects from DRF:", err);
        setLoading(false);
      });
  }, []);

  // إذا كانت البيانات قيد التحميل، يمكنك إظهار تلميح بسيط أو تركه فارغًا حتى يكتمل الطلب
  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        {t("loading", "Loading projects...")}
      </div>
    );
  }

  return (
    <section id="projects" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-accent md:text-5xl">{t("projects.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("projects.subtitle")}</p>
        </div>

        {projects.length > 0 ? (
          <div>
            <Swiper
              modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              // الـ Loop يعمل فقط عند توفر مشاريع كافية لعدم حدوث أخطاء في Swiper
              loop={projects.length >= 3}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 180,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              className="!pb-14"
            >
              {projects.map((p, i) => {
                // دمج الألوان: إذا كان هناك لون قادم من الـ API نستخدمه، وإلا نقوم بتدوير مصفوفة الألوان الافتراضية
                const cardColor = p.color || colorGradients[i % colorGradients.length];
                const projectLink = p.link || p.url || "#";

                return (
                  <SwiperSlide key={p.id || i} className="!w-[300px] md:!w-[380px]">
                    <div
                      className={`card-hover group relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br ${cardColor} p-6 text-white shadow-xl`}
                    >
                      <div
                        className="absolute inset-0 opacity-30 mix-blend-overlay"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 20% 20%, rgba(255,255,255,.4), transparent 40%)",
                        }}
                      />
                      <div className="relative flex h-full flex-col justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-widest opacity-80">{p.tag}</div>
                          <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">{p.title}</h3>
                        </div>

                        <a
                          href={projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition group-hover:bg-white group-hover:text-accent"
                        >
                          {t("projects.view")}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            {t("projects.empty", "No projects to display yet.")}
          </div>
        )}
      </div>
    </section>
  );
}