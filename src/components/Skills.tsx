import React from 'react';
import { SkillCategory } from '../types';
import { Terminal, Cpu, Database, Wrench, Users } from 'lucide-react';

interface SkillsProps {
  skills: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'programming':
        return Terminal;
      case 'frameworks':
        return Cpu;
      case 'tools':
        return Wrench;
      case 'databases & cloud':
      case 'databases':
        return Database;
      default:
        return Users;
    }
  };

  return (
    <section id="skills" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-1 sm:gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-xs transform -rotate-1">
          {['S', 'k', 'i', 'l', 'l', 's'].map((char, index) => {
            const colors = ['bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-blue-600', 'bg-purple-600'];
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.category);
          const paperCardStyles = [
            'bg-[#fef9c3] dark:bg-amber-950/40 border-amber-300 dark:border-amber-800', // Yellow post-it
            'bg-[#faf7f0] dark:bg-slate-900 border-slate-300 dark:border-slate-800', // Cream paper
            'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800', // Light blue paper
            'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800', // Light green
            'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800', // Light pink
          ];
          const cardBg = paperCardStyles[idx % paperCardStyles.length];

          const badgeStyles = [
            'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 shadow-xs',
            'bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 border-slate-700 dark:border-slate-700',
            'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
            'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800',
            'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800',
          ];
          const badgeStyle = badgeStyles[idx % badgeStyles.length];

          return (
            <div
              key={cat.category}
              className={`${cardBg} border-2 rounded-3xl p-5 relative paper-card flex flex-col justify-between transform ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:rotate-0 transition-transform duration-200`}
            >
              {/* Paperclip / Pin decoration */}
              <div className="absolute -top-3 left-6 w-3 h-7 border-2 border-slate-500 rounded-full bg-slate-200 dark:bg-slate-700 shadow-xs z-10"></div>

              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-slate-400/50 dark:border-slate-800">
                  <div className="p-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 border border-slate-800 dark:border-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">
                    {cat.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border hover:scale-105 transition-transform ${badgeStyle}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
