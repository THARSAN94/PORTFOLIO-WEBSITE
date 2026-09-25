import React, { useState } from 'react';
import { PortfolioData, ProjectItem } from '../types';
import { X, Save, RotateCcw, Plus, Trash2, Edit3, User, Briefcase, FolderGit2, Sparkles, Upload, Crop } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (updatedData: PortfolioData) => void;
  onReset: () => void;
  onOpenCropModal?: (imageSrc?: string) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
  onOpenCropModal,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'experience'>('profile');
  const [formData, setFormData] = useState<PortfolioData>(JSON.parse(JSON.stringify(data)));

  const handleProfileChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleQuickDetailsChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        quickDetails: {
          ...prev.profile.quickDetails,
          [field]: value
        }
      }
    }));
  };

  const handleAddProject = () => {
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Project',
      subtitle: 'Project Subtitle',
      description: 'Short project description...',
      tags: ['React', 'TypeScript'],
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com'
    };
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const handleRemoveProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const handleProjectChange = (id: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id === id) {
          if (field === 'tags') {
            return { ...p, tags: typeof value === 'string' ? value.split(',').map((s) => s.trim()) : value };
          }
          return { ...p, [field]: value };
        }
        return p;
      })
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-amber-50 dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full p-6 paper-card relative max-h-[90vh] flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-amber-300 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-serif font-bold text-xl text-slate-800 dark:text-slate-100">
              Customize Portfolio Data
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-amber-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-300 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 my-4 border-b border-amber-200 dark:border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-amber-300 dark:bg-amber-500 text-amber-950 dark:text-slate-950 shadow-xs'
                : 'bg-amber-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-amber-300 dark:bg-amber-500 text-amber-950 dark:text-slate-950 shadow-xs'
                : 'bg-amber-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects ({formData.projects.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 my-2">
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.profile.title}
                    onChange={(e) => handleProfileChange('title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subtitle / Role Tag
                  </label>
                  <input
                    type="text"
                    value={formData.profile.subtitle}
                    onChange={(e) => handleProfileChange('subtitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tagline / Motto
                  </label>
                  <input
                    type="text"
                    value={formData.profile.tagline}
                    onChange={(e) => handleProfileChange('tagline', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Avatar Image (URL or Upload Photo)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <input
                    type="text"
                    value={formData.profile.avatarUrl}
                    onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                    placeholder="https://... or upload local image"
                    className="flex-1 w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700 font-mono text-[11px]"
                  />
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-amber-200 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 font-bold text-xs hover:bg-amber-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 whitespace-nowrap flex items-center gap-1.5 shadow-xs">
                    <Upload className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Upload Local Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            if (uploadEvent.target?.result && onOpenCropModal) {
                              onOpenCropModal(uploadEvent.target.result as string);
                            } else if (uploadEvent.target?.result) {
                              handleProfileChange('avatarUrl', uploadEvent.target.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {onOpenCropModal && (
                    <button
                      type="button"
                      onClick={() => onOpenCropModal(formData.profile.avatarUrl)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                    >
                      <Crop className="w-4 h-4 text-amber-400" />
                      <span>Crop Photo</span>
                    </button>
                  )}
                </div>

                {/* Photo Framing Controls */}
                <div className="mt-3 p-3 bg-amber-50 dark:bg-slate-950/60 rounded-xl border border-amber-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Vertical Offset (Lower Head / Hair)</span>
                    <span className="font-mono text-amber-700 dark:text-amber-400">
                      {formData.profile.avatarOffsetY ?? 16}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={formData.profile.avatarOffsetY ?? 16}
                    onChange={(e) => handleProfileChange('avatarOffsetY', Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  About Me Summary
                </label>
                <textarea
                  rows={4}
                  value={formData.profile.summary}
                  onChange={(e) => handleProfileChange('summary', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700 resize-none"
                />
              </div>

              {/* Quick Details */}
              <div className="pt-3 border-t border-dashed border-amber-200 dark:border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Contact Quick Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.profile.quickDetails.phone}
                      onChange={(e) => handleQuickDetailsChange('phone', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.profile.quickDetails.email}
                      onChange={(e) => handleQuickDetailsChange('email', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={formData.profile.quickDetails.linkedinUrl}
                      onChange={(e) => handleQuickDetailsChange('linkedinUrl', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={formData.profile.quickDetails.githubUrl}
                      onChange={(e) => handleQuickDetailsChange('githubUrl', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Document PDF */}
              <div className="pt-3 border-t border-dashed border-amber-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Resume Document (PDF)</h4>
                  <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400">
                    File: {formData.profile.resumeUrl ? 'Custom PDF / THARSAN_RESUME_1.pdf' : '/THARSAN_RESUME_1.pdf'}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <input
                    type="text"
                    value={formData.profile.resumeUrl}
                    onChange={(e) => handleProfileChange('resumeUrl', e.target.value)}
                    placeholder="/THARSAN_RESUME_1.pdf"
                    className="flex-1 w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700 font-mono text-[11px]"
                  />
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-amber-200 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 font-bold text-xs hover:bg-amber-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 whitespace-nowrap flex items-center gap-1.5 shadow-xs">
                    <Upload className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Upload PDF File</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            if (uploadEvent.target?.result) {
                              handleProfileChange('resumeUrl', uploadEvent.target.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Manage Showcase Projects
                </span>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-300 dark:bg-amber-500 text-amber-950 dark:text-slate-950 font-bold hover:opacity-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {formData.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 space-y-3 relative"
                >
                  <button
                    onClick={() => handleRemoveProject(proj.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                    <div>
                      <label className="block font-bold mb-1">Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleProjectChange(proj.id, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={proj.subtitle || ''}
                        onChange={(e) => handleProjectChange(proj.id, 'subtitle', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Tech Tags (comma separated)</label>
                    <input
                      type="text"
                      value={proj.tags.join(', ')}
                      onChange={(e) => handleProjectChange(proj.id, 'tags', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 font-mono text-[11px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">GitHub Repo URL</label>
                      <input
                        type="text"
                        value={proj.githubUrl}
                        onChange={(e) => handleProjectChange(proj.id, 'githubUrl', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Live Demo URL</label>
                      <input
                        type="text"
                        value={proj.demoUrl || ''}
                        onChange={(e) => handleProjectChange(proj.id, 'demoUrl', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-amber-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-200/60 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-amber-300 dark:hover:bg-slate-700"
            title="Reset to Original Initial Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-amber-200/60 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-amber-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
