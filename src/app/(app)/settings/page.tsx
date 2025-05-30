import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, SettingsIcon } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings - Imagica',
  description: 'Configure your Imagica application settings.',
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            Application Settings
          </CardTitle>
          <CardDescription>
            Manage your Imagica application preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="flex items-center gap-2 text-base">
              <KeyRound className="h-5 w-5 text-muted-foreground" />
              GenAI API Key
            </Label>
            <Input 
              id="api-key" 
              type="text" 
              value="Configured on server-side" 
              disabled 
              className="bg-muted/50"
            />
            <p className="text-sm text-muted-foreground">
              The API key for the image generation service is managed securely on the server.
              No client-side configuration is needed for this version of Imagica.
            </p>
          </div>
           {/* Placeholder for future settings */}
          <div className="space-y-2 opacity-50">
            <Label htmlFor="theme" className="text-base">Theme</Label>
             <Input 
              id="theme" 
              type="text" 
              value="Default Theme (more options coming soon!)" 
              disabled 
              className="bg-muted/50"
            />
            <p className="text-sm text-muted-foreground">
              Customize the look and feel of Imagica.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
