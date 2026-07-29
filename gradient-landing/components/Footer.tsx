"use client";

import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 relative z-10 text-neutral-500 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white text-base">Gradient</span>
        </div>

        <p>© 2026 Gradient Inc. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/gradient.ue/?utm_source=ig_web_button_share_sheet" className="hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://github.com/userprivateltd-collab" className="hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
