import React from 'react';
import { CertificationItem } from '../types';
import { Award, ShieldCheck, ExternalLink, Paperclip } from 'lucide-react';

interface CertificationsProps {
  certifications: CertificationItem[];
  onSelectCertificate: (imageUrl: string, title: string) => void;
}

export const Certifications: React.FC<CertificationsProps> = ({
  certifications,
  onSelectCertificate
}) => {
  return (
    <section id="certifications" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1 sm:gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-xs transform -rotate-1">
          {['C', 'e', 'r', 't', 'i', 'f', 'i', 'c', 'a', 't', 'i', 'o', 'n', 's'].map((char, index) => {
            const colors = ['bg-emerald-500', 'bg-blue-600', 'bg-amber-500', 'bg-rose-500', 'bg-orange-500', 'bg-indigo-600', 'bg-purple-600', 'bg-teal-500'];
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
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-5 paper-card relative flex flex-col justify-between"
          >
            {/* Paper clip decoration */}
            <div className="absolute -top-3 left-6 text-slate-800 dark:text-slate-300">
              <Paperclip className="w-5 h-5 transform rotate-12" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code font-bold text-slate-900 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-slate-800 dark:text-slate-300" />
                  {cert.issuer}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-black dark:bg-slate-800 text-white dark:text-slate-200 border border-slate-800 dark:border-slate-700">
                  {cert.date}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                {cert.title}
              </h3>

              {cert.credentialId && (
                <p className="text-[11px] font-mono-code text-slate-700 dark:text-slate-400">
                  Credential ID: {cert.credentialId}
                </p>
              )}
            </div>

            <div className="pt-4 mt-3 border-t border-dashed border-slate-300 dark:border-slate-800 flex items-center gap-3">
              {cert.imageUrl && (
                <button
                  onClick={() => onSelectCertificate(cert.imageUrl!, cert.title)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-300 dark:border-slate-700 shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-800 dark:text-slate-300" />
                  <span>Preview Document</span>
                </button>
              )}

              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verify</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

