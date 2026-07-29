import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#050505] text-white overflow-hidden min-h-screen">
      <Header />
      <Hero />
      <Features />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
