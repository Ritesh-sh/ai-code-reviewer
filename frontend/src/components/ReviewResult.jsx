import React from "react";

function getScoreColor(score) {
  if (score >= 8) return "text-green-400";
  if (score >= 6) return "text-yellow-400";
  if (score >= 4) return "text-orange-400";
  return "text-red-400";
}

function getScoreRingColor(score) {
  if (score >= 8) return "border-green-400";
  if (score >= 6) return "border-yellow-400";
  if (score >= 4) return "border-orange-400";
  return "border-red-400";
}

function getSeverityBadge(severity) {
  const colors = {
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };
  return colors[severity] || colors.low;
}

export default function ReviewResult({ review }) {
  if (!review) return null;

  return (
    <div className="space-y-6 mt-8">
      {/* Score Card */}
      <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
        <div className="flex items-center gap-6">
          <div
            className={`w-24 h-24 rounded-full border-4 ${getScoreRingColor(
              review.score
            )} flex items-center justify-center`}
          >
            <span className={`text-3xl font-bold ${getScoreColor(review.score)}`}>
              {review.score}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Code Quality Score</h2>
            <p className="text-slate-400 mt-1">{review.summary}</p>
            <p className="text-slate-500 text-sm mt-1">
              Language: {review.language} &middot; Review #{review.id}
            </p>
          </div>
        </div>
      </div>

      {/* Bugs */}
      {review.bugs.length > 0 && (
        <Section title="Bugs" icon="🐛" count={review.bugs.length}>
          {review.bugs.map((bug, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-xl p-4 border border-slate-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityBadge(
                    bug.severity
                  )}`}
                >
                  {bug.severity}
                </span>
                {bug.line && (
                  <span className="text-xs text-slate-500">Line {bug.line}</span>
                )}
              </div>
              <p className="text-slate-300 text-sm">{bug.issue}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Security Issues */}
      {review.security_issues.length > 0 && (
        <Section title="Security Issues" icon="🔒" count={review.security_issues.length}>
          {review.security_issues.map((item, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-xl p-4 border border-slate-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityBadge(
                    item.severity
                  )}`}
                >
                  {item.severity}
                </span>
              </div>
              <p className="text-slate-300 text-sm">{item.issue}</p>
              <p className="text-green-400 text-sm mt-2">
                💡 {item.recommendation}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* Performance */}
      {review.performance.length > 0 && (
        <Section title="Performance" icon="⚡" count={review.performance.length}>
          {review.performance.map((item, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-xl p-4 border border-slate-700"
            >
              <p className="text-slate-300 text-sm">{item.issue}</p>
              <p className="text-blue-400 text-sm mt-2">
                → {item.suggestion}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* Suggestions */}
      {review.suggestions.length > 0 && (
        <Section title="Suggestions" icon="💡" count={review.suggestions.length}>
          <ul className="space-y-2">
            {review.suggestions.map((s, i) => (
              <li
                key={i}
                className="bg-slate-900 rounded-xl p-4 border border-slate-700 text-slate-300 text-sm flex items-start gap-2"
              >
                <span className="text-primary-400 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Improved Code */}
      {review.improved_code && (
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            ✨ Improved Code
          </h3>
          <pre className="bg-slate-900 rounded-xl p-4 border border-slate-700 overflow-x-auto">
            <code className="text-green-400 text-sm font-mono whitespace-pre">
              {review.improved_code}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}

function Section({ title, icon, count, children }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>{icon}</span>
        {title}
        <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
          {count}
        </span>
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
