import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Mock quiz data
  const quiz = {
    id: params.id,
    title: "Introduction to Biology",
    description: "Test your knowledge of basic biological concepts",
    questionCount: 15,
    timeLimit: 30, // minutes
    questions: [
      {
        id: "q1",
        questionText: "What is the powerhouse of the cell?",
        questionType: "mcq",
        options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
        correctAnswer: "Mitochondria",
        explanation: "Mitochondria are responsible for producing energy in the form of ATP through cellular respiration."
      },
      // More questions would be here
    ]
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Quiz Header */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{quiz.title}</h1>
              <p className="text-muted-foreground mt-1">{quiz.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">30:00</span>
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
            <div className="bg-primary h-full rounded-full" style={{ width: "7%" }}></div>
          </div>

          {/* Question Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Question 1 of {quiz.questionCount}</span>
                <span className="text-sm font-normal text-muted-foreground">Multiple Choice</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <QuizQuestion question={quiz.questions[0]} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button>
                Next <ArrowRight className="ml-2 h-4 w-