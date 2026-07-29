"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs text-blue-400 font-semibold tracking-widest uppercase">
              About Gradient
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight leading-tight">
              We bridge human creativity and artificial intelligence.
            </h2>
            <p className="mt-6 text-neutral-400 text-lg leading-relaxed">
              Founded in 2026, Gradient was built on a simple premise: software should feel magical, effortless, and lightning fast. We build products that empower creators, engineers, and visionaries to manifest ideas without technical friction.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Minimalist design philosophy backed by mathematical precision.",
                "Zero-compromise security architecture built into every component.",
                "Continuous automated model optimization and low-overhead runtimes.",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-neutral-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-purple-400 font-mono">01 // VISION</span>
                <h4 className="text-lg font-bold mt-1">Autonomous Infrastructure</h4>
                <p className="text-sm text-neutral-400 mt-1">
                  Self-managing AI clusters that scale capacity dynamically.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-blue-400 font-mono">02 // MISSION</span>
                <h4 className="text-lg font-bold mt-1">Democratized Intelligence</h4>
                <p className="text-sm text-neutral-400 mt-1">
                  Making elite-grade machine learning accessible to any developer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-cyan-400 font-mono">03 // ETHOS</span>
                <h4 className="text-lg font-bold mt-1">Aesthetic Excellence</h4>
                <p className="text-sm text-neutral-400 mt-1">
                  Functional utility paired with world-class user experiences.
                  <h2>Built and founded by RAJESH BANOTH <h2/>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
