export interface QuickDetails {
  phone: string;
  email: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  location?: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  avatarUrl: string;
  avatarZoom?: number;
  avatarOffsetX?: number;
  avatarOffsetY?: number;
  summary: string;
  quickDetails: QuickDetails;
  resumeUrl: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade?: string;
}

export interface SkillCategory {
  category: string;
  color: string; // theme badge color class
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  logo?: string;
  period: string;
  tags: string[];
  description: string;
  certificateUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  issuer: string;
  description?: string;
  imageUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  imageUrl?: string;
  verifyUrl?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  type: string;
  issn: string;
  articleId: string;
  link?: string;
  description?: string;
}

export interface PortfolioData {
  profile: Profile;
  education: EducationItem[];
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
  publications: PublicationItem[];
}
