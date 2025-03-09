import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { ContentUploader } from "@/components/content-uploader";
import { QuizConfigPanel } from "@/components/quiz-config-panel";

export default async function CreateQuiz() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Create New Quiz</h1>
            <p className="text-muted-foreground">
              Upload content and configure your quiz settings
            </p>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Content Upload Section */}
            <ContentUploader />

            {/* Quiz Configuration Section */}
            <QuizConfigPanel />
          </div>
        </div>
      </main>
    </>
  );
}
