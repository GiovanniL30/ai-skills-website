'use client';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileNavigationProps {
  skillLinks: { slug: string; title: string }[];
}

export const MobileNavigation = ({ skillLinks }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="min-h-11 min-w-11" />}
        aria-label="Open navigation"
      >
        <MenuIcon aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Agent Skills</SheetTitle>
          <SheetDescription>Find a workflow or get started.</SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-6">
          <Navigation skillLinks={skillLinks} onNavigate={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
