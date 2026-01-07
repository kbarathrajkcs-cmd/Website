
import React, { useState, useMemo } from 'react';
import { AnalysisResult, PasswordStrength, StrengthCriteria } from './types';
import { PYTHON_CODE_SNIPPET, SECURITY_WHY } from './constants';
import StrengthMeter from './components/StrengthMeter';
import TutorChat from './components/TutorChat';

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo((): AnalysisResult => {
    const criteria: StrengthCriteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const feedback: string[] = [];
    if (!criteria.length) feedback.push("Use at least 8 characters.");
    if (!criteria.uppercase) feedback.push("Add an uppercase letter.");
    if (!criteria.lowercase) feedback.push("Add a lowercase letter.");
    if (!criteria.number) feedback.push("Add a number.");
    if (!criteria.special) feedback.push("Include a special character (!@#$).");

    const score = Object.values(criteria).filter(Boolean).length;
    let strength: PasswordStrength = 'Weak';
    if (score >= 5) strength = 'Strong';
    else if (score >= 3) strength = 'Medium';

    return { score, strength, criteria, feedback };
  }, [password]);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
          Cybersecurity Educational Project
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          SecurePass Tutor
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Learn how to build a password strength checker in Python and master the fundamentals of credential security.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Checker */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              Test Your Logic
            </h2>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type a password..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition-all"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <StrengthMeter strength={analysis.strength} score={analysis.score} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {Object.entries(analysis.criteria).map(([key, met]) => (
                  <div key={key} className={`flex items-center gap-2 text-sm p-3 rounded-lg border ${
                    met ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-slate-800/50 border-slate-700 text-slate-500'
                  }`}>
                    {met ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                    )}
                    <span className="capitalize">{key === 'special' ? 'Special Character' : key}</span>
                  </div>
                ))}
              </div>

              {analysis.feedback.length > 0 && analysis.strength !== 'Strong' && (
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                  <h4 className="text-blue-400 font-semibold mb-2 text-sm">Improvement Tips:</h4>
                  <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                    {analysis.feedback.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-200">Why Strength Matters?</h2>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
              {SECURITY_WHY}
            </p>
          </section>
        </div>

        {/* Right Column: Code & Tutor */}
        <div className="lg:col-span-7 space-y-8">
          {/* Code Viewer */}
          <section className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-slate-400 text-xs font-mono ml-4">password_checker.py</span>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(PYTHON_CODE_SNIPPET)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Code
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="mono text-sm leading-relaxed text-blue-300">
                {PYTHON_CODE_SNIPPET}
              </pre>
            </div>
            <div className="p-4 bg-slate-900/50 border-t border-slate-800">
              <p className="text-xs text-slate-500 italic">
                Pro Tip: This code uses the "re" (Regular Expressions) library, a standard way in Python to find patterns in text.
              </p>
            </div>
          </section>

          {/* AI Tutor Chat */}
          <TutorChat />
        </div>
      </div>

      <footer className="mt-20 py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© 2024 SecurePass Tutor. Built for educational purposes. Stay safe online.</p>
      </footer>
    </div>
  );
};

export default App;
