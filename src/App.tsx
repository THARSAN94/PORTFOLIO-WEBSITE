import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/initialData';
import { PortfolioData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { CertificateModal } from './components/CertificateModal';
import { ResumeModal } from './components/ResumeModal';
import { EditProfileModal } from './components/EditProfileModal';
import { AdjustPhotoModal } from './components/AdjustPhotoModal';
import { CropImageModal } from './components/CropImageModal';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function App() {
  // Dark mode state - defaults to light papercraft theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      localStorage.removeItem('portfolio_dark_mode');
    } catch (e) {
      // ignore
    }
    return false; // Default to paper craft light theme
  });

  // Portfolio data state - initialized with stored data or initialPortfolioData
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('portfolio_data_saved_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.profile) {
          // Clean up achievements: restore exact original achievements
          parsed.achievements = initialPortfolioData.achievements;
          // Sync certifications: replace DSA with Prompt Engineering and use authentic certificate SVGs
          parsed.certifications = initialPortfolioData.certifications;
          // Sync projects to include third project (Smart AI Hostel Management System)
          parsed.projects = initialPortfolioData.projects;
          if (parsed.skills) {
            parsed.skills = parsed.skills.map((cat: { category: string; skills: string[] }) => {
              if (cat.category === 'Leadership & Competencies') {
                return {
                  ...cat,
                  skills: cat.skills.filter(
                    (s) => s !== 'School Pupil Leader' && s !== 'Class Representative'
                  ),
                };
              }
              return cat;
            });
          }
          if (parsed.experiences) {
            parsed.experiences = parsed.experiences.map((exp: any) => {
              if (exp.id === 'exp-1' || (exp.role && exp.role.toLowerCase().includes('web development'))) {
                return {
                  ...exp,
                  role: "Web Development Intern",
                  company: "Brainery Spot Technology, Coimbatore",
                  logo: "Brainery Spot",
                  period: "18/06/2024 - 18/07/2024",
                  tags: ["Web Development", "HTML5", "CSS3", "JavaScript", "Responsive UI"],
                  certificateUrl: "/certificates/brainery_spot_web_dev_intern.svg",
                  description: "Successfully completed internship work under the domain of \"Web Development\" at Brainery Spot Technology, Coimbatore during the period of 18/06/2024 to 18/07/2024."
                };
              }
              if (exp.id === 'exp-2' || (exp.role && exp.role.toLowerCase().includes('cloud computing'))) {
                return {
                  ...exp,
                  role: "Cloud Computing Intern",
                  company: "Eagle-HiTech Softclou Pvt Ltd, Chennai",
                  logo: "Eagle Hi-Tech",
                  period: "24/12/2025 - 22/01/2026",
                  tags: ["Cloud Computing", "AWS", "Infrastructure", "Cloud Deployment"],
                  certificateUrl: "/certificates/eagle_hitech_cloud_intern.svg",
                  description: "Successfully completed internship work under the domain of \"Cloud Computing\" at Eagle-HiTech Softclou Pvt Ltd during the period of 24/12/2025 to 22/01/2026."
                };
              }
              return exp;
            });
          }
          if (parsed.profile) {
            parsed.profile.name = "THARSAN M";
            parsed.profile.title = "AI & Data Science Engineer";
            parsed.profile.subtitle = "AI & Data Science Engineer";
            if (parsed.profile.quickDetails) {
              parsed.profile.quickDetails.location = "Karur, Tamil Nadu, India";
            }
            if (!parsed.profile.resumeUrl || parsed.profile.resumeUrl === '#' || parsed.profile.resumeUrl.includes('placeholder')) {
              parsed.profile.resumeUrl = "/THARSAN_RESUME_1.pdf";
            }
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved portfolio data', e);
    }
    return initialPortfolioData;
  });

  // Active section tracking
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modal states
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAdjustPhotoOpen, setIsAdjustPhotoOpen] = useState(false);
  const [cropModal, setCropModal] = useState<{ isOpen: boolean; imageSrc: string }>({
    isOpen: false,
    imageSrc: '',
  });

  const handleOpenCropModal = (src?: string) => {
    setCropModal({
      isOpen: true,
      imageSrc: src || portfolioData.profile.avatarUrl,
    });
  };
  const [certificateModal, setCertificateModal] = useState<{ isOpen: boolean; imageUrl: string; title: string }>({
    isOpen: false,
    imageUrl: '',
    title: ''
  });

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save portfolio data updates
  const handleSavePortfolioData = (updatedData: PortfolioData) => {
    setPortfolioData(updatedData);
    try {
      localStorage.setItem('portfolio_data_saved_v2', JSON.stringify(updatedData));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  };

  const handleResetPortfolioData = () => {
    setPortfolioData(initialPortfolioData);
    try {
      localStorage.removeItem('portfolio_data_saved_v1');
    } catch (e) {
      console.error('Failed to remove saved portfolio data', e);
    }
  };

  const handleOpenCertificate = (imageUrl: string, title: string) => {
    setCertificateModal({
      isOpen: true,
      imageUrl,
      title
    });
  };

  // Scroll spy for active navigation item
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'education', 'experience', 'projects', 'certifications', 'achievements'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden">
      {/* Background Decorative Graphic Doodles matching reference image */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Left Dotted Circle Ring */}
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full border-4 border-dashed border-amber-300/50 dark:border-slate-800/40 transform -rotate-12"></div>
        
        {/* Top Right Star Doodles */}
        <div className="absolute top-16 right-10 text-amber-500/50 dark:text-slate-700/50 text-2xl flex gap-3 select-none">
          <span className="transform -rotate-12">★</span>
          <span className="text-3xl transform rotate-12">☆</span>
        </div>

        {/* Middle Right Dotted Circle Ring */}
        <div className="absolute top-1/3 -right-16 w-56 h-56 rounded-full border-4 border-dashed border-amber-300/50 dark:border-slate-800/40 transform rotate-45"></div>

        {/* Bottom Left Triangle and Circle Outlines */}
        <div className="absolute bottom-28 left-8 flex items-center gap-4 text-amber-400/50 dark:text-slate-700/50 text-4xl font-light select-none">
          <span className="transform -rotate-6">△</span>
          <span className="transform rotate-12">○</span>
        </div>

        {/* Bottom Right Paperclip Accent */}
        <div className="absolute bottom-12 right-12 text-slate-400/40 dark:text-slate-700/30 text-3xl select-none">
          📎
        </div>
      </div>

      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenEditModal={() => setIsEditOpen(true)}
        activeSection={activeSection}
        profileName={portfolioData.profile.name}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pb-16">
        <Hero
          profile={portfolioData.profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCropPhoto={handleOpenCropModal}
        />

        <About summary={portfolioData.profile.summary} />

        <Skills skills={portfolioData.skills} />

        <Education education={portfolioData.education} />

        <Experience
          experiences={portfolioData.experiences}
          onSelectCertificate={handleOpenCertificate}
        />

        <Projects projects={portfolioData.projects} />

        <Certifications
          certifications={portfolioData.certifications}
          onSelectCertificate={handleOpenCertificate}
        />

        <Achievements
          achievements={portfolioData.achievements}
        />
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-300 dark:border-slate-800 bg-[#faf7f0] dark:bg-slate-950 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-700 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-semibold">
            <span>Designed & Built for</span>
            <span className="font-bold text-slate-900 dark:text-slate-200 font-serif text-sm">{portfolioData.profile.name}</span>
          </div>

          <p className="flex items-center gap-1">
            <span>Specializing in AI & Data Science Engineering</span>
            <Sparkles className="w-3.5 h-3.5 text-slate-800 dark:text-slate-300" />
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-black dark:bg-slate-800 border border-slate-800 dark:border-slate-700 text-white dark:text-slate-200 font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xs cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </footer>

      {/* Interactive Modals */}
      <CertificateModal
        isOpen={certificateModal.isOpen}
        onClose={() => setCertificateModal({ isOpen: false, imageUrl: '', title: '' })}
        imageUrl={certificateModal.imageUrl}
        title={certificateModal.title}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        data={portfolioData}
        onUpdateResume={(newResumeUrl) => {
          handleSavePortfolioData({
            ...portfolioData,
            profile: {
              ...portfolioData.profile,
              resumeUrl: newResumeUrl,
            },
          });
        }}
      />

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={portfolioData}
        onSave={handleSavePortfolioData}
        onReset={handleResetPortfolioData}
        onOpenCropModal={handleOpenCropModal}
      />

      <CropImageModal
        isOpen={cropModal.isOpen}
        imageSrc={cropModal.imageSrc}
        onClose={() => setCropModal({ isOpen: false, imageSrc: '' })}
        onNewImageSelected={(newSrc) => setCropModal({ isOpen: true, imageSrc: newSrc })}
        onCropSave={(croppedBase64) =>
          handleSavePortfolioData({
            ...portfolioData,
            profile: {
              ...portfolioData.profile,
              avatarUrl: croppedBase64,
              avatarZoom: 100,
              avatarOffsetX: 0,
              avatarOffsetY: 0,
            },
          })
        }
      />

      <AdjustPhotoModal
        isOpen={isAdjustPhotoOpen}
        onClose={() => setIsAdjustPhotoOpen(false)}
        profile={portfolioData.profile}
        onSave={(zoom, offsetX, offsetY) =>
          handleSavePortfolioData({
            ...portfolioData,
            profile: {
              ...portfolioData.profile,
              avatarZoom: zoom,
              avatarOffsetX: offsetX,
              avatarOffsetY: offsetY,
            },
          })
        }
      />
    </div>
  );
}
