import React from 'react';
import { EducationItem } from '../types';
import { GraduationCap, Paperclip } from 'lucide-react';

interface EducationProps {
  education: EducationItem[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section id="education" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-1 sm:gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-xs transform rotate-1">
          {['E', 'd', 'u', 'c', 'a', 't', 'i', 'o', 'n'].map((char, index) => {
            const colors = ['bg-blue-600', 'bg-amber-500', 'bg-teal-500', 'bg-rose-500', 'bg-indigo-600', 'bg-emerald-500', 'bg-orange-500', 'bg-purple-600', 'bg-sky-500'];
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((item) => (
          <div
            key={item.id}
            className="bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-6 paper-card relative flex flex-col justify-between transform hover:-translate-y-1 transition-all"
          >
            {/* Paperclip accent */}
            <div className="absolute -top-3 left-6 text-slate-800 dark:text-slate-300">
              <Paperclip className="w-5 h-5 transform -rotate-45" />
            </div>

            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-300">
                  <GraduationCap className="w-5 h-5 shrink-0" />
                  <span className="font-mono-code text-xs font-bold text-slate-900 dark:text-slate-200">
                    {item.period}
                  </span>
                </div>
                {item.grade && (
                  <span className="px-3 py-1 rounded-lg bg-black dark:bg-slate-800 text-white dark:text-slate-200 text-xs font-bold border border-slate-800 dark:border-slate-700">
                    {item.grade}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                {item.degree}
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 font-medium">
                {item.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
