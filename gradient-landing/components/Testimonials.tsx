"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Gradient cut our deployment pipelines by 70%. The aesthetic speed is unmatched.",
    author: "Elena Rostova",
    role: "VP of Engineering, Apex Systems",
  },
  {
    quote: "The most cohesive developer experience we have ever integrated into our stack.",
    author: "Marcus Vance",
    role: "CTO, CloudScale",
  },
  {
    quote: "It feels like software from 5 years in the future. Absolutely breathtaking.",
    author: "Sarah Jenkins",
    role: "Lead Designer, Studio Nova",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-xs text-blue-400 font-semibold tracking-widest uppercase">
          Social Proof
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">
          Trusted by builders worldwide.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <p className="text-neutral-300 italic text-base leading-relaxed mb-8">
              "{t.quote}"
            </p>
            <div>
              <p className="font-bold text-white">{t.author}</p>
              <p className="text-xs text-neutral-500 mt-1">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
