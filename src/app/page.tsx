export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-32"
    >
      <div className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Agent Skills
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A public catalog of my AI coding skills, what they help with, and how to install them.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          The skills catalog and documentation are coming soon.
        </p>
      </div>
    </main>
  );
}
