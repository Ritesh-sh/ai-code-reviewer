import React from "react";

const LANGUAGES = [
  "python", "javascript", "typescript", "java", "cpp", "c",
  "csharp", "go", "rust", "ruby", "php", "swift", "kotlin",
  "html", "css", "sql", "bash",
];

export default function CodeInput({
  code, setCode, language, setLanguage, onSubmit, onFileUpload, loading,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Paste Your Code</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Code textarea */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full h-72 bg-slate-900 text-green-400 font-mono text-sm rounded-xl p-4 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        spellCheck={false}
      />

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onSubmit}
          disabled={loading || !code.trim()}
          className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/25"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Reviewing...
            </span>
          ) : (
            "Review Code"
          )}
        </button>

        <label className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-5 rounded-xl cursor-pointer transition-all duration-200 border border-slate-600 text-center">
          Upload File
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".py,.js,.ts,.java,.cpp,.c,.cs,.go,.rs,.rb,.php,.swift,.kt,.html,.css,.sql,.sh,.txt"
          />
        </label>
      </div>
    </div>
  );
}
