import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Panel } from "@/components/AppShell";

export const Route = createFileRoute("/about")({
  head: () => meta("About — Moleboheng Hlalele", "Education, career interests, technical skills and AI interests."),
  component: About,
});

function About() {
  const blocks: [string, string[]][] = [
    ["Education", ["[Qualification] — [Institution], [Year]", "[Certification, e.g. Introduction to Generative AI] — [Provider]"]],
    ["Career interests", ["Data analytics and business intelligence", "Applied AI and automation", "AI product development"]],
    ["Technical skills", ["Python and SQL for data work", "HTML, CSS and JavaScript for web", "Git/GitHub for version control"]],
    ["AI interests", ["Prompt engineering and evaluation", "Text and image generation", "Responsible and practical AI use"]],
  ];
  return (
    <div>
      <PageHeader kicker="Portfolio / About" title="About me">Placeholders in brackets are ready for your details.</PageHeader>
      <div className="grid gap-4 md:grid-cols-2">
        {blocks.map(([t, items]) => (
          <Panel key={t}><h2 className="mb-3 font-semibold">{t}</h2><ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{items.map((i) => <li key={i}>{i}</li>)}</ul></Panel>
        ))}
      </div>
    </div>
  );
}
