"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Aura Studio",
    category: "AI Design Assistant",
    gradient: "from-purple-900/50 to-blue-900/50",
  },
  {
    title: "Vortex OS",
    category: "Distributed Cloud Platform",
    gradient: "from-blue-900/50 to-cyan-900/50",
  },
  {
    title: "Lumina Engine",
    category: "Real-time 3D Rendering",
    gradient: "from-purple-900/50 to-pink-900/50",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs text-purple-400 font-semibold tracking-widest uppercase">
              Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">
              Selected Works
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md mt-4 md:mt-0 text-sm">
            Explore recent digital platforms crafted with our signature gradient architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden border border-white/10 group cursor-pointer"
            >
              <div className={`h-64 bg-gradient-to-br ${p.gradient} relative flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105`}>
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">
                  {p.category}
                </span>
                <h3 className="text-xl font-bold mt-2">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
