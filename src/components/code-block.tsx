import { CopyButton } from '@/components/copy-button';
import { highlightCode } from '@/lib/highlight';
import type { CodeLanguage } from '@/lib/highlight';

interface CodeBlockProps {
  value: string;
  label: string;
  language?: CodeLanguage;
}

const inferLanguage = (label: string): CodeLanguage => {
  const normalized = label.toLowerCase();
  if (/(install|command|scope|list|copy|run)/.test(normalized)) return 'bash';
  if (/(prompt|invocation|template)/.test(normalized)) return 'markdown';
  return 'text';
};

export const CodeBlock = async ({ value, label, language }: CodeBlockProps) => {
  const highlighted = await highlightCode(value, language ?? inferLanguage(label));
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-muted/30 focus-within:border-ring/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/60 px-4 py-2">
        <span className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <CopyButton value={value} accessibleLabel={`Copy ${label}`} variant="ghost" />
      </div>
      <div
        className="[&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-7 [&_pre]:whitespace-pre-wrap [&_pre]:[overflow-wrap:anywhere] [&_pre]:[overflow-x:auto]"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
};
