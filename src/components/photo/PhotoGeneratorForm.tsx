"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePhotoFromPrompt, GeneratePhotoFromPromptInput } from "@/ai/flows/generate-photo-from-prompt";
import { Loader2, Sparkles, Save } from 'lucide-react';
import type { SavedPrompt } from "@/types";

const FormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }).max(1000, {
    message: "Prompt must not exceed 1000 characters."
  }),
});

interface PhotoGeneratorFormProps {
  onGenerationStart: () => void;
  onGenerationSuccess: (imageUrl: string, prompt: string) => void;
  onGenerationError: (error: string) => void;
  isGenerating: boolean;
  initialPrompt?: string;
}

export function PhotoGeneratorForm({
  onGenerationStart,
  onGenerationSuccess,
  onGenerationError,
  isGenerating,
  initialPrompt = "",
}: PhotoGeneratorFormProps) {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: initialPrompt,
    },
  });

  // Effect to update form when initialPrompt changes (e.g. from saved prompts)
  // biome-ignore lint/correctness/useExhaustiveDependencies: initialPrompt is the only dep needed here
  useEffect(() => {
    if (initialPrompt) {
      form.setValue("prompt", initialPrompt);
    }
  }, [initialPrompt, form.setValue]);


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    onGenerationStart();
    try {
      const input: GeneratePhotoFromPromptInput = { prompt: data.prompt };
      const result = await generatePhotoFromPrompt(input);
      if (result.photoDataUri) {
        onGenerationSuccess(result.photoDataUri, data.prompt);
      } else {
        onGenerationError("Failed to generate image: No data URI returned.");
      }
    } catch (error) {
      console.error("Error generating photo:", error);
      onGenerationError(error instanceof Error ? error.message : "An unknown error occurred.");
    }
  }

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Create Your Image
        </CardTitle>
        <CardDescription>
          Enter a detailed prompt and let Imagica bring your vision to life.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Your Creative Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A majestic lion wearing a crown, sitting on a throne in a surreal forest, digital art"
                      className="min-h-[120px] resize-y"
                      {...field}
                      disabled={isGenerating}
                    />
                  </FormControl>
                  <FormDescription>
                    The more descriptive your prompt, the better the result.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end pt-4">
            <Button type="submit" disabled={isGenerating} size="lg">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Image
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
