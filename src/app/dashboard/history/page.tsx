import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Target } from "lucide-react";

export default async function QuizHistory() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for quiz history
  const quizHistory = [
    {
      id: 1,
      title: "Introduction to Biology",
      date: "2023-10-15",
      score: 85,
      totalQuestions: 15,
      timeTaken: 18, // minutes
      completed: true,
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      date: "2023-10-10",
      score: 72,
      totalQuestions: 20,
      timeTaken: 25,
      completed: true,
    },
    {
      id: 3,
      title: "World History Overview",
      date: "2023-10-05",
      score: 92,
      totalQuestions: 12,
      timeTaken: 15,
      completed: true,
    },
    {
      id: 4,
      title: "Introduction to Physics",
      date: "2023-09-28",
      score: 78,
      totalQuestions: 18,
      timeTaken: 22,
      completed: true,
    },
    {
      id: 5,
      title: "English Literature",
      date: "2023-09-20",
      score: 88,
      totalQuestions: 15,
      timeTaken: 17,
      completed: true,
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
              <h1 className="text-3xl font-bold">Quiz History</h1>
              <p className="text-muted-foreground mt-1">
                View your past quiz attempts and results
              </p>
            </div>
          </header>

          {/* Quiz History List */}
          <section>
            <div className="space-y-6">
              {quizHistory.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{quiz.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(quiz.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                        {quiz.score}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Questions:{" "}
                          <span className="font-medium">
                            {quiz.totalQuestions}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Time:{" "}
                          <span className="font-medium">
                            {quiz.timeTaken} min
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${quiz.score}%` }}
                      ></div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Retake Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
