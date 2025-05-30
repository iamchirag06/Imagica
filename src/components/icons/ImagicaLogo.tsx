import { Sparkles } from 'lucide-react';
import type { SVGProps } from 'react';

export function ImagicaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="Imagica Logo">
      <Sparkles className="h-8 w-8 text-primary" {...props} />
      <span className="text-2xl font-bold tracking-tight text-foreground">
        Imagica
      </span>
    </div>
  );
}
