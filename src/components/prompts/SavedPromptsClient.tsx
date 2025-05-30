"use client";

import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { SavedPrompt } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, Edit3, ListChecks, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SavedPromptsClient() {
  const [savedPrompts, setSavedPrompts] = useLocalStorage<SavedPrompt[]>("imagica-prompts", []);
  const router = useRouter();
  const { toast } = useToast();

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts(savedPrompts.filter(p => p.id !== id));
    toast({
      title: "Prompt Deleted",
      description: "The prompt has been removed from your list.",
    });
  };

  const handleUsePrompt = (text: string) => {
    router.push(`/?prompt=${encodeURIComponent(text)}`);
  };
  
  const sortedPrompts = [...savedPrompts].sort((a, b) => b.createdAt - a.createdAt);

  if (sortedPrompts.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
             <Info className="h-6 w-6 text-primary" />
            No Saved Prompts Yet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Start generating images and save your favorite prompts. They will appear here for easy reuse.
          </p>
        </CardContent>
         <CardFooter>
          <Button onClick={() => router.push('/')}>
            <Edit3 className="mr-2 h-4 w-4" />
            Start Generating
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-primary" />
          My Saved Prompts
        </CardTitle>
        <CardDescription>
          Review, use, or delete your saved creative prompts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[500px] pr-4">
          {sortedPrompts.map((prompt, index) => (
            <React.Fragment key={prompt.id}>
              <div className="py-4">
                <div className="flex justify-between items-start gap-4">
                  <p className="text-sm flex-1 break-words">{prompt.text}</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleUsePrompt(prompt.text)}
                      aria-label={`Use prompt: ${prompt.text.substring(0,30)}...`}
                    >
                      <Edit3 className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Use</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          aria-label={`Delete prompt: ${prompt.text.substring(0,30)}...`}
                        >
                          <Trash2 className="h-4 w-4 mr-1 sm:mr-2" />
                           <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the prompt: "{prompt.text.substring(0, 50)}...".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeletePrompt(prompt.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Saved: {new Date(prompt.createdAt).toLocaleDateString()}
                </p>
              </div>
              {index < sortedPrompts.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
