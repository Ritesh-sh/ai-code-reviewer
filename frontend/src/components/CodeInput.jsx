import React, { useState } from "react";

const LANGUAGES = [
  "python", "javascript", "typescript", "java", "cpp", "c",
  "csharp", "go", "rust", "ruby", "php", "swift", "kotlin",
  "html", "css", "sql", "bash",
];

const TABS = [
  { id: "paste", label: "Paste Code", icon: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
  { id: "upload", label: "Upload File", icon: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" },
  { id: "github", label: "GitHub Repo", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
];

export default function CodeInput({
  code, setCode, language, setLanguage, onSubmit, onFileUpload, onRepoSubmit, loading, repoUrl, setRepoUrl,
}) {
  const [activeTab, setActiveTab] = useState("paste");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileUpload(file);
  };

  return (
    <div className="bg-white rounded-3xl p-0 shadow-soft-lg border border-surface-200 overflow-hidden animate-fade-in-up">
      {/* Tab Bar */}
      <div className="flex border-b border-surface-200 bg-surface-50 p-1.5 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.id ? "tab-active" : "tab-inactive hover:bg-surface-100 hover:text-slate-700"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* ─── PASTE CODE TAB ─── */}
        {activeTab === "paste" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Paste Your Code</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-surface-50 text-slate-700 text-sm rounded-xl px-4 py-2.5 border border-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200 font-medium"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Paste your code here..."
              className="w-full h-72 bg-slate-900 text-emerald-400 font-mono text-sm rounded-2xl p-5 border-2 border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 resize-none transition-all duration-300 shadow-inner"
              spellCheck={false}
            />

            <button
              onClick={onSubmit}
              disabled={loading || !code.trim()}
              className="mt-4 w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-glow-primary hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? <LoadingSpinner text="Reviewing..." /> : "Review Code"}
            </button>
          </div>
        )}

        {/* ─── UPLOAD FILE TAB ─── */}
        {activeTab === "upload" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Upload a File</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-surface-50 text-slate-700 text-sm rounded-xl px-4 py-2.5 border border-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-200 font-medium"
              >
                <option value="auto">Auto Detect</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-surface-300 rounded-2xl cursor-pointer bg-surface-50 hover:bg-primary-50 hover:border-primary-400 transition-all duration-300 group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-all duration-300 group-hover:scale-110">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4272f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 font-semibold">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  .py, .js, .ts, .java, .cpp, .go, .rs and more
                </p>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".py,.js,.jsx,.ts,.tsx,.java,.cpp,.c,.cs,.go,.rs,.rb,.php,.swift,.kt,.html,.css,.sql,.sh,.txt"
              />
            </label>

            {loading && (
              <div className="mt-4 flex justify-center">
                <LoadingSpinner text="Uploading & reviewing..." />
              </div>
            )}
          </div>
        )}

        {/* ─── GITHUB REPO TAB ─── */}
        {activeTab === "github" && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Review a GitHub Repository</h2>
            <p className="text-sm text-slate-500 mb-5">
              Enter a public GitHub repository URL and Gemini will analyze the entire codebase.
            </p>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repository"
                className="w-full pl-12 pr-4 py-4 bg-surface-50 border-2 border-surface-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 font-medium"
              />
            </div>

            <div className="mt-3 flex gap-2 flex-wrap">
              {["https://github.com/expressjs/express", "https://github.com/tiangolo/fastapi"].map((url) => (
                <button
                  key={url}
                  onClick={() => setRepoUrl(url)}
                  className="text-xs bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-all duration-200 font-medium border border-primary-200"
                >
                  {url.split("github.com/")[1]}
                </button>
              ))}
            </div>

            <button
              onClick={onRepoSubmit}
              disabled={loading || !repoUrl.trim()}
              className="mt-5 w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-glow-accent hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? <LoadingSpinner text="Analyzing repository..." /> : "Review Repository"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingSpinner({ text }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {text}
    </span>
  );
}
