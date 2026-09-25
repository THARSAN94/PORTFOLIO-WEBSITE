import React, { useState, useRef } from 'react';
import { PortfolioData } from '../types';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  Code2,
  ExternalLink,
  Upload,
  FileText,
  Eye,
  CheckCircle2,
  Award,
  Sparkles,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateResume?: (newResumeUrl: string, fileName?: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateResume,
}) => {
  if (!isOpen) return null;

  const [viewMode, setViewMode] = useState<'document' | 'pdf'>('document');
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { profile, education, skills, experiences, projects, certifications, achievements } = data;
  const resumeUrl = profile.resumeUrl || '/THARSAN_RESUME_1.pdf';
  const resumeFileName = 'THARSAN_RESUME_1.pdf';

  const handlePrint = () => {
    window.print();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF resume file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (onUpdateResume) {
        onUpdateResume(dataUrl, file.name);
      }
      setUploadSuccess(`Updated resume: ${file.name}`);
      setTimeout(() => setUploadSuccess(null), 5000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto print:p-0 print:bg-white print:static print:overflow-visible">
      <div
        className="bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-3xl max-w-5xl w-full relative shadow-2xl my-4 sm:my-8 max-h-[92vh] flex flex-col justify-between overflow-hidden print:border-none print:shadow-none print:max-w-none print:max-h-none print:my-0 print:rounded-none print:bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6 sm:py-3.5 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-mono font-bold text-xs rounded-lg shadow-2xs">
              <FileText className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>{resumeFileName}</span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('document')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'document'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Resume View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'pdf'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>PDF Preview</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Hidden File Input for Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,application/pdf"
              className="hidden"
            />

            {/* Upload / Replace button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload an updated resume PDF"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all border border-slate-300 dark:border-slate-700"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload New PDF</span>
            </button>

            {/* Direct Download Button */}
            <a
              href={resumeUrl}
              download={resumeFileName}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Open in New Tab */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              title="Open PDF in new tab"
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-all border border-slate-200 dark:border-slate-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              title="Print or Save as PDF"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Print</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload Success Alert */}
        {uploadSuccess && (
          <div className="bg-emerald-50 dark:bg-emerald-950/80 border-b border-emerald-200 dark:border-emerald-800 px-6 py-2 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              {uploadSuccess}
            </span>
            <button
              type="button"
              onClick={() => setUploadSuccess(null)}
              className="hover:opacity-75 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-200/50 dark:bg-slate-950/50 flex justify-center print:p-0 print:bg-white print:overflow-visible">
          {viewMode === 'pdf' ? (
            /* Native PDF Viewer Mode */
            <div className="w-full h-[70vh] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md flex flex-col">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs px-4">
                <span className="font-mono text-slate-600 dark:text-slate-400">
                  Embedded PDF: {resumeFileName}
                </span>
                <a
                  href={resumeUrl}
                  download={resumeFileName}
                  className="text-orange-600 dark:text-orange-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Download file
                </a>
              </div>
              <iframe
                src={`${resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                title="THARSAN_RESUME_1.pdf Preview"
                className="w-full flex-1 border-0"
              />
            </div>
          ) : (
            /* Formatted High-Fidelity Resume Document (A4 Printable Canvas) */
            <div className="bg-white text-slate-900 rounded-2xl shadow-xl max-w-[850px] w-full p-8 sm:p-12 border border-slate-300 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none print:text-black">
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-[#182b49]">
                    {profile.name}
                  </h1>
                  <span className="font-mono text-xs sm:text-sm font-bold text-orange-700 tracking-wider uppercase">
                    {profile.title}
                  </span>
                </div>

                {/* Contact row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 font-mono mt-3">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    {profile.quickDetails.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-orange-600" />
                    <a href={`mailto:${profile.quickDetails.email}`} className="hover:underline">
                      {profile.quickDetails.email}
                    </a>
                  </span>
                  {profile.quickDetails.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-600" />
                      {profile.quickDetails.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Linkedin className="w-3.5 h-3.5 text-orange-600" />
                    <a
                      href={profile.quickDetails.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {profile.quickDetails.linkedin}
                    </a>
                  </span>
                  <span className="flex items-center gap-1">
                    <Github className="w-3.5 h-3.5 text-orange-600" />
                    <a
                      href={profile.quickDetails.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {profile.quickDetails.github}
                    </a>
                  </span>
                </div>
              </div>

              {/* Body Sections */}
              <div className="py-6 space-y-6 text-xs text-slate-800 leading-relaxed">
                {/* 1. Summary */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#182b49] font-mono border-b border-orange-500 pb-1 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    Professional Summary
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    {profile.summary}
                  </p>
                </section>

                {/* 2. Education */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#182b49] font-mono border-b border-orange-500 pb-1 mb-3 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                    Education
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">{edu.degree}</h3>
                          <p className="text-slate-600">{edu.institution}</p>
                        </div>
                        <div className="text-right font-mono text-xs">
                          <p className="text-slate-600">{edu.period}</p>
                          {edu.grade && (
                            <p className="font-bold text-orange-700">{edu.grade}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Technical Skills */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#182b49] font-mono border-b border-orange-500 pb-1 mb-2.5 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-orange-600" />
                    Technical Skills
                  </h2>
                  <div className="space-y-1.5">
                    {skills.map((cat) => (
                      <div key={cat.category} className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-900 min-w-[170px] shrink-0 font-mono text-[11.5px]">
                          • {cat.category}:
                        </span>
                        <span className="text-slate-700">
                          {cat.skills.join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. Experience & Internships */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#182b49] font-mono border-b border-orange-500 pb-1 mb-3 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-orange-600" />
                    Internships & Experience
                  </h2>
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-sm text-slate-900">
                            {exp.role}{' '}
                            <span className="font-medium text-orange-700">
                              | {exp.company}
                            </span>
                          </h3>
                          <span className="font-mono text-xs text-slate-500">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-justify">
                          {exp.description}
                        </p>
                        {exp.tags && exp.tags.length > 0 && (
                          <p className="font-mono text-[10px] text-slate-500 pt-0.5">
                            Key Focus: {exp.tags.join(' • ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Projects */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#182b49] font-mono border-b border-orange-500 pb-1 mb-3 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-orange-600" />
                    Key Projects
                  </h2>
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3 rounded-lg border border-slate-200 bg-slate-50/70"
                      >
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-sm text-slate-900">
                            {proj.title}
                          </h3>
                          <span className="font-mono text-[10.5px] text-orange-700 font-semibold">
                            Tech: {proj.tags.join(', ')}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {proj.description}
                        </p>
                        {proj.demoUrl && (
                          <div className="pt-1.5 flex items-center gap-1.5 text-[10.5px] font-mono">
                            <span className="text-slate-500 font-semibold">Live Demo:</span>
                            <a
                              href={proj.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-700 hover:text-blue-800 hover:underline inline-flex items-center gap-1 font-semibold truncate max-w-sm"
                            >
                              <span>{proj.demoUrl}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0 text-orange-600" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 6. Certifications & Honors */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#182b49] font-mono border-b border-orange-500 pb-1 mb-2.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-orange-600" />
                    Certifications & Achievements
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {certifications &&
                      certifications.map((cert) => (
                        <div
                          key={cert.id}
                          className="flex items-start gap-1.5 text-slate-700"
                        >
                          <span className="text-orange-600 font-bold">•</span>
                          <div>
                            <span className="font-bold text-slate-900">
                              {cert.title}
                            </span>
                            <span className="text-slate-500"> — {cert.issuer}</span>
                          </div>
                        </div>
                      ))}
                    {achievements &&
                      achievements.map((ach) => (
                        <div
                          key={ach.id}
                          className="flex items-start gap-1.5 text-slate-700"
                        >
                          <span className="text-orange-600 font-bold">•</span>
                          <div>
                            <span className="font-bold text-slate-900">
                              {ach.title}
                            </span>
                            {ach.subtitle && (
                              <span className="text-slate-500">
                                {' '}
                                ({ach.subtitle})
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              </div>

              {/* Bottom Document Stamp */}
              <div className="pt-4 mt-6 border-t border-slate-200 text-center text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Verified Curriculum Vitae — {profile.name}</span>
                <span>Document: {resumeFileName}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Bar */}
        <div className="p-3.5 sm:px-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>PDF Ready: {resumeFileName}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resumeUrl}
              download={resumeFileName}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {resumeFileName}</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
