"use client";

import { useState } from 'react';
import { PhotoGeneratorForm } from '@/components/photo/PhotoGeneratorForm';
import { PhotoDisplay } from '@/components/photo/PhotoDisplay';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { SavedPrompt } from "@/types";
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';


export default function PhotoGenerationPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [savedPrompts, setSavedPrompts] = useLocalStorage<SavedPrompt[]>("imagica-prompts", []);
  
  const searchParams = useSearchParams();
  const initialPromptFromQuery = searchParams.get('prompt') || "";


  const handleGenerationStart = () => {
    setIsGenerating(true);
    setError(null);
    setImageUrl(null); // Clear previous image
  };

  const handleGenerationSuccess = (newImageUrl: string, prompt: string) => {
    setImageUrl(newImageUrl);
    setCurrentPrompt(prompt);
    setIsGenerating(false);
    toast({
      title: "Image Generated!",
      description: "Your masterpiece is ready.",
      variant: "default",
    });
  };

  const handleGenerationError = (errorMessage: string) => {
    setError(errorMessage);
    setIsGenerating(false);
    toast({
      title: "Generation Failed",
      description: errorMessage,
      variant: "destructive",
    });
  };
  
  const handleSavePrompt = () => {
    if (!currentPrompt) return;

    const isAlreadySaved = savedPrompts.some(p => p.text === currentPrompt);
    if (isAlreadySaved) {
      toast({
        title: "Prompt Already Saved",
        description: "This prompt is already in your saved list.",
        variant: "default",
      });
      return;
    }

    const newSavedPrompt: SavedPrompt = {
      id: Date.now().toString(),
      text: currentPrompt,
      createdAt: Date.now(),
    };
    setSavedPrompts([...savedPrompts, newSavedPrompt]);
    toast({
      title: "Prompt Saved!",
      description: "You can find it in 'My Prompts'.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <PhotoGeneratorForm
            onGenerationStart={handleGenerationStart}
            onGenerationSuccess={handleGenerationSuccess}
            onGenerationError={handleGenerationError}
            isGenerating={isGenerating}
            initialPrompt={initialPromptFromQuery}
          />
          {error && (
            <Alert variant="destructive" className="mt-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
           {imageUrl && currentPrompt && !isGenerating && (
            <Button onClick={handleSavePrompt} variant="outline" className="mt-4 w-full max-w-lg self-center">
              <Save className="mr-2 h-4 w-4" />
              Save This Prompt
            </Button>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <PhotoDisplay imageUrl={imageUrl} prompt={currentPrompt} />
        </div>
      </div>
    </div>
  );
}
