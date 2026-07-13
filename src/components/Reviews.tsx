import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah K.",
    role: "Founder, Nova",
    text: "Beyond expectations. Fast, elegant, and thoughtful in every detail.",
  },
  {
    name: "Omar B.",
    role: "CTO, Atlas",
    text: "Delivered a beautiful product on time. Communication was flawless.",
  },
  {
    name: "Léa M.",
    role: "Designer",
    text: "The animations and micro-interactions really made our brand come alive.",
  },
  {
    name: "Ali R.",
    role: "Product Lead",
    text: "One of the best collaborations I've had. Highly recommended.",
  },
  {
    name: "Mia T.",
    role: "Marketing Head",
    text: "Our conversion jumped after the redesign. Thank you!",
  },
];

export default function Reviews() {
  const { t } = useTranslation();
  return (
    <section id="reviews" className="bg-accent py-20 text-accent-foreground md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold md:text-5xl">{t("reviews.title")}</h2>
          <p className="mt-3 opacity-80">{t("reviews.subtitle")}</p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              <div className="card-hover flex h-full flex-col justify-between rounded-3xl bg-white/5 p-6 backdrop-blur ring-1 ring-white/10">
                <Quote className="h-8 w-8 text-primary" />
                <p className="mt-4 text-base leading-relaxed">{r.text}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs opacity-70">{r.role}</div>
                  </div>
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
