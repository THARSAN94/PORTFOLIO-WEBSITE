import React from 'react';
import { Sparkles, Target, Compass } from 'lucide-react';

interface AboutProps {
  summary: string;
}

export const About: React.FC<AboutProps> = ({ summary }) => {
  return (
    <section id="about" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Main Paper Card with Torn Sawtooth Edges and Pushpin */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-6 sm:p-10 paper-card-lg torn-edge-horizontal relative overflow-hidden">
        
        {/* Pushpin at top center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-orange-600 border-2 border-orange-800 shadow-md z-10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
        </div>

        {/* Professional Summary Tag */}
        <div className="inline-block mb-3 px-3.5 py-1 rounded-md bg-amber-100/90 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 text-[11px] font-mono-code font-bold text-slate-800 dark:text-slate-300 shadow-xs">
          Professional Summary
        </div>

        {/* Cutout paper section title tiles: A B O U T  M E */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-5">
          {['A', 'b', 'o', 'u', 't', ' ', 'M', 'e'].map((char, index) => {
            if (char === ' ') return <span key={index} className="w-2 sm:w-3"></span>;
            const colors = ['bg-rose-500', 'bg-orange-500', 'bg-blue-600', 'bg-emerald-500', 'bg-teal-500', 'bg-purple-600', 'bg-amber-500'];
            const bgClass = colors[index % colors.length];
            return (
              <span
                key={index}
                className={`paper-tile inline-flex items-center justify-center w-7 h-8 sm:w-9 sm:h-10 rounded-md border-2 border-slate-900 font-display text-base sm:text-xl font-black text-white ${bgClass}`}
              >
                {char.toUpperCase()}
              </span>
            );
          })}
        </div>

        <div className="space-y-4">
          <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-serif italic pt-1 relative pb-4">
            {summary}
            {/* Orange underline accent */}
            <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-amber-400 to-transparent rounded-full opacity-70"></span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-dashed border-slate-300 dark:border-slate-800">
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-xs">
              <Sparkles className="w-5 h-5 text-slate-800 dark:text-slate-300 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">AI & DS Focus</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Data Science, GenAI & Predictive AI</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-xs">
              <Target className="w-5 h-5 text-slate-800 dark:text-slate-300 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Technical Skills</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Java, Python, MongoDB, MySQL, AWS</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-xs">
              <Compass className="w-5 h-5 text-slate-800 dark:text-slate-300 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Problem Solver</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">150+ LeetCode problems solved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

