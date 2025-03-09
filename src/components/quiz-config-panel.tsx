"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { BrainCircuit, Timer, ListChecks, AlertCircle } from "lucide-react";

export function QuizConfigPanel() {
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(30); // in minutes
  const [selectedTypes, setSelectedTypes] = useState({
    mcq: true,
    trueFalse: false,
    shortAnswer: false,
    fillBlanks: false,
  });

  const handleTypeChange = (type: keyof typeof selectedTypes) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="bg-card rounded-xl p-6 border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Quiz Configuration</h2>

      <div className="space-y-6">
        {/* Question Types */}
        <div>
          <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
            <ListChecks className="h-4 w-4" /> Question Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mcq"
                checked={selectedTypes.mcq}
                onCheckedChange={() => handleTypeChange("mcq")}
              />
              <Label htmlFor="mcq">Multiple Choice</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trueFalse"
                checked={selectedTypes.trueFalse}
                onCheckedChange={() => handleTypeChange("trueFalse")}
              />
              <Label htmlFor="trueFalse">True/False</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="shortAnswer"
                checked={selectedTypes.shortAnswer}
                onCheckedChange={() => handleTypeChange("shortAnswer")}
              />
              <Label htmlFor="shortAnswer">Short Answer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fillBlanks"
                checked={selectedTypes.fillBlanks}
                onCheckedChange={() => handleTypeChange("fillBlanks")}
              />
              <Label htmlFor="fillBlanks">Fill in the Blanks</Label>
            </div>
          </div>
          {!Object.values(selectedTypes).some(Boolean) && (
            <p className="text-sm text-red-500 flex items-center gap-1 mt-2">
              <AlertCircle className="h-3 w-3" /> Please select at least one
              question type
            </p>
          )}
        </div>

        {/* Number of Questions */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" /> Number of Questions
            </h3>
            <span className="text-sm font-medium">{questionCount}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuestionCount(Math.max(1, questionCount - 1))}
              disabled={questionCount <= 1}
            >
              -
            </Button>
            <Slider
              value={[questionCount]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setQuestionCount(value[0])}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuestionCount(Math.min(50, questionCount + 1))}
              disabled={questionCount >= 50}
            >
              +
            </Button>
          </div>
        </div>

        {/* Time Limit */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Timer className="h-4 w-4" /> Time Limit (minutes)
            </h3>
            <span className="text-sm font-medium">{timeLimit} min</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTimeLimit(Math.max(1, timeLimit - 5))}
              disabled={timeLimit <= 1}
            >
              -
            </Button>
            <Slider
              value={[timeLimit]}
              min={1}
              max={120}
              step={5}
              onValueChange={(value) => setTimeLimit(value[0])}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTimeLimit(Math.min(120, timeLimit + 5))}
              disabled={timeLimit >= 120}
            >
              +
            </Button>
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <h3 className="text-sm font-medium mb-3">Difficulty Level</h3>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-primary/5">
              Easy
            </Button>
            <Button variant="outline" className="flex-1 bg-primary/10">
              Medium
            </Button>
            <Button variant="outline" className="flex-1">
              Hard
            </Button>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          className="w-full mt-6"
          size="lg"
          disabled={!Object.values(selectedTypes).some(Boolean)}
        >
          Generate Quiz
        </Button>
      </div>
    </div>
  );
}
