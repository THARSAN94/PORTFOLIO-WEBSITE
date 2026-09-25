import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { Github, ExternalLink, Search, Sparkles } from 'lucide-react';

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery.trim()) return true;
    return (
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <section id="projects" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 sm:gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-xs transform rotate-1">
            {['P', 'r', 'o', 'j', 'e', 'c', 't', 's'].map((char, index) => {
              const colors = ['bg-orange-500', 'bg-teal-500', 'bg-blue-600', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-indigo-600', 'bg-purple-600'];
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
          <div className="hidden sm:block h-0.5 w-24 bg-gradient-to-r from-black dark:from-slate-700 to-transparent"></div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-700 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-black shadow-xs"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl overflow-hidden paper-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header image if exists */}
              {proj.image && (
                <div className="h-44 w-full overflow-hidden relative border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/90 dark:bg-slate-900/90 text-white dark:text-slate-200 text-[10px] font-mono-code font-bold flex items-center gap-1 border border-slate-800 dark:border-slate-700 shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Featured Project</span>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                      {proj.title}
                    </h3>
                  </div>

                  {proj.subtitle && (
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-300 my-1 font-mono-code">
                      {proj.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
                    {proj.description}
                  </p>
                </div>

                {/* Tag badges */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-lg bg-black dark:bg-slate-800 text-white dark:text-slate-200 text-[11px] font-bold border border-slate-800 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-3 border-t border-dashed border-slate-300 dark:border-slate-800">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-bold transition-all shadow-xs"
                      >
                        <Github className="w-4 h-4 text-slate-900 dark:text-slate-100" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
                      >
                        <ExternalLink className="w-4 h-4 text-amber-400" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-[#faf7f0] dark:bg-slate-900 rounded-3xl border-2 border-dashed border-amber-200 dark:border-slate-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono-code">No projects matching your search query.</p>
        </div>
      )}
    </section>
  );
};

