import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import AOS from "aos";
import "@/lib/i18n";
import { useApplyLang } from "@/components/LanguageSwitcher";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Appointment from "@/components/Appointment";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useApplyLang();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });

    document.title = "Portfolio - Waleed Merabet";

    const updateMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(isProperty ? "property" : "name", nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta(
      "description",
      "Personal portfolio showcasing projects, client reviews, and booking.",
    );
    updateMeta("og:title", "Portfolio - Waleed Merabet", true);
    updateMeta(
      "og:description",
      "Personal portfolio showcasing projects, client reviews, and booking.",
      true,
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Hero />
      <WaveDivider />
      <About />
      <Projects />
      <Reviews />
      <Contact />
      <Appointment />
      <Footer />
    </div>
  );
}
