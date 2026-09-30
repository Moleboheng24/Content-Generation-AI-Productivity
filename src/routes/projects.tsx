import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { meta, PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/projects")({
  head: () => meta("Projects & Case Studies — Moleboheng Hlalele", "Portfolio projects and case studies in AI and data."),
  component: Projects,
});

function Projects() {
  return (
    <div>
      <PageHeader kicker="Portfolio / Projects" title="Projects & Case Studies" />
      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/project" className="rounded-2xl border bg-card p-6 hover:border-primary/60">
          <p className="font-mono text-xs text-primary">Project</p>
          <h2 className="mt-2 text-lg font-semibold">GenAI Studio — Text & Image Generation Lab</h2>
          <p className="mt-2 text-sm text-muted-foreground">Text & image generation with a prompt engineering lab.</p>
        </Link>
        <Link to="/case-study" className="rounded-2xl border bg-card p-6 hover:border-primary/60">
          <p className="font-mono text-xs text-primary">Case study</p>
          <h2 className="mt-2 text-lg font-semibold">Generative AI & Prompt Engineering Case Study</h2>
          <p className="mt-2 text-sm text-muted-foreground">Controlled experiments comparing initial and improved prompts.</p>
        </Link>
        {[1, 2].map((i) => (
          <div key={i} className="grid min-h-40 place-items-center rounded-2xl border border-dashed text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Plus className="h-4 w-4" /> Future project</span>
          </div>
        ))}
      </div>
    </div>
  );
}
