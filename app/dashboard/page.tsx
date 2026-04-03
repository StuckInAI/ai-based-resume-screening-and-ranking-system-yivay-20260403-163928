'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Plus,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  FileText,
} from 'lucide-react';

const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    date: '2024-01-15',
    candidates: 12,
    topScore: 96,
    status: 'completed',
  },
  {
    id: '2',
    title: 'Product Manager',
    date: '2024-01-12',
    candidates: 8,
    topScore: 89,
    status: 'completed',
  },
  {
    id: '3',
    title: 'Data Scientist',
    date: '2024-01-10',
    candidates: 15,
    topScore: 92,
    status: 'completed',
  },
  {
    id: '4',
    title: 'UX Designer',
    date: '2024-01-08',
    candidates: 6,
    topScore: 78,
    status: 'completed',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs'>('overview');

  const totalCandidates = mockJobs.reduce((sum, j) => sum + j.candidates, 0);
  const avgTopScore = Math.round(mockJobs.reduce((sum, j) => sum + j.topScore, 0) / mockJobs.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RecruitAI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                Home
              </Link>
              <Link
                href="/upload"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                New Analysis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your recruitment analytics and recent analyses.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Jobs</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockJobs.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Candidates</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalCandidates}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Avg Top Score</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{avgTopScore}%</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">Analyses Done</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockJobs.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Jobs
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Jobs */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Analyses</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {mockJobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.date}
                          </span>
                          <span className="text-xs text-gray-400">
                            {job.candidates} candidates
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-green-600">{job.topScore}%</p>
                        <p className="text-xs text-gray-400">Top Score</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Start */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Start a New Analysis</h2>
              <p className="text-blue-100 mb-4 text-sm">
                Upload a job description and resumes to get instant AI-powered candidate rankings.
              </p>
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Analysis
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">All Job Analyses</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {mockJobs.map((job) => (
                <div key={job.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.date}
                        </span>
                        <span className="text-xs text-gray-400">{job.candidates} candidates</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold text-green-600">{job.topScore}%</p>
                      <p className="text-xs text-gray-400">Top Score</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{job.candidates}</p>
                      <p className="text-xs text-gray-400">Candidates</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
