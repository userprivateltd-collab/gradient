"use client";

import { motion } from "framer-motion";
import { Code, Layout, Brain, Globe } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    desc: "Custom LLM fine-tuning, neural workflow automation, and predictive data modeling.",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    desc: "High-concurrency web applications optimized for scale using Next.js and Rust.",
  },
  {
    icon: Layout,
    title: "UI/UX Design Systems",
    desc: "Pixel-perfect, accessible component libraries tailored for luxury brand identities.",
  },
  {
    icon: Globe,
    title: "Cloud Infrastructure",
    desc: "Multi-region cloud architecture, serverless migration, and automated DevOps.",
  },
];

export default function Services() {
  return (
    <section className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs text-purple-400 font-semibold tracking-widest uppercase">
            Core Capabilities
          </h2>
          <p className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Tailored solutions for forward-thinking brands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass glass-hover p-10 rounded-3xl border border-white/10 relative group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 p-[1px] mb-8">
                  <div className="w-full h-full bg-black rounded-[15px] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-purple-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
