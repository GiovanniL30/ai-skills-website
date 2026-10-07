import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-w-0 flex-col gap-5 px-5 py-16 sm:px-8 lg:px-10"
    >
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">Skill not found</h1>
      <p className="leading-7 text-muted-foreground">
        That page is not in this catalog. Browse the available skills to find the right workflow.
      </p>
      <Link href="/" className="w-fit rounded-sm font-medium underline underline-offset-4">
        Back to all skills →
      </Link>
    </main>
  );
}
