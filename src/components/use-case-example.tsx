import { CodeBlock } from '@/components/code-block';
import type { UseCase } from '@/lib/skills';

export const UseCaseExample = ({ useCase }: { useCase: UseCase }) => {
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <h3 className="text-xl font-medium tracking-tight">{useCase.title}</h3>
      <p className="leading-7 text-muted-foreground">{useCase.situation}</p>
      <CodeBlock value={useCase.prompt} label={`Prompt: ${useCase.title}`} />
      <p className="text-sm leading-7 text-muted-foreground">
        <span className="font-medium text-foreground">Expected output: </span>
        {useCase.expectedOutput}
      </p>
    </div>
  );
};
