import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Panel } from "@/components/AppShell";

export const Route = createFileRoute("/skills")({
  head: () => meta("Skills — Moleboheng Hlalele", "Technical skills in data, web, AI and prompt engineering."),
  component: Skills,
});

const GROUPS: [string, [string, string][]][] = [
  ["Data", [["Python", "Scripting and data manipulation"], ["SQL", "Querying and aggregating data"], ["Data Analytics", "Finding trends and communicating insights"]]],
  ["Web", [["HTML/CSS", "Structuring and styling pages"], ["JavaScript", "Interactive front-end logic"], ["Git/GitHub", "Version control and collaboration"]]],
  ["AI", [["Artificial Intelligence", "Core concepts and applications"], ["Generative AI", "Text and image generation — see GenAI Studio"], ["Prompt Engineering", "Structured prompting and evaluation"]]],
  ["Productivity", [["Microsoft Office", "Excel, Word, PowerPoint"]]],
];

function Skills() {
  return (
    <div>
      <PageHeader kicker="Portfolio / Skills" title="Skills" />
      <div className="grid gap-4 md:grid-cols-2">
        {GROUPS.map(([g, items]) => (
          <Panel key={g}>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">{g}</p>
            <ul className="space-y-3">{items.map(([n, d]) => <li key={n}><p className="font-medium">{n}</p><p className="text-sm text-muted-foreground">{d}</p></li>)}</ul>
          </Panel>
        ))}
      </div>
    </div>
  );
}
