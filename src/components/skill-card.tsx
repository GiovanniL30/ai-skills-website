import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { CopyButton } from '@/components/copy-button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buildInstallCommand } from '@/lib/installation';
import type { Skill } from '@/lib/skills';

export const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <article data-skill-card={skill.slug} className="h-full min-w-0">
      <Card className="h-full">
        <CardHeader className="gap-3">
          <Badge variant="outline">{skill.category}</Badge>
          <CardTitle>
            <h2>
              <Link
                href={`/skills/${skill.slug}`}
                className="rounded-sm hover:underline underline-offset-4"
              >
                {skill.title}
              </Link>
            </h2>
          </CardTitle>
          <CardDescription>
            <code className="font-mono text-xs [overflow-wrap:anywhere]">{skill.packageName}</code>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-5">
          <p className="text-sm leading-7 text-muted-foreground">{skill.summary}</p>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">USE IT FOR</p>
            <ul className="flex list-disc flex-col gap-2 pl-4 text-sm leading-6">
              {skill.useCases.slice(0, 2).map((useCase) => (
                <li key={useCase.title}>{useCase.title}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex-wrap justify-between gap-3">
          <Link
            href={`/skills/${skill.slug}`}
            className="inline-flex min-h-11 items-center gap-1 rounded-sm font-medium hover:underline underline-offset-4"
            aria-label={`View ${skill.title} details`}
          >
            View details <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          </Link>
          <CopyButton
            value={buildInstallCommand(skill.packageName)}
            label="Copy install"
            accessibleLabel={`Copy install command for ${skill.title}`}
          />
        </CardFooter>
      </Card>
    </article>
  );
};
