import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  FileText,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              AI-Powered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                MCQ Generator
              </span>{" "}
              for Smarter Learning
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform any content into customized quizzes with our intelligent
              AI technology. Perfect for educators, students, and professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Create Quiz Now
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                How It Works
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <span>Upload any document</span>
              </div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-blue-500" />
                <span>AI-powered question generation</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span>Instant feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
