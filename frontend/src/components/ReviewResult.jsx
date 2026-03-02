import React, { useState } from "react";

function getScoreColor(score) {
  if (score >= 8) return "#10b981";
  if (score >= 6) return "#f59e0b";
  if (score >= 4) return "#f97316";
  return "#ef4444";
}

function getScoreLabel(score) {
  if (score >= 9) return "Excellent";
  if (score >= 7) return "Good";
  if (score >= 5) return "Average";
  if (score >= 3) return "Needs Work";
  return "Critical";
}

function getScoreBg(score) {
  if (score >= 8) return "from-emerald-50 to-green-50 border-emerald-200";
  if (score >= 6) return "from-amber-50 to-yellow-50 border-amber-200";
  if (score >= 4) return "from-orange-50 to-amber-50 border-orange-200";
  return "from-red-50 to-rose-50 border-red-200";
}

function getSeverityBadge(severity) {
  const colors = {
    critical: "bg-red-100 text-red-700 border-red-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-blue-100 text-blue-600 border-blue-200",
  };
  return colors[severity] || colors.low;
}

function ScoreRing({ score }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative w-28 h-28 animate-bounce-in">
      <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.2s ease-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold" style={{ color }}>{score}</span>
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">/10</span>
      </div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="text-xs bg-surface-100 hover:bg-surface-200 text-slate-500 px-3 py-1.5 rounded-lg transition-all duration-200 font-medium border border-surface-200"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function ReviewResult({ review }) {
  if (!review) return null;

  return (
    <div className="space-y-5 mt-8">
      {/* Score Card */}
      <div className={`bg-gradient-to-br ${getScoreBg(review.score)} rounded-3xl p-6 shadow-soft border animate-fade-in-up`}>
        <div className="flex items-center gap-6">
          <ScoreRing score={review.score} />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-extrabold text-slate-800">Code Quality Score</h2>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: getScoreColor(review.score) }}
              >
                {getScoreLabel(review.score)}
              </span>
            </div>
            <p className="text-slate-600 mt-1 leading-relaxed">{review.summary}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs bg-white/60 text-slate-500 px-3 py-1 rounded-full border border-white/80 font-medium">
                {review.language}
              </span>
              <span className="text-xs text-slate-400">
                Review #{review.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up stagger-1">
        <StatChip icon="🐛" label="Bugs" count={review.bugs.length} color="red" />
        <StatChip icon="🔒" label="Security" count={review.security_issues.length} color="orange" />
        <StatChip icon="⚡" label="Performance" count={review.performance.length} color="amber" />
        <StatChip icon="💡" label="Suggestions" count={review.suggestions.length} color="blue" />
      </div>

      {/* Bugs */}
      {review.bugs.length > 0 && (
        <Section title="Bugs Found" icon="🐛" count={review.bugs.length} iconBg="bg-red-100" delay="stagger-2">
          {review.bugs.map((bug, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-surface-200 hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getSeverityBadge(bug.severity)}`}>
                  {bug.severity}
                </span>
                {bug.line && (
                  <span className="text-xs text-slate-400 bg-surface-100 px-2 py-0.5 rounded font-mono">
                    Line {bug.line}
                  </span>
                )}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{bug.issue}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Security Issues */}
      {review.security_issues.length > 0 && (
        <Section title="Security Issues" icon="🔒" count={review.security_issues.length} iconBg="bg-orange-100" delay="stagger-3">
          {review.security_issues.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-surface-200 hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getSeverityBadge(item.severity)}`}>
                  {item.severity}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{item.issue}</p>
              <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <p className="text-emerald-700 text-sm font-medium">
                  💡 {item.recommendation}
                </p>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Performance */}
      {review.performance.length > 0 && (
        <Section title="Performance" icon="⚡" count={review.performance.length} iconBg="bg-amber-100" delay="stagger-4">
          {review.performance.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-surface-200 hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5">
              <p className="text-slate-700 text-sm leading-relaxed">{item.issue}</p>
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-blue-700 text-sm font-medium">→ {item.suggestion}</p>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Suggestions */}
      {review.suggestions.length > 0 && (
        <Section title="Suggestions" icon="💡" count={review.suggestions.length} iconBg="bg-blue-100" delay="stagger-5">
          <ul className="space-y-2">
            {review.suggestions.map((s, i) => (
              <li key={i} className="bg-white rounded-2xl p-4 border border-surface-200 text-slate-700 text-sm leading-relaxed flex items-start gap-3 hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5">
                <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Improved Code */}
      {review.improved_code && (
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-surface-200 animate-fade-in-up stagger-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center text-sm">✨</span>
              Improved Code
            </h3>
            <CopyButton text={review.improved_code} />
          </div>
          <pre className="bg-slate-900 rounded-2xl p-5 overflow-x-auto border border-slate-800">
            <code className="text-emerald-400 text-sm font-mono whitespace-pre leading-relaxed">
              {review.improved_code}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}

function StatChip({ icon, label, count, color }) {
  const colorMap = {
    red: "bg-red-50 border-red-200 text-red-600",
    orange: "bg-orange-50 border-orange-200 text-orange-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600",
    blue: "bg-blue-50 border-blue-200 text-blue-600",
  };
  return (
    <div className={`${colorMap[color]} border rounded-2xl p-3 text-center transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5`}>
      <div className="text-lg">{icon}</div>
      <div className="text-2xl font-extrabold mt-1">{count}</div>
      <div className="text-xs font-semibold opacity-70">{label}</div>
    </div>
  );
}

function Section({ title, icon, count, iconBg, delay, children }) {
  return (
    <div className={`bg-surface-50 rounded-3xl p-6 shadow-soft border border-surface-200 animate-fade-in-up ${delay}`}>
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3">
        <span className={`w-8 h-8 ${iconBg} rounded-xl flex items-center justify-center text-sm`}>
          {icon}
        </span>
        {title}
        <span className="bg-white text-slate-600 text-xs px-2.5 py-0.5 rounded-full border border-surface-300 font-semibold">
          {count}
        </span>
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
