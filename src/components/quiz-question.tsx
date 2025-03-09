"use client";

import { useState } from "react";
import { Question } from "@/types/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  onAnswer?: (answer: string) => void;
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    if (onAnswer && selectedAnswer) {
      onAnswer(selectedAnswer);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-medium">{question.questionText}</h3>

        {question.questionType === "mcq" && question.options && (
          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            className="space-y-3 mt-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.explanation && (
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-1"
            >
              <HelpCircle className="h-4 w-4" />
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </Button>

            {showExplanation && (
              <div className="mt-3 p-4 bg-muted/50 rounded-md">
                <p className="text-sm">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {onAnswer && (
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="mt-4"
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
}
