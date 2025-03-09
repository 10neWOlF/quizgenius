/**
 * OpenRouter API client for AI model integration
 * Using google/gemini-2.0-flash-001 model
 */

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  model: string;
}

export interface QuestionGenerationParams {
  content: string;
  questionCount: number;
  questionTypes: string[];
  difficulty: string;
}

export async function generateQuestions(
  params: QuestionGenerationParams,
): Promise<any> {
  const { content, questionCount, questionTypes, difficulty } = params;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key is not configured");
  }

  const prompt = `Generate ${questionCount} ${difficulty} difficulty questions based on the following content. 
  Question types should be: ${questionTypes.join(", ")}.
  Format the response as a valid JSON array of question objects with the following structure:
  [
    {
      "questionText": "Question text here",
      "questionType": "mcq", // or one of: trueFalse, shortAnswer, fillBlanks
      "options": ["Option A", "Option B", "Option C", "Option D"], // for mcq type
      "correctAnswer": "Correct answer here",
      "explanation": "Explanation of the answer here"
    },
    // more questions...
  ]
  
  Content: ${content}`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://quizgenius.ai", // Replace with your actual domain
          "X-Title": "QuizGenius AI",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          response_format: { type: "json_object" },
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenRouter API error: ${errorData.error?.message || response.statusText}`,
      );
    }

    const data: OpenRouterResponse = await response.json();

    // Parse the JSON string from the response
    try {
      const jsonContent = data.choices[0].message.content;
      return JSON.parse(jsonContent);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      throw new Error("Failed to parse AI-generated questions");
    }
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    throw error;
  }
}
