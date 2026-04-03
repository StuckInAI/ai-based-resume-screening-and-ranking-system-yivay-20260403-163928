import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Resume Ranker - Smart Candidate Ranking Platform',
  description:
    'Upload job descriptions and resumes. Our AI ranks candidates based on skills, experience, and relevance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">{children}</body>
    </html>
  );
}
