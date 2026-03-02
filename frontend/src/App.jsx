import React, { useState } from "react";
import Header from "./components/Header";
import CodeInput from "./components/CodeInput";
import ReviewResult from "./components/ReviewResult";
import { submitReview, uploadFileForReview, reviewGithubRepo } from "./api/reviewApi";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [repoUrl, setRepoUrl] = useState("");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    setReview(null);

    try {
      const result = await submitReview(code, language);
      setReview(result);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Failed to get review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError("");
    setReview(null);

    try {
      const reader = new FileReader();
      reader.onload = (e) => setCode(e.target.result);
      reader.readAsText(file);

      const result = await uploadFileForReview(file, language);
      setReview(result);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to upload and review file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRepoSubmit = async () => {
    if (!repoUrl.trim()) return;
    setLoading(true);
    setError("");
    setReview(null);

    try {
      const result = await reviewGithubRepo(repoUrl);
      setReview(result);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to review repository. Make sure the URL is a valid public GitHub repo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
          Review your code with{" "}
          <span className="gradient-text">AI precision</span>
        </h2>
        <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
          Paste code, upload files, or analyze entire GitHub repositories. Powered by Google Gemini.
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-12">
        {/* Code Input Section */}
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onSubmit={handleSubmit}
          onFileUpload={handleFileUpload}
          onRepoSubmit={handleRepoSubmit}
          loading={loading}
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
        />

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm font-medium animate-fade-in-up flex items-start gap-3">
            <span className="text-red-400 text-lg">⚠️</span>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-10 flex flex-col items-center gap-5 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-accent-400 rounded-full animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }}></div>
            </div>
            <div className="text-center">
              <p className="text-slate-700 font-semibold">Gemini AI is analyzing...</p>
              <p className="text-slate-400 text-sm mt-1">This may take a few seconds</p>
            </div>
          </div>
        )}

        {/* Review Result */}
        <ReviewResult review={review} />
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-200 mt-8 py-8 text-center bg-white/50">
        <p className="text-slate-400 text-sm font-medium">
          AI Code Reviewer &middot; Powered by{" "}
          <span className="gradient-text font-semibold">Gemini API</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
