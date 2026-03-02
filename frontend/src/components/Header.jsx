import React from "react";

export default function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Code Reviewer</h1>
            <p className="text-xs text-slate-400">Powered by Gemini AI</p>
          </div>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-white transition-colors text-sm"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
