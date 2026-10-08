import { CopyButton } from '@/components/copy-button';

interface CodeBlockProps {
  value: string;
  label: string;
}

export const CodeBlock = ({ value, label }: CodeBlockProps) => {
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-muted/30 focus-within:border-ring/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/60 px-4 py-2">
        <span className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <CopyButton value={value} accessibleLabel={`Copy ${label}`} variant="ghost" />
      </div>
      <pre className="p-4 font-mono text-sm leading-7 whitespace-pre-wrap [overflow-wrap:anywhere]">
        <code>{value}</code>
      </pre>
    </div>
  );
};
