"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Animated Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs md:text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
            Next Generation AI Platform 2.0
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl mx-auto leading-[1.1]"
        >
          The Future Starts Here. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
            Build. Create. Innovate.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Empower your enterprise with intuitive AI workflows, instant deployment pipelines, and intelligent design automation engineered for high performance.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 group"
          >
            Start Building
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass glass-hover text-white font-medium flex items-center justify-center gap-2 transition-all border border-white/10"
          >
            <Play className="w-4 h-4 fill-white" />
            Watch Product Demo
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: "Uptime Guaranteed", val: "99.99%" },
            { label: "Active Developers", val: "250K+" },
            { label: "Latency Reduction", val: "< 10ms" },
            { label: "Global Nodes", val: "120+" },
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-white/5 text-center">
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                {stat.val}
              </p>
              <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
