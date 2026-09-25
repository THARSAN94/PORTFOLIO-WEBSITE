import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4',
});

// A4: 595.28 x 841.89 pt
const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 36;
const contentWidth = pageWidth - margin * 2; // 523.28 pt

// Colors
const primaryColor = [24, 43, 73]; // Deep Navy
const accentColor = [194, 65, 12]; // Warm Amber / Orange
const darkTextColor = [30, 41, 59]; // Slate 800
const mutedTextColor = [71, 85, 105]; // Slate 600
const lightBorder = [226, 232, 240]; // Slate 200

let y = margin + 10;

// Header: Name
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(...primaryColor);
doc.text('THARSAN M', margin, y);

// Title
y += 18;
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...accentColor);
doc.text('AI & DATA SCIENCE ENGINEER', margin, y);

// Contact Info Bar
y += 14;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...mutedTextColor);
const contactLine = 'Phone: +91 98944 47486  |  Email: muthusamydharshan007@gmail.com  |  Location: Karur, Tamil Nadu, India';
doc.text(contactLine, margin, y);

y += 11;
const linksLine = 'LinkedIn: linkedin.com/in/tharsanmuthusamy7926  |  GitHub: github.com/THARSAN94';
doc.text(linksLine, margin, y);

// Divider Line
y += 10;
doc.setDrawColor(...primaryColor);
doc.setLineWidth(1.5);
doc.line(margin, y, margin + contentWidth, y);
y += 14;

// Section Helper
function drawSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text(title.toUpperCase(), margin, y);
  
  y += 3;
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(1);
  doc.line(margin, y, margin + contentWidth, y);
  y += 10;
}

// 1. PROFESSIONAL SUMMARY
drawSectionHeader('Professional Summary');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...darkTextColor);
const summaryText =
  'A motivated B.Tech student in Artificial Intelligence & Data Science seeking placement opportunities to apply technical knowledge and AI-driven problem-solving skills, while contributing to organizational growth and continuously developing professional competencies.';
const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
doc.text(summaryLines, margin, y);
y += summaryLines.length * 11 + 6;

// 2. EDUCATION
drawSectionHeader('Education');

// Education Item 1
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...darkTextColor);
doc.text('B.Tech in Artificial Intelligence and Data Science', margin, y);

doc.setFont('helvetica', 'bold');
doc.setTextColor(...accentColor);
doc.text('CGPA: 8.36', margin + contentWidth, y, { align: 'right' });

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...mutedTextColor);
doc.text('V.S.B. Engineering College, Karur, Tamil Nadu', margin, y);
doc.text('Up to VI Semester', margin + contentWidth, y, { align: 'right' });
y += 14;

// Education Item 2
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...darkTextColor);
doc.text('Higher Secondary Certificate (HSC) - Class XII', margin, y);

doc.setFont('helvetica', 'bold');
doc.setTextColor(...accentColor);
doc.text('Score: 82.16%', margin + contentWidth, y, { align: 'right' });

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...mutedTextColor);
doc.text('Sri Balaji Vidhyalaya Matric Hr Sec School, Thuraiyur', margin, y);
doc.text('Passed: 2023', margin + contentWidth, y, { align: 'right' });
y += 16;

// 3. TECHNICAL SKILLS
drawSectionHeader('Technical Skills');

const skillsList = [
  { label: 'Programming Languages', val: 'Java, Python, TypeScript, JavaScript, HTML, SQL' },
  { label: 'Database & Cloud', val: 'MongoDB, MySQL, AWS (Amazon Web Services), Cloud Computing' },
  { label: 'Frameworks & Tools', val: 'GitHub, Salesforce Agentforce, Generative AI Studio, RAG (Retrieval-Augmented Gen)' },
  { label: 'Core Competencies', val: 'Data Structures & Algorithms, LeetCode (150+ Solved), Problem Solving' },
  { label: 'Languages Known', val: 'Tamil (Native), English (Professional), Hindi (Basic)' },
];

skillsList.forEach((sk) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkTextColor);
  doc.text(`•  ${sk.label}: `, margin, y);
  
  const labelWidth = doc.getTextWidth(`•  ${sk.label}: `);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text(sk.val, margin + labelWidth, y);
  y += 12;
});
y += 4;

// 4. INTERNSHIPS & WORK EXPERIENCE
drawSectionHeader('Internships & Experience');

// Exp 1
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...darkTextColor);
doc.text('Cloud Computing Intern', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...mutedTextColor);
doc.text('24/12/2025 - 22/01/2026', margin + contentWidth, y, { align: 'right' });

y += 11;
doc.setFont('helvetica', 'italic');
doc.setTextColor(...accentColor);
doc.text('Eagle-HiTech Softclou Pvt Ltd, Chennai', margin, y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...darkTextColor);
const exp1Desc =
  'Completed intensive internship work in Cloud Computing. Gained hands-on experience with cloud infrastructure deployment, AWS cloud services, server configurations, and system scalability.';
const exp1Lines = doc.splitTextToSize(exp1Desc, contentWidth - 10);
doc.text(exp1Lines, margin + 8, y);
y += exp1Lines.length * 10.5 + 6;

// Exp 2
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...darkTextColor);
doc.text('Web Development Intern', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...mutedTextColor);
doc.text('18/06/2024 - 18/07/2024', margin + contentWidth, y, { align: 'right' });

y += 11;
doc.setFont('helvetica', 'italic');
doc.setTextColor(...accentColor);
doc.text('Brainery Spot Technology, Coimbatore', margin, y);

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...darkTextColor);
const exp2Desc =
  'Completed internship work under the domain of "Web Development" at Brainery Spot Technology, gaining practical experience in web development, HTML5, CSS3, JavaScript, and responsive user interfaces.';
const exp2Lines = doc.splitTextToSize(exp2Desc, contentWidth - 10);
doc.text(exp2Lines, margin + 8, y);
y += exp2Lines.length * 10.5 + 8;

// 5. KEY PROJECTS
drawSectionHeader('Key Projects');

// Project 1
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...darkTextColor);
doc.text('1. AI-Based Analysis & Performance Indicators for Approvals', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...accentColor);
doc.text('Live Demo | Tech: Python, Predictive AI, Data Analysis', margin + contentWidth, y, { align: 'right' });
const p1TitleW = doc.getTextWidth('Live Demo | Tech: Python, Predictive AI, Data Analysis');
doc.link(margin + contentWidth - p1TitleW, y - 8, 48, 10, { url: 'https://ai-based-analysis-and-performance-rwoc.onrender.com' });

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...darkTextColor);
const proj1Desc =
  'Developed an intelligent predictive system that evaluates multi-year academic datasets to streamline UGC and AICTE institutional approval metrics and compliance tracking.';
const proj1Lines = doc.splitTextToSize(proj1Desc, contentWidth - 10);
doc.text(proj1Lines, margin + 8, y);
y += proj1Lines.length * 10.5 + 5;

// Project 2
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...darkTextColor);
doc.text('2. AI-Powered Personalized Learning Path Generator', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...accentColor);
doc.text('Live Demo | Tech: GenAI, RAG, Python, LLMs', margin + contentWidth, y, { align: 'right' });
const p2TitleW = doc.getTextWidth('Live Demo | Tech: GenAI, RAG, Python, LLMs');
doc.link(margin + contentWidth - p2TitleW, y - 8, 48, 10, { url: 'https://ai-powered-learning-path-generator-1.onrender.com' });

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...darkTextColor);
const proj2Desc =
  'Engineered an adaptive learning engine utilizing Retrieval-Augmented Generation (RAG) to dynamically personalize learning curriculums for students according to individual mastery and goals.';
const proj2Lines = doc.splitTextToSize(proj2Desc, contentWidth - 10);
doc.text(proj2Lines, margin + 8, y);
y += proj2Lines.length * 10.5 + 5;

// Project 3
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...darkTextColor);
doc.text('3. Smart AI Hostel Management System', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...accentColor);
doc.text('Live Demo | Tech: AI, Full Stack, Python, Automation', margin + contentWidth, y, { align: 'right' });
const p3TitleW = doc.getTextWidth('Live Demo | Tech: AI, Full Stack, Python, Automation');
doc.link(margin + contentWidth - p3TitleW, y - 8, 48, 10, { url: 'https://hostel-management-system-2-3.onrender.com/' });

y += 11;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...darkTextColor);
const proj3Desc =
  'Engineered an automated smart hostel ecosystem featuring AI-driven room allocation, automated attendance tracking, query resolution, and digital complaint & mess management.';
const proj3Lines = doc.splitTextToSize(proj3Desc, contentWidth - 10);
doc.text(proj3Lines, margin + 8, y);
y += proj3Lines.length * 10.5 + 8;

// 6. CERTIFICATIONS & ACHIEVEMENTS
drawSectionHeader('Certifications & Achievements');

const certs = [
  '•  Salesforce Becoming an Agentforce Champion – FutureSkills Prime / Salesforce (2025)',
  '•  Introduction to Generative AI Studio – Simplilearn / Google Cloud (2025)',
  '•  Introduction to IoT and Digital Transformation – FutureSkills Prime / NASSCOM (2026)',
  '•  Introduction to Prompt Engineering – Simplilearn SkillUp (2026)',
  '•  150+ LeetCode Problems Solved – Algorithmic & Analytical Problem Solving',
  '•  Academic High Achiever – 82.16% in Class XII & 8.36 CGPA in B.Tech AI & DS',
];

certs.forEach((c) => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkTextColor);
  doc.text(c, margin, y);
  y += 11.5;
});

// Output file to /public/THARSAN_RESUME_1.pdf
const outPath = path.resolve('public/THARSAN_RESUME_1.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outPath, pdfBuffer);
console.log('Successfully generated:', outPath, 'Size:', pdfBuffer.length, 'bytes');
