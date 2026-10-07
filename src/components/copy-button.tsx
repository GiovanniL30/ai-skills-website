'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  value: string;
  label?: string;
  accessibleLabel?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

interface CopyFeedback {
  value: string;
  status: 'copying' | 'copied' | 'failed';
}

export function CopyButton({
  value,
  label = 'Copy',
  accessibleLabel,
  variant = 'outline',
}: CopyButtonProps) {
  const [feedback, setFeedback] = useState<CopyFeedback>();
  const status = feedback?.value === value ? feedback.status : undefined;
  const feedbackId = useId();

  async function copy() {
    setFeedback({ value, status: 'copying' });
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      setFeedback({ value, status: 'copied' });
    } catch {
      setFeedback({ value, status: 'failed' });
    }
  }

  return (
    <div className="flex min-w-0 flex-col items-start gap-2">
      <Button
        type="button"
        variant={variant}
        className="min-h-11"
        aria-label={
          status === 'copied' ? `Copied: ${accessibleLabel ?? label}` : (accessibleLabel ?? label)
        }
        aria-describedby={status === 'failed' ? feedbackId : undefined}
        disabled={status === 'copying'}
        onClick={() => {
          void copy();
        }}
      >
        {status === 'copied' ? (
          <CheckIcon aria-hidden="true" data-icon="inline-start" />
        ) : (
          <CopyIcon aria-hidden="true" data-icon="inline-start" />
        )}
        {status === 'copied' ? 'Copied' : status === 'copying' ? 'Copying…' : label}
      </Button>
      <p
        id={feedbackId}
        role="status"
        aria-live="polite"
        className={
          status === 'failed' ? 'max-w-sm text-sm leading-6 text-muted-foreground' : 'sr-only'
        }
      >
        {status === 'copied' && 'Copied to clipboard.'}
        {status === 'failed' && 'Copy failed. Select and copy the text below manually.'}
      </p>
      {status === 'failed' && (
        <textarea
          readOnly
          aria-label="Text to copy manually"
          value={value}
          onFocus={(event) => event.currentTarget.select()}
          rows={3}
          className="w-full min-w-0 rounded-md border border-input bg-background p-3 font-mono text-sm"
        />
      )}
    </div>
  );
}
