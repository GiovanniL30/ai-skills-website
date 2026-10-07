import { CopyButton } from '@/components/copy-button';

interface CodeBlockProps {
  value: string;
  label: string;
}

export function CodeBlock({ value, label }: CodeBlockProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <CopyButton value={value} accessibleLabel={`Copy ${label}`} variant="ghost" />
      </div>
      <pre className="p-4 font-mono text-sm leading-7 whitespace-pre-wrap [overflow-wrap:anywhere]">
        <code>{value}</code>
      </pre>
    </div>
  );
}
