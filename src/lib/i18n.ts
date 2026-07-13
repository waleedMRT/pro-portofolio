import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        reviews: "Reviews",
        contact: "Contact",
        book: "Book",
      },
      hero: {
        eyebrow: "Creative Developer & Designer",
        title: "I craft digital experiences that feel alive.",
        subtitle:
          "Full-stack developer building modern, responsive interfaces with a focus on motion and detail.",
        cta: "See my work",
        cta2: "Book a call",
      },
      about: {
        title: "About Me",
        p1: "I'm a passionate developer who blends clean code with thoughtful design. I've spent years crafting products that people love to use.",
        p2: "From concept to launch, I care about every pixel and every millisecond.",
        skills: "Skills",
        experience: "Years of Experience",
        projects_done: "Projects Delivered",
        clients: "Happy Clients",
      },
      projects: {
        title: "Selected Projects",
        subtitle: "A glimpse into things I've built.",
        view: "View project",
      },
      reviews: {
        title: "Client Reviews",
        subtitle: "What people say after we've shipped together.",
      },
      contact: {
        title: "Let's talk",
        subtitle: "Have an idea? Drop me a line.",
        name: "Your name",
        email: "Email",
        message: "Tell me about your project",
        send: "Send message",
      },
      appointment: {
        title: "Book an Appointment",
        subtitle: "Pick a time that works for you.",
        name: "Full name",
        email: "Email",
        date: "Preferred date",
        time: "Preferred time",
        service: "Service",
        note: "Notes (optional)",
        submit: "Request appointment",
        services: { web: "Web development", design: "UI/UX Design", consult: "Consulting" },
      },
      orders: {
        title: "Orders",
        subtitle: "Manage incoming requests.",
        login: "Admin login",
        password: "Password",
        enter: "Enter",
        wrong: "Wrong password",
        empty: "No orders yet.",
      },
      footer: { rights: "All rights reserved." },
    },
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        about: "À propos",
        projects: "Projets",
        reviews: "Avis",
        contact: "Contact",
        book: "Rendez-vous",
      },
      hero: {
        eyebrow: "Développeur & Designer Créatif",
        title: "Je crée des expériences numériques vivantes.",
        subtitle:
          "Développeur full-stack, je conçois des interfaces modernes et réactives, centrées sur le mouvement et le détail.",
        cta: "Voir mes projets",
        cta2: "Prendre rendez-vous",
      },
      about: {
        title: "À propos de moi",
        p1: "Développeur passionné, je combine un code propre à un design réfléchi. Je crée depuis des années des produits que les gens adorent utiliser.",
        p2: "Du concept au lancement, je soigne chaque pixel et chaque milliseconde.",
        skills: "Compétences",
        experience: "Années d'expérience",
        projects_done: "Projets livrés",
        clients: "Clients satisfaits",
      },
      projects: {
        title: "Projets sélectionnés",
        subtitle: "Un aperçu de mes réalisations.",
        view: "Voir le projet",
      },
      reviews: { title: "Avis clients", subtitle: "Ce qu'ils disent après nos collaborations." },
      contact: {
        title: "Parlons-en",
        subtitle: "Une idée ? Écrivez-moi.",
        name: "Votre nom",
        email: "Email",
        message: "Parlez-moi de votre projet",
        send: "Envoyer le message",
      },
      appointment: {
        title: "Prendre rendez-vous",
        subtitle: "Choisissez un créneau.",
        name: "Nom complet",
        email: "Email",
        date: "Date souhaitée",
        time: "Heure souhaitée",
        service: "Service",
        note: "Notes (optionnel)",
        submit: "Demander un rendez-vous",
        services: { web: "Développement web", design: "Design UI/UX", consult: "Consulting" },
      },
      orders: {
        title: "Commandes",
        subtitle: "Gorez les demandes entrantes.",
        login: "Connexion admin",
        password: "Mot de passe",
        enter: "Entrer",
        wrong: "Mot de passe incorrect",
        empty: "Aucune commande pour l'instant.",
      },
      footer: { rights: "Tous droits réservés." },
    },
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        about: "نبذة",
        projects: "المشاريع",
        reviews: "الآراء",
        contact: "تواصل",
        book: "احجز",
      },
      hero: {
        eyebrow: "مطوّر ومصمّم مبدع",
        title: "أصنع تجارب رقمية تنبض بالحياة.",
        subtitle: "مطوّر ويب متكامل، أبني واجهات عصرية ومتجاوبة مع التركيز على الحركة والتفاصيل.",
        cta: "شاهد أعمالي",
        cta2: "احجز مكالمة",
      },
      about: {
        title: "نبذة عني",
        p1: "أنا مطوّر شغوف أمزج بين الكود النظيف والتصميم المدروس. أمضيت سنوات في صناعة منتجات يحبّها المستخدمون.",
        p2: "من الفكرة إلى الإطلاق، أهتم بكل بكسل وكل جزء من الثانية.",
        skills: "المهارات",
        experience: "سنوات الخبرة",
        projects_done: "مشاريع منجزة",
        clients: "عملاء سعداء",
      },
      projects: { title: "مشاريع مختارة", subtitle: "لمحة عمّا صنعت.", view: "عرض المشروع" },
      reviews: { title: "آراء العملاء", subtitle: "ما يقولونه بعد إنجاز المشاريع معًا." },
      contact: {
        title: "لنتحدّث",
        subtitle: "لديك فكرة؟ راسلني.",
        name: "اسمك",
        email: "البريد الإلكتروني",
        message: "أخبرني عن مشروعك",
        send: "إرسال الرسالة",
      },
      appointment: {
        title: "احجز موعدًا",
        subtitle: "اختر الوقت المناسب لك.",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        date: "التاريخ المفضّل",
        time: "الوقت المفضّل",
        service: "الخدمة",
        note: "ملاحظات (اختياري)",
        submit: "طلب حجز",
        services: { web: "تطوير الويب", design: "تصميم واجهات UI/UX", consult: "استشارات" },
      },
      orders: {
        title: "الطلبات",
        subtitle: "إدارة الطلبات الواردة.",
        login: "دخول المسؤول",
        password: "كلمة المرور",
        enter: "دخول",
        wrong: "كلمة مرور خاطئة",
        empty: "لا توجد طلبات بعد.",
      },
      footer: { rights: "جميع الحقوق محفوظة." },
    },
  },
};

// تشغيل التهيئة والربط مباشرة وبدون أي شروط مسبقة لضمان استقرار التطبيق
i18n.use(initReactI18next).init({
  resources,
  lng: typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en", // جعلنا العربي هو الافتراضي هنا إذا أردت
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;