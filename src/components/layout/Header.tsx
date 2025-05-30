import Link from 'next/link';
import { ImagicaLogo } from '@/components/icons/ImagicaLogo';
import { Button } from '@/components/ui/button';
import { ImagePlay, Settings, List } from 'lucide-react';

export function Header() {
  const navItems = [
    { href: '/', label: 'Generate', icon: ImagePlay },
    { href: '/prompts', label: 'My Prompts', icon: List },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ImagicaLogo />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild className="text-sm font-medium text-muted-foreground hover:text-foreground">
              <Link href={item.href}>
                <item.icon className="mr-0 h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
