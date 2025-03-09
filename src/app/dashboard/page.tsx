import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainCircuit,
  FileText,
  History,
  InfoIcon,
  Plus,
  Target,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for recent quizzes
  const recentQuizzes = [
    {
      id: 1,
      title: "Introduction to Biology",
      questions: 15,
      date: "2023-10-15",
      score: 85,
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      questions: 20,
      date: "2023-10-10",
      score: 72,
    },
    {
      id: 3,
      title: "World History Overview",
      questions: 12,
      date: "2023-10-05",
      score: 92,
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Quiz Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your AI-generated quizzes
              </p>
            </div>
            <Link href="/dashboard/create-quiz">
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Create New Quiz
              </Button>
            </Link>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">3</div>
                  <FileText className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">83%</div>
                  <Target className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Questions Answered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">47</div>
                  <BrainCircuit className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Quizzes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Quizzes</h2>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <History className="h-4 w-4" />
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentQuizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>
                      Created on {new Date(quiz.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <div>
                        Questions:{" "}
                        <span className="font-medium">{quiz.questions}</span>
                      </div>
                      <div>
                        Score:{" "}
                        <span className="font-medium">{quiz.score}%</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${quiz.score}%` }}
                      ></div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
                    <Button variant="outline" size="sm">
                      Retake Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Create New Quiz Card */}
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>Create New Quiz</CardTitle>
                  <CardDescription>
                    Generate a quiz from any content
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Plus className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/create-quiz" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* User Profile Section */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">User Profile</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
              <pre className="text-xs font-mono max-h-48 overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
