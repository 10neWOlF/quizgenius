"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  Image,
  FileUp,
  File,
  X,
  Loader2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function ContentUploader() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("text");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null);
  };

  // Read file content
  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result.toString());
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("File reading error"));
      reader.readAsText(file);
    });
  };

  // Generate quiz from content
  const generateQuiz = async (contentType: string) => {
    if (!title.trim()) {
      setError("Please enter a title for your quiz");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let content = "";

      // Get content based on the active tab
      if (contentType === "text") {
        content = textContent;
      } else if (uploadedFile) {
        // For PDF, Image, and Document, we'll use the file content
        // In a real app, you'd handle these differently based on file type
        content = await readFileContent(uploadedFile);
      }

      // Get quiz configuration from sessionStorage (set by QuizConfigPanel)
      const configString = sessionStorage.getItem("quizConfig");
      if (!configString) {
        throw new Error("Quiz configuration not found");
      }

      const config = JSON.parse(configString);

      // Call the API to generate questions
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          contentType,
          title,
          description,
          questionCount: config.questionCount,
          questionTypes: Object.keys(config.questionTypes).filter(
            (key) => config.questionTypes[key],
          ),
          difficulty: config.difficulty,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate quiz");
      }

      const data = await response.json();

      // Redirect to the quiz page
      router.push(`/dashboard/quiz/${data.quizId}`);
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Upload Content</h2>

      {/* Quiz Title and Description */}
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="quiz-title">Quiz Title</Label>
          <Input
            id="quiz-title"
            placeholder="Enter a title for your quiz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="quiz-description">Description (Optional)</Label>
          <Textarea
            id="quiz-description"
            placeholder="Enter a description for your quiz"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
            rows={2}
          />
        </div>
      </div>

      <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Text
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center gap-2">
            <File className="h-4 w-4" /> PDF
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="h-4 w-4" /> Image
          </TabsTrigger>
          <TabsTrigger value="document" className="flex items-center gap-2">
            <FileUp className="h-4 w-4" /> Document
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Textarea
            placeholder="Paste your text content here..."
            className="min-h-[200px]"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
          />
          <Button
            disabled={!textContent.trim() || isLoading}
            className="w-full"
            onClick={() => generateQuiz("text")}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Generate Quiz from Text"
            )}
          </Button>
        </TabsContent>

        <TabsContent value="pdf" className="space-y-4">
          {uploadedFile ? (
            <div className="border border-border rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? "border-primary bg-primary/5" : "border-border"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Drag & drop your PDF here</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse files
                  </p>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  Browse Files
                </Button>
              </div>
            </div>
          )}
          <Button
            disabled={!uploadedFile || isLoading}
            className="w-full"
            onClick={() => generateQuiz("pdf")}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Generate Quiz from PDF"
            )}
          </Button>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          {uploadedFile ? (
            <div className="border border-border rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? "border-primary bg-primary/5" : "border-border"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Drag & drop your image here</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse files
                  </p>
                </div>
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  Browse Files
                </Button>
              </div>
            </div>
          )}
          <Button
            disabled={!uploadedFile || isLoading}
            className="w-full"
            onClick={() => generateQuiz("image")}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Generate Quiz from Image"
            )}
          </Button>
        </TabsContent>

        <TabsContent value="document" className="space-y-4">
          {uploadedFile ? (
            <div className="border border-border rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileUp className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? "border-primary bg-primary/5" : "border-border"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Drag & drop your document here</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse files
                  </p>
                </div>
                <input
                  type="file"
                  id="document-upload"
                  className="hidden"
                  accept=".doc,.docx,.txt"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("document-upload")?.click()
                  }
                >
                  Browse Files
                </Button>
              </div>
            </div>
          )}
          <Button
            disabled={!uploadedFile || isLoading}
            className="w-full"
            onClick={() => generateQuiz("document")}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Generate Quiz from Document"
            )}
          </Button>
        </TabsContent>
      </Tabs>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
