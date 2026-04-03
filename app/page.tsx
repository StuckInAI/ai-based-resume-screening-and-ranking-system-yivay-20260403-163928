import Link from 'next/link';
import { Brain, Upload, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description:
        'Upload job descriptions and multiple resumes in seconds. Supports PDF, DOCX, and TXT formats.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description:
        'Our AI analyzes skills, experience, education, and cultural fit to provide comprehensive rankings.',
    },
    {
      icon: BarChart3,
      title: 'Detailed Scoring',
      description:
        'Get detailed breakdown scores for each candidate across multiple dimensions.',
    },
    {
      icon: Users,
      title: 'Candidate Management',
      description:
        'Manage all candidates in one place, compare profiles, and make data-driven hiring decisions.',
    },
  ];

  const benefits = [
    'Reduce time-to-hire by up to 75%',
    'Eliminate unconscious bias in screening',
    'Process hundreds of resumes in minutes',
    'Customizable scoring criteria',
    'Detailed candidate insights',
    'Export results to CSV or PDF',
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RecruitAI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/50 rounded-full px-4 py-2 mb-6">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Recruitment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Rank Candidates
            <br />
            <span className="text-blue-200">Smarter & Faster</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Upload your job description and resumes. Our AI instantly ranks candidates based on
            skills, experience, and relevance — helping you find the perfect hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Ranking Candidates
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/50 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-500/50 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Hire Better</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with an intuitive interface to streamline your
              entire recruitment process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose RecruitAI?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Join thousands of recruiters who have transformed their hiring process with our
                AI-powered platform.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Senior React Developer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">96%</p>
                    <p className="text-xs text-gray-500">Match Score</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div>
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-500">Full Stack Engineer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">87%</p>
                    <p className="text-xs text-gray-500">Match Score</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div>
                    <p className="font-semibold text-gray-900">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500">Frontend Developer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">74%</p>
                    <p className="text-xs text-gray-500">Match Score</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900">David Kim</p>
                    <p className="text-sm text-gray-500">JavaScript Developer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-600">61%</p>
                    <p className="text-xs text-gray-500">Match Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Start ranking candidates smarter today. No credit card required.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">RecruitAI</span>
            </div>
            <p className="text-sm">&copy; 2024 RecruitAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
