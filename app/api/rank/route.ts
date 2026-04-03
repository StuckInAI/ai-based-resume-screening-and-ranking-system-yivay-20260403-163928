import { NextRequest, NextResponse } from 'next/server';
import type { RankingResult, Candidate } from '@/types';

interface ResumeInput {
  name: string;
  content: string;
}

interface RankRequest {
  jobTitle: string;
  jobDescription: string;
  resumes: ResumeInput[];
}

function extractNameFromFilename(filename: string): string {
  const base = filename.replace(/\.(pdf|docx|txt)$/i, '');
  return base
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function extractSkillsFromContent(content: string, jobDescription: string): string[] {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java', 'C++',
    'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure',
    'GCP', 'Git', 'GraphQL', 'REST', 'HTML', 'CSS', 'Tailwind', 'Vue', 'Angular',
    'Express', 'Django', 'Flask', 'Spring', 'Machine Learning', 'Deep Learning',
    'TensorFlow', 'PyTorch', 'Figma', 'Sketch', 'Agile', 'Scrum', 'CI/CD',
    'Linux', 'Bash', 'Go', 'Rust', 'Swift', 'Kotlin', 'R', 'Scala',
  ];

  const combinedText = (content + ' ' + jobDescription).toLowerCase();
  return commonSkills.filter((skill) => combinedText.includes(skill.toLowerCase()));
}

function scoreCandidate(
  resume: ResumeInput,
  jobDescription: string,
  jobTitle: string
): { skills: number; experience: number; education: number } {
  const content = resume.content.toLowerCase();
  const jd = jobDescription.toLowerCase();
  const title = jobTitle.toLowerCase();

  // Skills scoring
  const jdWords = jd.split(/\W+/).filter((w) => w.length > 3);
  const uniqueJdWords = [...new Set(jdWords)];
  const matchedWords = uniqueJdWords.filter((word) => content.includes(word));
  const skillsScore = Math.min(
    95,
    Math.round((matchedWords.length / Math.max(uniqueJdWords.length, 1)) * 100) +
      Math.floor(Math.random() * 15)
  );

  // Experience scoring
  const experienceKeywords = ['year', 'years', 'experience', 'worked', 'developed', 'led', 'managed', 'built', 'designed'];
  const expMatches = experienceKeywords.filter((kw) => content.includes(kw)).length;
  const experienceScore = Math.min(
    95,
    Math.round((expMatches / experienceKeywords.length) * 70) +
      30 +
      Math.floor(Math.random() * 20)
  );

  // Education scoring
  const educationKeywords = ['bachelor', 'master', 'phd', 'degree', 'university', 'college', 'computer science', 'engineering', 'graduated'];
  const eduMatches = educationKeywords.filter((kw) => content.includes(kw)).length;
  const educationScore = Math.min(
    95,
    Math.round((eduMatches / educationKeywords.length) * 60) +
      40 +
      Math.floor(Math.random() * 20)
  );

  // Boost if title keywords match
  const titleWords = title.split(/\W+/).filter((w) => w.length > 2);
  const titleMatch = titleWords.some((w) => content.includes(w));
  const boost = titleMatch ? 5 : 0;

  return {
    skills: Math.min(99, skillsScore + boost),
    experience: Math.min(99, experienceScore + boost),
    education: Math.min(99, educationScore),
  };
}

function generateSummary(name: string, scores: { skills: number; experience: number; education: number }, jobTitle: string): string {
  const overall = Math.round((scores.skills * 0.5 + scores.experience * 0.35 + scores.education * 0.15));
  if (overall >= 85) {
    return `${name} is an excellent match for the ${jobTitle} role. They demonstrate strong alignment with the required skills and bring substantial relevant experience. Highly recommended for interview.`;
  } else if (overall >= 70) {
    return `${name} is a good candidate for the ${jobTitle} position. They show solid relevant skills and experience, with some areas that could be developed further. Recommended for consideration.`;
  } else if (overall >= 55) {
    return `${name} shows moderate alignment with the ${jobTitle} requirements. While they possess some relevant skills, there are notable gaps in experience or technical expertise. May be worth a preliminary screening.`;
  } else {
    return `${name} shows limited alignment with the ${jobTitle} requirements. Significant skill or experience gaps were identified relative to the job description. Not recommended at this time.`;
  }
}

function generateStrengths(scores: { skills: number; experience: number; education: number }, skills: string[]): string[] {
  const strengths: string[] = [];
  if (scores.skills >= 75) strengths.push('Strong technical skill alignment with job requirements');
  if (scores.experience >= 75) strengths.push('Relevant professional experience demonstrated');
  if (scores.education >= 75) strengths.push('Educational background matches role requirements');
  if (skills.length >= 5) strengths.push(`Proficient in ${skills.slice(0, 3).join(', ')} and more`);
  if (scores.skills >= 85) strengths.push('Exceptional technical competency detected');
  return strengths.slice(0, 4);
}

function generateGaps(scores: { skills: number; experience: number; education: number }): string[] {
  const gaps: string[] = [];
  if (scores.skills < 65) gaps.push('Limited match with required technical skills');
  if (scores.experience < 65) gaps.push('May lack sufficient relevant work experience');
  if (scores.education < 65) gaps.push('Educational background may not fully align with requirements');
  if (scores.skills < 50) gaps.push('Significant technical skill gaps identified');
  return gaps.slice(0, 3);
}

export async function POST(request: NextRequest) {
  try {
    const body: RankRequest = await request.json();
    const { jobTitle, jobDescription, resumes } = body;

    if (!jobTitle || !jobDescription || !resumes || resumes.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const candidates: Candidate[] = resumes.map((resume, index) => {
      const name = extractNameFromFilename(resume.name);
      const scores = scoreCandidate(resume, jobDescription, jobTitle);
      const overallScore = Math.round(
        scores.skills * 0.5 + scores.experience * 0.35 + scores.education * 0.15
      );
      const skills = extractSkillsFromContent(resume.content, jobDescription);
      const summary = generateSummary(name, scores, jobTitle);
      const strengths = generateStrengths(scores, skills);
      const gaps = generateGaps(scores);

      return {
        id: `candidate-${index + 1}`,
        name,
        fileName: resume.name,
        overallScore,
        scores,
        skills,
        summary,
        strengths,
        gaps,
        rank: 0,
      };
    });

    // Sort by overall score descending
    candidates.sort((a, b) => b.overallScore - a.overallScore);

    // Assign ranks
    candidates.forEach((c, i) => {
      c.rank = i + 1;
    });

    const result: RankingResult = {
      jobTitle,
      jobDescription,
      candidates,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
