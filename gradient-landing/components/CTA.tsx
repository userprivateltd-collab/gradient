"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-12 md:p-20 overflow-hidden text-center glass border border-purple-500/30 shadow-2xl shadow-purple-950/40"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Ready to elevate your digital experience?
            </h2>
            <p className="mt-6 text-neutral-300 text-lg">
              Join thousands of developers and teams building the future with Gradient today.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:gradientsupportio@gmail.com"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
