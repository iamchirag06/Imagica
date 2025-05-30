import { SavedPromptsClient } from '@/components/prompts/SavedPromptsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Saved Prompts - Imagica',
  description: 'Manage your saved photo generation prompts for Imagica.',
};

export default function SavedPromptsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SavedPromptsClient />
    </div>
  );
}
