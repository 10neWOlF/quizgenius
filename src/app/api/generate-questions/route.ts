import { NextRequest, NextResponse } from "next/server";
import { generateQuestions } from "@/lib/openrouter";
import { createClient } from "../../../../supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      content,
      contentType,
      questionCount,
      questionTypes,
      difficulty,
      title,
      description,
    } = await request.json();

    // Validate required fields
    if (
      !content ||
      !contentType ||
      !questionCount ||
      !questionTypes ||
      !difficulty ||
      !title
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Generate questions using OpenRouter API
    const questions = await generateQuestions({
      content,
      questionCount,
      questionTypes,
      difficulty,
    });

    // Create quiz in database
    const { data: quiz, error: quizError } = await supabase
      .from("quizzes")
      .insert({
        user_id: user.id,
        title,
        description,
        content_type: contentType,
        content,
        question_count: questionCount,
        time_limit: 30, // Default time limit
      })
      .select()
      .single();

    if (quizError) {
      console.error("Error creating quiz:", quizError);
      return NextResponse.json(
        { error: "Failed to create quiz" },
        { status: 500 },
      );
    }

    // Insert questions into database
    const questionsToInsert = questions.map((q: any) => ({
      quiz_id: quiz.id,
      question_text: q.questionText,
      question_type: q.questionType,
      options: q.options || null,
      correct_answer: q.correctAnswer,
      explanation: q.explanation || null,
    }));

    const { error: questionsError } = await supabase
      .from("questions")
      .insert(questionsToInsert);

    if (questionsError) {
      console.error("Error creating questions:", questionsError);
      return NextResponse.json(
        { error: "Failed to create questions" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      quizId: quiz.id,
      questionCount: questions.length,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}
