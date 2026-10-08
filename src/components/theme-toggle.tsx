'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative min-h-11 min-w-11 overflow-hidden"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon
        aria-hidden="true"
        className="size-5 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
      />
      <MoonIcon
        aria-hidden="true"
        className="absolute inset-0 m-auto size-5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
};
