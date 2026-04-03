'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Brain,
  ArrowLeft,
  Trophy,
  Star,
  TrendingUp,
  User,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCw,
} from 'lucide-react';
import type { RankingResult } from '@/types';

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<RankingResult | null>(null);
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('rankingResults');
    if (!stored) {
      router.push('/upload');
      return;
    }
    try {
      setResults(JSON.parse(stored));
    } catch {
      router.push('/upload');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const getScoreBg = (score: number): string => {
    if (score >= 85) return 'bg-green-50 border-green-200';
    if (score >= 70) return 'bg-blue-50 border-blue-200';
    if (score >= 55) return 'bg-yellow-50 border-yellow-200';
    return 'bg-gray-50 border-gray-200';
  };

  const getScoreBarColor = (score: number): string => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 55) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Star className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <TrendingUp className="w-5 h-5 text-orange-400" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
  };

  const handleExport = () => {
    const csv = [
      ['Rank', 'Candidate', 'Overall Score', 'Skills', 'Experience', 'Education', 'Summary'],
      ...results.candidates.map((c) => [
        c.rank,
        c.name,
        c.overallScore,
        c.scores.skills,
        c.scores.experience,
        c.scores.education,
        `"${c.summary.replace(/"/g, "'")}"`,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${results.jobTitle.replace(/\s+/g, '_')}_rankings.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/upload" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">New Analysis</span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-gray-900">RecruitAI</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <Link
                href="/upload"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                New Analysis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Ranking Results</h1>
          <p className="text-gray-600">
            <span className="font-medium text-gray-900">{results.jobTitle}</span> &mdash;{' '}
            {results.candidates.length} candidates analyzed
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{results.candidates.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total Candidates</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-green-600">
              {results.candidates.filter((c) => c.overallScore >= 75).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Strong Matches</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-gray-900">
              {results.candidates.length > 0
                ? Math.round(
                    results.candidates.reduce((sum, c) => sum + c.overallScore, 0) /
                      results.candidates.length
                  )
                : 0}
              %
            </p>
            <p className="text-sm text-gray-500 mt-1">Average Score</p>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          {results.candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`bg-white rounded-2xl border transition-all ${getScoreBg(candidate.overallScore)}`}
            >
              {/* Candidate Header */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(candidate.rank)}
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{candidate.name}</h3>
                      <p className="text-sm text-gray-500">{candidate.fileName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-3xl font-bold ${getScoreColor(candidate.overallScore)}`}>
                        {candidate.overallScore}%
                      </p>
                      <p className="text-xs text-gray-400">Overall Match</p>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedCandidate(
                          expandedCandidate === candidate.id ? null : candidate.id
                        )
                      }
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
                    >
                      {expandedCandidate === candidate.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Score Bars */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {([
                    { label: 'Skills', value: candidate.scores.skills },
                    { label: 'Experience', value: candidate.scores.experience },
                    { label: 'Education', value: candidate.scores.education },
                  ] as const).map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${getScoreBarColor(item.value)}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedCandidate === candidate.id && (
                <div className="border-t border-gray-200 p-5 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">AI Summary</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{candidate.summary}</p>
                  </div>

                  {candidate.strengths.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {candidate.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-green-500 mt-0.5">✓</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {candidate.gaps.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Areas for Consideration</h4>
                      <ul className="space-y-1">
                        {candidate.gaps.map((gap, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-yellow-500 mt-0.5">!</span>
                            {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {candidate.skills.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Detected Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
