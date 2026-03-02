import React, { useState } from "react";
import Header from "./components/Header";
import CodeInput from "./components/CodeInput";
import ReviewResult from "./components/ReviewResult";
import { submitReview, uploadFileForReview } from "./api/reviewApi";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
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
      // Read file contents into textarea
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

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Code Input Section */}
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onSubmit={handleSubmit}
          onFileUpload={handleFileUpload}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400">
              Gemini AI is reviewing your code...
            </p>
          </div>
        )}

        {/* Review Result */}
        <ReviewResult review={review} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-6 text-center text-slate-500 text-sm">
        AI Code Reviewer &middot; Powered by Gemini API
      </footer>
    </div>
  );
}

export default App;
