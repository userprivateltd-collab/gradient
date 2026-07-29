"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, ShieldCheck, Layers, Workflow, Terminal } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Neural Engine 4.0",
    desc: "Process complex multimodal queries with zero-latency streaming architectures.",
  },
  {
    icon: Zap,
    title: "Instant Edge Deploy",
    desc: "Global low-latency deployment with automated caching across 120+ POPs.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "End-to-end encryption, SOC2 Type II compliance, and isolated VPC runtimes.",
  },
  {
    icon: Layers,
    title: "Modular Stack",
    desc: "Pluggable microservice architecture designed to adapt seamlessly to your tools.",
  },
  {
    icon: Workflow,
    title: "Autonomous Workflows",
    desc: "Self-healing pipeline orchestration triggered by event-driven logic chains.",
  },
  {
    icon: Terminal,
    title: "Developer First API",
    desc: "Fully typed SDKs for TypeScript, Python, Go, and Rust with native OpenAPI specs.",
  },
];

export default function Features() {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs text-purple-400 font-semibold tracking-widest uppercase">
            Built For Scale
          </h2>
          <p className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Engineered for unprecedented speed and elegance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass glass-hover p-8 rounded-3xl transition-all duration-300 relative group overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
