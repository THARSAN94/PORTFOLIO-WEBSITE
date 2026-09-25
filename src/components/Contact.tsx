import React, { useState } from 'react';
import { Profile } from '../types';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactProps {
  profile: Profile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Banner Card */}
      <div className="bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-6 sm:p-10 paper-card relative overflow-hidden">
        {/* Paper tape decoration */}
        <div className="paper-tape top-2 left-1/2 -translate-x-1/2 rotate-1"></div>

        <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-6 py-2.5 rounded-2xl bg-black dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-xs transform -rotate-1">
            {['L', 'e', 't', "'", 's', ' ', 'C', 'o', 'n', 'n', 'e', 'c', 't'].map((char, index) => {
              if (char === ' ') return <span key={index} className="w-2 sm:w-3"></span>;
              const colors = ['bg-rose-500', 'bg-orange-500', 'bg-slate-900', 'bg-emerald-500', 'bg-teal-500', 'bg-blue-600', 'bg-purple-600', 'bg-indigo-600'];
              const bgClass = colors[index % colors.length];
              return (
                <span
                  key={index}
                  className={`paper-tile inline-flex items-center justify-center w-6 h-7 sm:w-8 sm:h-9 rounded-md border font-display text-xs sm:text-base font-black text-white ${bgClass}`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
            Feel free to reach out — open to AI/ML collaborations and opportunities.
          </p>
        </div>

        {/* Quick Social Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8 max-w-3xl mx-auto">
          <a
            href={profile.quickDetails.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4 text-slate-900 dark:text-slate-100" />
            <span>GitHub</span>
          </a>

          <a
            href={profile.quickDetails.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs hover:-translate-y-0.5"
          >
            <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${profile.quickDetails.email}`}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-rose-500" />
            <span className="truncate">Email</span>
          </a>

          <a
            href={`tel:${profile.quickDetails.phone.replace(/\s+/g, '')}`}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Phone</span>
          </a>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-950/90 border-2 border-slate-800 dark:border-slate-800 rounded-3xl p-6 sm:p-8 paper-card">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-dashed border-slate-300 dark:border-slate-800">
            <MessageSquare className="w-4 h-4 text-slate-800 dark:text-slate-300" />
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100">
              Send a Direct Message
            </h3>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 shadow-xs flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">Thank you for reaching out. I will get back to you shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#faf7f0] dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-black dark:focus:border-slate-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#faf7f0] dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-black dark:focus:border-slate-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Collaboration / Opportunity"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#faf7f0] dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-black dark:focus:border-slate-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Tharsan, I'd like to talk about..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#faf7f0] dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-black dark:focus:border-slate-500 shadow-xs resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

