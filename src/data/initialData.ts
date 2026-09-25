import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "THARSAN M",
    title: "AI & Data Science Engineer",
    subtitle: "AI & Data Science Engineer",
    tagline: "Applying AI-driven problem solving and technical knowledge to build intelligent solutions.",
    avatarUrl: "/avatar.jpg",
    summary: "A motivated B.Tech student in AI & Data Science seeking placement opportunities to apply technical knowledge and AI-driven problem-solving skills, while contributing to organizational growth and continuously developing professional competencies.",
    quickDetails: {
      phone: "+91 98944 47486",
      email: "muthusamydharshan007@gmail.com",
      linkedin: "tharsanmuthusamy7926",
      linkedinUrl: "https://linkedin.com/in/tharsanmuthusamy7926",
      github: "THARSAN94",
      githubUrl: "https://github.com/THARSAN94",
      location: "Karur, Tamil Nadu, India"
    },
    resumeUrl: "/THARSAN_RESUME_1.pdf"
  },
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in AI & DS",
      institution: "V.S.B. Engineering College, Karur",
      period: "Up to VI Semester",
      grade: "CGPA 8.36"
    },
    {
      id: "edu-2",
      degree: "HSC (Higher Secondary Certificate)",
      institution: "Sri Balaji Vidhyalaya Matric Hr Sec School, Thuraiyur",
      period: "2023",
      grade: "82.16%"
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      color: "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700/50",
      skills: ["Java", "Python", "TypeScript", "JavaScript", "HTML"]
    },
    {
      category: "Database & Cloud",
      color: "bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700/50",
      skills: ["MongoDB", "MySQL", "AWS", "Cloud Computing"]
    },
    {
      category: "Tools & Frameworks",
      color: "bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700/50",
      skills: ["GitHub", "Salesforce", "RAG (Retrieval-Augmented Gen)", "Generative AI Studio"]
    },
    {
      category: "Leadership & Competencies",
      color: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/50",
      skills: ["Problem Solving", "LeetCode (150+ Problems)", "Languages: Tamil, English, Hindi"]
    }
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Web Development Intern",
      company: "Brainery Spot Technology, Coimbatore",
      logo: "Brainery Spot",
      period: "18/06/2024 - 18/07/2024",
      tags: ["Web Development", "HTML5", "CSS3", "JavaScript", "Responsive UI"],
      description: "Successfully completed internship work under the domain of \"Web Development\" at Brainery Spot Technology, Coimbatore during the period of 18/06/2024 to 18/07/2024.",
      certificateUrl: "/certificates/brainery_spot_web_dev_intern.svg"
    },
    {
      id: "exp-2",
      role: "Cloud Computing Intern",
      company: "Eagle-HiTech Softclou Pvt Ltd, Chennai",
      logo: "Eagle Hi-Tech",
      period: "24/12/2025 - 22/01/2026",
      tags: ["Cloud Computing", "AWS", "Infrastructure", "Cloud Deployment"],
      description: "Successfully completed internship work under the domain of \"Cloud Computing\" at Eagle-HiTech Softclou Pvt Ltd during the period of 24/12/2025 to 22/01/2026.",
      certificateUrl: "/certificates/eagle_hitech_cloud_intern.svg"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "AI-Based Analysis & Performance Indicators",
      subtitle: "Academic Institution Predictive Indicators",
      description: "An AI system analyzing historical academic data to support UGC and AICTE approval processes using predictive indicators.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      tags: ["AI", "Predictive Analytics", "Python", "Data Analysis"],
      githubUrl: "https://github.com/THARSAN94",
      demoUrl: "https://ai-based-analysis-and-performance-rwoc.onrender.com",
      featured: true
    },
    {
      id: "proj-2",
      title: "AI-Powered Personalized Learning Path Generator",
      subtitle: "Customized Student Skill & Progress Engine",
      description: "An intelligent system generating customized learning paths for students based on their skills, goals, and academic progress.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
      tags: ["GenAI", "Python", "RAG", "Machine Learning"],
      githubUrl: "https://github.com/THARSAN94",
      demoUrl: "https://ai-powered-learning-path-generator-1.onrender.com",
      featured: true
    },
    {
      id: "proj-3",
      title: "Smart AI Hostel Management System",
      subtitle: "Intelligent Student Housing & Facility Automation",
      description: "An automated smart campus hostel management ecosystem featuring AI-driven room allocation, automated attendance tracking, query resolution, and digital complaint & mess management.",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600",
      tags: ["AI", "Smart Campus", "Python", "Full Stack", "Automation"],
      githubUrl: "https://github.com/THARSAN94",
      demoUrl: "https://hostel-management-system-2-3.onrender.com/",
      featured: true
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Built Responsive Web Applications",
      subtitle: "Web Engineering Project",
      date: "2024",
      issuer: "Brainery Spot Technology",
      description: "Successfully built and deployed responsive web applications using HTML, CSS, and JavaScript.",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "ach-2",
      title: "150+ LeetCode Problems Solved",
      subtitle: "LeetCode: THARSAN94",
      date: "2024",
      issuer: "LeetCode",
      description: "Solved more than 150 problems on LeetCode demonstrating strong programming, data structures, and logical reasoning skills.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Salesforce Becoming an Agentforce Champion",
      issuer: "FutureSkills Prime & Salesforce",
      date: "30/11/2025",
      credentialId: "FSP/2026/1/4268125",
      imageUrl: "/certificates/salesforce_agentforce_champion.svg"
    },
    {
      id: "cert-2",
      title: "Introduction to IoT and Digital Transformation",
      issuer: "FutureSkills Prime & NASSCOM",
      date: "17/03/2026",
      credentialId: "FSP/2026/3/10263914",
      imageUrl: "/certificates/nasscom_iot_digital_transformation.svg"
    },
    {
      id: "cert-3",
      title: "Introduction to Generative AI Studio",
      issuer: "Simplilearn SkillUp (Powered by Google Cloud)",
      date: "01/07/2025",
      credentialId: "8550053",
      imageUrl: "/certificates/simplilearn_genai_studio.svg"
    },
    {
      id: "cert-4",
      title: "Introduction to Prompt Engineering",
      issuer: "Simplilearn SkillUp",
      date: "21/06/2026",
      credentialId: "10374460",
      imageUrl: "/certificates/simplilearn_prompt_engineering.svg"
    }
  ],
  publications: []
};

