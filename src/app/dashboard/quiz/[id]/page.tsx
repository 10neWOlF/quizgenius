import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Clock, Flag, HelpCircle } from "lucide-react";
import { QuizQuestion } from "@/components/quiz-question";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch quiz data from Supabase
  const { data: quizData, error: quizError } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", params.id)
    .single();

  if (quizError || !quizData) {
    return (
      <>
        <DashboardNavbar />
        <main className="w-full">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
              <p className="text-muted-foreground">
                The quiz you're looking for doesn't exist or you don't have
                permission to view it.
              </p>
              <Button className="mt-6" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Fetch questions for this quiz
  const { data: questionsData, error: questionsError } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_id", params.id);

  if (questionsError) {
    console.error("Error fetching questions:", questionsError);
  }

  const questions = questionsData || [];
  const firstQuestion = questions.length > 0 ? questions[0] : null;

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Quiz Header */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{quizData.title}</h1>
              <p className="text-muted-foreground mt-1">
                {quizData.description || "No description provided"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {quizData.time_limit || 30}:00
                </span>
              </div>
              <Button variant="outline" size="icon">
                <Flag className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Quiz Progress */}
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full"
              style={{
                width:
                  questions.length > 0
                    ? `${(1 / questions.length) * 100}%`
                    : "0%",
              }}
            ></div>
          </div>

          {firstQuestion ? (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Question 1 of {questions.length}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {firstQuestion.question_type === "mcq"
                      ? "Multiple Choice"
                      : firstQuestion.question_type === "trueFalse"
                        ? "True/False"
                        : firstQuestion.question_type === "shortAnswer"
                          ? "Short Answer"
                          : "Fill in the Blanks"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuizQuestion
                  question={{
                    id: firstQuestion.id,
                    quizId: firstQuestion.quiz_id,
                    questionText: firstQuestion.question_text,
                    questionType: firstQuestion.question_type,
                    options: firstQuestion.options,
                    correctAnswer: firstQuestion.correct_answer,
                    explanation: firstQuestion.explanation,
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" disabled>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="w-full">
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">
                  No questions available
                </h2>
                <p className="text-muted-foreground">
                  This quiz doesn't have any questions yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
