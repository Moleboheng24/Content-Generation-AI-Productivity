import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Panel } from "@/components/AppShell";

export const Route = createFileRoute("/case-study")({
  head: () => meta("Prompt Engineering Case Study — GenAI Studio", "An experiment-driven case study on how prompt structure changes AI text and image outputs."),
  component: CaseStudy,
});

const Sec = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section className="grid gap-4 border-t py-8 md:grid-cols-[180px_1fr]">
    <div><p className="font-mono text-xs text-primary">{String(n).padStart(2, "0")}</p><h2 className="mt-1 font-semibold">{title}</h2></div>
    <div className="space-y-3 text-sm leading-7 text-muted-foreground">{children}</div>
  </section>
);

function Compare({ a, b, aLabel = "Initial", bLabel = "Improved" }: { a: string; b: string; aLabel?: string; bLabel?: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-xl border border-signal/40 bg-background/60 p-4"><p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-signal">{aLabel}</p><p className="font-mono text-xs text-foreground/85">{a}</p></div>
      <div className="rounded-xl border border-primary/40 bg-background/60 p-4"><p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">{bLabel}</p><p className="font-mono text-xs text-foreground/85">{b}</p></div>
    </div>
  );
}

function CaseStudy() {
  return (
    <div>
      <PageHeader kicker="Portfolio / Case Study" title="Prompt Engineering Case Study: Exploring Generative AI">
        What happens to AI output when the same request is written two different ways? I ran controlled experiments inside GenAI Studio to find out.
      </PageHeader>
      <Panel>
        <Sec n={1} title="Introduction"><p>This case study documents how I tested prompt structure on text and image models, recorded results, and refined prompts in rounds. Replace the sample observations below with your own runs.</p></Sec>
        <Sec n={2} title="What is Generative AI?"><p>Models trained on large datasets that generate new content. Language models predict the next token; image models iteratively turn noise into an image guided by the text prompt.</p></Sec>
        <Sec n={3} title="Text Generation Experiment"><p>Goal: a LinkedIn post about learning AI. Variables held constant: model, content type. Variable changed: prompt structure.</p></Sec>
        <Sec n={4} title="Image Generation Experiment"><p>Goal: a hero image of a developer at work. Same model and aspect ratio; only the descriptive detail changed.</p></Sec>
        <Sec n={5} title="Initial Prompt"><Compare a="Write a post about AI." b="A woman working on a laptop." aLabel="Text" bLabel="Image" /></Sec>
        <Sec n={6} title="Improved Prompt">
          <Compare aLabel="Text" bLabel="Image"
            a="Role: career coach. Write a 150–200 word LinkedIn post for recruiters and IT graduates about completing a Generative AI course. Confident, humble tone. Hook → 3 bullet lessons → question."
            b="Young woman developer in a bright Johannesburg co-working space, rule-of-thirds, golden-hour window light, 50mm eye-level, shallow depth of field, photorealistic, calm and optimistic, warm amber palette." />
        </Sec>
        <Sec n={7} title="Output Comparison">
          <div className="overflow-x-auto"><table className="w-full text-left text-xs">
            <thead className="font-mono uppercase text-muted-foreground"><tr><th className="py-2 pr-4">Criterion</th><th className="pr-4">Initial</th><th>Improved</th></tr></thead>
            <tbody className="divide-y text-foreground/85">
              {[["Relevance to goal", "Generic AI overview", "Personal, on-topic"], ["Length control", "Unpredictable", "Within range"], ["Structure", "Wall of text", "Hook, bullets, CTA"], ["Image composition", "Random framing", "Intentional framing"], ["Consistency across reruns", "Low", "High"]].map((r) => (
                <tr key={r[0]}><td className="py-2 pr-4">{r[0]}</td><td className="pr-4 text-signal">{r[1]}</td><td className="text-primary">{r[2]}</td></tr>
              ))}
            </tbody>
          </table></div>
        </Sec>
        <Sec n={8} title="Prompt Engineering Techniques"><p>Role prompting, context, specific instructions, constraints, few-shot examples, output formatting and iterative refinement.</p></Sec>
        <Sec n={9} title="What Worked"><p>Explicit audience and structure had the biggest effect on text. For images, lighting and camera terms changed the result more than adjectives like "beautiful".</p></Sec>
        <Sec n={10} title="What Did Not Work"><p>Overloaded prompts with conflicting styles produced muddled images. Very strict word counts were only approximately followed.</p></Sec>
        <Sec n={11} title="Lessons Learned"><p>Prompts are specifications. The clearer the spec, the more predictable the output — but outputs still need human review for accuracy.</p></Sec>
        <Sec n={12} title="Future Improvements"><p>Side-by-side A/B runs with scoring, prompt version history, user accounts with cloud storage, and automated evaluation metrics.</p></Sec>
      </Panel>
    </div>
  );
}
