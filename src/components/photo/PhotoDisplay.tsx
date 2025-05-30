"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Image as ImageIcon } from 'lucide-react';

interface PhotoDisplayProps {
  imageUrl: string | null;
  prompt: string;
}

export function PhotoDisplay({ imageUrl, prompt }: PhotoDisplayProps) {
  if (!imageUrl) {
    return (
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
            Your Generated Image Will Appear Here
          </CardTitle>
        </CardHeader>
        <CardContent className="flex aspect-square items-center justify-center bg-muted/50 rounded-md">
          <p className="text-muted-foreground">Enter a prompt and click "Generate" to create an image.</p>
        </CardContent>
      </Card>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    // Sanitize prompt for filename
    const filename = prompt.substring(0, 50).replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'imagica_photo';
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-lg shadow-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">Generated Image</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-square w-full relative bg-muted">
          <Image
            src={imageUrl}
            alt={prompt || 'Generated image'}
            layout="fill"
            objectFit="contain"
            className="p-2"
            unoptimized // Necessary for data URIs if not using a custom loader
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4 bg-background/50 border-t">
        <Button onClick={handleDownload} aria-label="Download image">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
