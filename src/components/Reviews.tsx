import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote, Star, Loader2 } from "lucide-react";

// تعريف نوع البيانات القادمة من الـ API
interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export default function Reviews() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب التقييمات من الـ API (التقييمات المقبولة فقط)
  useEffect(() => {
    fetch("https://portfoliomrt.pythonanywhere.com/api/reviews/")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="reviews" className="bg-accent py-20 text-accent-foreground md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold md:text-5xl">{t("reviews.title")}</h2>
          <p className="mt-3 opacity-80">{t("reviews.subtitle")}</p>
        </div>

        {/* حالة التحميل: تظهر أنيميشن خفيف متناسق مع التصميم دون تخريب الصفحة */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          // في حال لم تكن هناك تقييمات موافق عليها بعد
          <div className="text-center py-12 text-sm opacity-60">
            {t("reviews.empty", "No reviews available yet.")}
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            // 💡 أمان ذكي لـ Swiper: يتم تفعيل الـ Loop والـ Autoplay فقط إذا كان عدد التقييمات كافياً (أكثر من 3)
            // لتجنب أي مشاكل برمجية أو جمود في حركة العناصر إذا كان هناك تقييم واحد أو اثنين فقط.
            loop={reviews.length > 3}
            autoplay={reviews.length > 3 ? { delay: 4500, disableOnInteraction: false } : false}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {reviews.map((r) => (
              <SwiperSlide key={r.id}>
                <div className="card-hover flex h-full flex-col justify-between rounded-3xl bg-white/5 p-6 backdrop-blur ring-1 ring-white/10">
                  <Quote className="h-8 w-8 text-primary" />
                  <p className="mt-4 text-base leading-relaxed">"{r.text}"</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-xs opacity-70">{r.role}</div>
                    </div>
                    
                    {/* عرض النجوم بشكل ديناميكي حسب التقييم المخزن في قاعدة البيانات */}
                    <div className="flex gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star 
                          key={k} 
                          className={`h-4 w-4 ${k < r.rating ? "fill-current" : "opacity-20"}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}