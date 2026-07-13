import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";

// مصفوفة المشاريع المحدثة بمشاريع حقيقية وروابط معاينة
const projects = [
  {
    title: "Online Store",
    tag: "React · Django · Api",
    color: "from-[#FE7F2D] to-[#c85a17]",
    link: "https://friendly-sundae-60b595.netlify.app/", // استبدله برابط مشروعك
  },
  {
    title: "Prayer Times",
    tag: "React · API ",
    color: "from-[#233D4D] to-[#0f2029]",
    link: "https://mawakit.netlify.app/", // استبدله برابط مشروعك
  },
  {
    title: "Landing Page",
    tag: "React · CSS · Aos",
    color: "from-[#000000] to-[#333]",
    link: "https://landing-page-mrt.netlify.app/", // استبدله برابط مشروعك
  },
  {
    title: "Lawyer Web Site",
    tag: "React · Django · Api",
    color: "from-[#FE7F2D] to-[#233D4D]",
    link: "https://lawyermrt.netlify.app/", // استبدله برابط مشروعك
  },
  {
    title: "Creative Portfolio",
    tag: "Django · HTML · CSS · JS",
    color: "from-[#233D4D] to-[#FE7F2D]",
    link: "https://walidmerabet.pythonanywhere.com/", // استبدله برابط مشروعك
  },
];

export default function Projects() {
  const { t } = useTranslation();
  return (
    <section id="projects" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-extrabold text-accent md:text-5xl">{t("projects.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("projects.subtitle")}</p>
        </div>

        <div data-aos="fade-up">
          <Swiper
            modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
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
            {projects.map((p, i) => (
              <SwiperSlide key={i} className="!w-[300px] md:!w-[380px]">
                <div
                  className={`card-hover group relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br ${p.color} p-6 text-white shadow-xl`}
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

                    {/* تم تحويل الـ button إلى وسم a ليعمل كرابط حقيقي */}
                    <a
                      href={p.link}
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
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
