import React from 'react';
import { AchievementItem } from '../types';
import { Award } from 'lucide-react';

interface AchievementsProps {
  achievements: AchievementItem[];
}

export const Achievements: React.FC<AchievementsProps> = ({
  achievements
}) => {
  return (
    <section id="achievements" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1 sm:gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-xs transform rotate-1">
          {['A', 'c', 'h', 'i', 'e', 'v', 'e', 'm', 'e', 'n', 't', 's'].map((char, index) => {
            const colors = ['bg-amber-500', 'bg-rose-500', 'bg-emerald-500', 'bg-blue-600', 'bg-orange-500', 'bg-purple-600', 'bg-teal-500', 'bg-indigo-600'];
            const bgClass = colors[index % colors.length];
            return (
              <span
                key={index}
                className={`paper-tile inline-flex items-center justify-center w-5 h-6 sm:w-6 sm:h-7 rounded-md border font-display text-[10px] sm:text-xs font-black text-white ${bgClass}`}
              >
                {char}
              </span>
            );
          })}
        </div>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-black dark:from-slate-700 via-slate-800 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-5 paper-card relative flex flex-col sm:flex-row gap-5 items-center transition-all duration-300"
          >
            {/* Paper tape top right */}
            <div className="paper-tape top-2 right-4 transform -rotate-3"></div>

            {/* Thumbnail Polaroid Frame */}
            {item.imageUrl && (
              <div
                className="w-full sm:w-44 h-36 bg-white dark:bg-slate-950 p-2.5 rounded-2xl border-2 border-slate-300 dark:border-slate-800 shadow-xs shrink-0"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}

            {/* Info details */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-slate-900 dark:text-slate-200">
                <Award className="w-4 h-4 text-slate-800 dark:text-slate-300" />
                <span>{item.date}</span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-slate-700 dark:text-slate-300">{item.issuer}</span>
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>

              <p className="text-xs font-bold text-white dark:text-slate-200 bg-black dark:bg-slate-800 px-2.5 py-0.5 rounded-md inline-block border border-slate-800 dark:border-slate-700">
                {item.subtitle}
              </p>

              {item.description && (
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

