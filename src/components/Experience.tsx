import React from 'react';
import { ExperienceItem } from '../types';
import { Briefcase, Calendar, ShieldCheck } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceItem[];
  onSelectCertificate: (imageUrl: string, title: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  experiences,
  onSelectCertificate
}) => {
  return (
    <section id="experience" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-1 sm:gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-xs transform -rotate-1">
          {['E', 'x', 'p', 'e', 'r', 'i', 'e', 'n', 'c', 'e'].map((char, index) => {
            const colors = ['bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-teal-500', 'bg-blue-600', 'bg-purple-600'];
            const bgClass = colors[index % colors.length];
            return (
              <span
                key={index}
                className={`paper-tile inline-flex items-center justify-center w-6 h-7 sm:w-7 sm:h-8 rounded-md border font-display text-xs sm:text-sm font-black text-white ${bgClass}`}
              >
                {char}
              </span>
            );
          })}
        </div>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-black dark:from-slate-700 via-slate-800 to-transparent"></div>
      </div>

      <div className="relative border-l-2 border-dashed border-slate-400 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline pushpin node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-red-500 border-2 border-red-700 shadow-md flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>

            <div className="bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-6 paper-card relative space-y-3 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dashed border-slate-300 dark:border-slate-800">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs font-bold text-slate-800 dark:text-slate-300">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black dark:bg-slate-800 text-white dark:text-slate-200 font-mono-code text-xs font-bold border border-slate-800 dark:border-slate-700 w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-[11px] font-bold border border-slate-300 dark:border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {exp.description}
              </p>

              {exp.certificateUrl && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectCertificate(exp.certificateUrl!, exp.role)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>View Certificate</span>
                  </button>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 text-[11px] font-mono-code font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Verified Certificate Document Available
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

