export interface Candidate {
  id: string;
  name: string;
  fileName: string;
  overallScore: number;
  scores: {
    skills: number;
    experience: number;
    education: number;
  };
  skills: string[];
  summary: string;
  strengths: string[];
  gaps: string[];
  rank: number;
}

export interface RankingResult {
  jobTitle: string;
  jobDescription: string;
  candidates: Candidate[];
  createdAt: string;
}
