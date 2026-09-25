import React from 'react';
import { Profile } from '../types';
import { Download, Mail, Phone, Linkedin, Github, MapPin, Crop, GraduationCap, Briefcase, Building2, FileText } from 'lucide-react';

interface HeroProps {
  profile: Profile;
  onOpenResume: () => void;
  onOpenCropPhoto: (imageSrc?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume, onOpenCropPhoto }) => {
  const zoom = profile.avatarZoom ?? 100;
  const offsetX = profile.avatarOffsetX ?? 0;
  const offsetY = profile.avatarOffsetY ?? 0;

  return (
    <section id="hero" className="pt-20 sm:pt-24 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* LEFT PROFILE POLAROID CARD (4 cols on desktop) */}
        <div className="md:col-span-4 bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-3.5 paper-card-lg relative flex flex-col items-center text-center transform -rotate-1 hover:rotate-0 transition-all duration-300">
          
          {/* Orange Bookmark Tag at Top of Polaroid */}
          <div className="absolute -top-3 left-6 z-20 bg-orange-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-sm shadow-sm flex items-center gap-1 transform -rotate-2">
            <span>📍 {profile.name}</span>
          </div>

          {/* Polaroid Frame */}
          <div className="relative mt-2 mb-2 w-full max-w-[200px] bg-white dark:bg-slate-950 p-2 pb-2.5 rounded-xl border border-slate-300 dark:border-slate-800 shadow-md flex flex-col items-center">
            <div className="relative w-full aspect-4/5 group overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900">
              <img
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"}
                alt={profile.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800";
                }}
                style={{
                  transform: `scale(${zoom / 100}) translate(${offsetX}%, ${offsetY}%)`,
                  transformOrigin: 'top center',
                }}
                className="w-full h-full object-cover object-top transition-transform duration-150"
              />
              {/* Subtle hover trigger for crop/adjust */}
              <button
                type="button"
                onClick={() => onOpenCropPhoto()}
                title="Crop & Adjust Photo"
                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md flex items-center gap-1 text-[10px] font-bold"
              >
                <Crop className="w-3 h-3" />
                <span>Adjust</span>
              </button>
            </div>
            
            <div className="pt-2 text-center font-handwriting text-slate-800 dark:text-slate-200 font-extrabold text-sm tracking-wide">
              {profile.subtitle || "AI & Data Science Engineer"}
            </div>
          </div>

          {/* Quote Note Card Below Polaroid */}
          <div className="mt-0.5 w-full max-w-[210px] bg-white/90 dark:bg-slate-800/80 p-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 shadow-2xs rotate-1 text-center">
            <p className="text-xs text-slate-700 dark:text-slate-300 font-handwriting font-bold leading-snug">
              "{profile.tagline || "Building intelligent AI solutions with paper-cut precision."}"
            </p>
          </div>
        </div>

        {/* CENTER MAIN BANNER CARD (5 cols on desktop) */}
        <div className="md:col-span-5 bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-4 sm:p-5 paper-card-lg torn-edge-horizontal flex flex-col justify-between relative overflow-hidden">
          
          {/* Floating Blue Tag at top right matching reference screenshot */}
          <div className="absolute top-3 right-4 bg-[#4b72e6] text-white text-[11px] font-bold px-3 py-0.5 rounded-xs shadow-xs transform rotate-2 flex items-center gap-1">
            <span>/ About Me</span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Cutout Letter Name Header */}
            <div className="py-3 px-2 bg-white/90 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-inner flex flex-col justify-center gap-1.5 items-center min-h-[80px]">
              {profile.name.trim().split(/\s+/).map((word, wordIndex) => {
                const colors = [
                  'bg-black text-white border-slate-900',
                  'bg-sky-500 text-white border-sky-600',
                  'bg-amber-400 text-slate-950 border-amber-500',
                  'bg-rose-500 text-white border-rose-600',
                  'bg-orange-500 text-white border-orange-600',
                  'bg-blue-600 text-white border-blue-700',
                  'bg-red-500 text-white border-red-600',
                  'bg-indigo-600 text-white border-indigo-700',
                ];
                const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2'];

                return (
                  <div key={wordIndex} className="flex flex-nowrap items-center justify-center gap-1">
                    {word.split('').map((char, charIndex) => {
                      const globalIndex = wordIndex * 10 + charIndex;
                      const styleClass = colors[globalIndex % colors.length];
                      const rotation = rotations[globalIndex % rotations.length];

                      return (
                        <span
                          key={charIndex}
                          className={`paper-tile inline-flex items-center justify-center w-6 h-7 sm:w-7 sm:h-8 rounded-md border-2 font-display text-xs sm:text-sm font-black transform ${rotation} cursor-default ${styleClass}`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-0.5">
              <h2 className="text-xs sm:text-sm font-mono-code font-bold text-orange-600 dark:text-orange-400 tracking-wide">
                {profile.title || "AI & Data Science Engineer"}
              </h2>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={onOpenResume}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d2b4f] hover:bg-[#141f3b] text-white text-xs font-bold transition-all shadow-md active:scale-98"
            >
              <FileText className="w-3.5 h-3.5 text-white" />
              <span>Resume (THARSAN_RESUME_1.pdf)</span>
            </button>
            <a
              href={profile.resumeUrl || "/THARSAN_RESUME_1.pdf"}
              download="THARSAN_RESUME_1.pdf"
              title="Quick Download THARSAN_RESUME_1.pdf"
              className="flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-md active:scale-98"
            >
              <Download className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* RIGHT QUICK DETAILS CARD (3 cols on desktop) */}
        <div className="md:col-span-3 bg-[#fffef7] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-4 sm:p-5 paper-card notebook-ruled flex flex-col justify-between relative transform rotate-1 hover:rotate-0 transition-all duration-300">
          
          {/* Binder Holes on left matching notebook spiral perforations */}
          <div className="absolute left-1.5 top-12 bottom-12 flex flex-col justify-around z-10">
            {[1, 2, 3, 4, 5].map((h) => (
              <div key={h} className="w-2 h-3.5 rounded-xs bg-slate-800 dark:bg-slate-950 border border-slate-600 shadow-inner"></div>
            ))}
          </div>

          {/* Red Pushpin at top right */}
          <div className="absolute -top-2 right-4 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-red-700 shadow-md z-10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white/80"></div>
          </div>

          <div className="pl-3.5 flex-1 flex flex-col justify-start">
            <div className="pb-2 mb-3 border-b border-dashed border-slate-300 dark:border-slate-800">
              <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100">
                Quick Details
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs flex-1 flex flex-col justify-between">
              <li className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Phone className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                <span className="font-mono-code font-bold text-xs text-slate-800 dark:text-slate-200">{profile.quickDetails.phone}</span>
              </li>

              <li className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Mail className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                <a
                  href={`mailto:${profile.quickDetails.email}`}
                  className="font-mono-code font-semibold text-[11px] truncate hover:underline text-slate-800 dark:text-slate-200"
                  title={profile.quickDetails.email}
                >
                  {profile.quickDetails.email}
                </a>
              </li>

              <li className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Linkedin className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                <a
                  href={profile.quickDetails.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-xs hover:underline text-slate-800 dark:text-slate-200"
                >
                  LinkedIn Profile
                </a>
              </li>

              <li className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Github className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                <a
                  href={profile.quickDetails.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-xs hover:underline text-slate-800 dark:text-slate-200"
                >
                  GitHub Profile
                </a>
              </li>

              <li className="flex items-center gap-2 text-slate-800 dark:text-slate-200 pt-1.5 border-t border-dashed border-slate-300 dark:border-slate-800">
                <GraduationCap className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                <span className="text-xs truncate"><strong className="font-bold text-slate-900 dark:text-slate-100">Degree:</strong> B.Tech – AI & DS</span>
              </li>

              <li className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Building2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                <span className="text-xs truncate"><strong className="font-bold text-slate-900 dark:text-slate-100">College:</strong> V.S.B. Engg College</span>
              </li>

              <li className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Briefcase className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                <span className="text-xs truncate"><strong className="font-bold text-slate-900 dark:text-slate-100">Status:</strong> Open to Internships</span>
              </li>

              {profile.quickDetails.location && (
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 pt-1.5 border-t border-dashed border-slate-300 dark:border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                  <span className="font-medium text-xs truncate text-slate-700 dark:text-slate-300">{profile.quickDetails.location}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="mt-3 pt-2 pl-3.5 border-t border-slate-300 dark:border-slate-800 text-center">
            <span className="inline-block text-[10px] font-mono-code font-bold text-white dark:text-slate-200 bg-black dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-800 dark:border-slate-700">
              Placement Seeking
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};


