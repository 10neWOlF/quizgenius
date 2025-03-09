import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  FileText,
  Lightbulb,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              AI-Powered Quiz Generation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform any content into engaging quizzes with our advanced AI
              technology. Perfect for educators, students, and professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BrainCircuit className="w-6 h-6" />,
                title: "Intelligent Generation",
                description:
                  "AI analyzes content to create relevant, challenging questions",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Multiple Formats",
                description:
                  "Support for PDFs, images, documents, and text input",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Customizable Quizzes",
                description:
                  "Configure question types, quantity, and time limits",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Instant Feedback",
                description: "Real-time evaluation and personalized insights",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create custom quizzes in minutes with our simple three-step
              process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Upload Content</h3>
              <p className="text-gray-600">
                Drag and drop your PDFs, images, or documents, or simply paste
                your text
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Configure Quiz</h3>
              <p className="text-gray-600">
                Select question types, quantity, and customize time limits to
                your needs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Take Quiz</h3>
              <p className="text-gray-600">
                Start learning with your personalized quiz and get instant AI
                feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Quizzes Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Learning Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                See Our AI Quiz Generator in Action
              </h2>
              <p className="text-gray-600 mb-8">
                Watch how easily you can transform any content into engaging
                quizzes with our intuitive interface and powerful AI technology.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Timer className="w-5 h-5" />,
                    text: "Generate quizzes in seconds, not hours",
                  },
                  {
                    icon: <Target className="w-5 h-5" />,
                    text: "Get personalized learning insights",
                  },
                  {
                    icon: <BrainCircuit className="w-5 h-5" />,
                    text: "Improve knowledge retention with adaptive questions",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="text-blue-600">{item.icon}</div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg aspect-video relative">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                  alt="AI Quiz Generator Demo"
                  width={800}
                  height={450}
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and learners who are already using our
            AI-powered quiz generator.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
