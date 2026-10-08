import type { ReactNode } from 'react';

interface PageHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export const PageHeading = ({ eyebrow, title, description, children }: PageHeadingProps) => {
  return (
    <header className="flex max-w-3xl flex-col gap-5">
      <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      {children}
    </header>
  );
};
