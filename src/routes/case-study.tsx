import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, ExternalLink, Lightbulb, Target, TriangleAlert } from "lucide-react";
import { meta, PromptBlock } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/case-study")({
  head: () =>
    meta(
      "Prompt Engineering Case Study — GenAI Studio",
      "A practical case study showing how structured prompts improved the relevance, control, and consistency of AI-generated text and images.",
    ),
  component: CaseStudy,
});

const criteria = [
  ["Relevance", "Does the result answer the actual brief?"],
  ["Specificity", "Does it include the requested details?"],
  ["Structure", "Is the result organised and easy to use?"],
  ["Tone & style", "Does it match the intended audience and mood?"],
  ["Consistency", "Do repeated generations stay close to the brief?"],
] as const;

const textResults = [
  ["Audience", "Not defined", "Written for recruiters and IT graduates"],
  ["Structure", "General paragraphs", "Hook, three lessons, closing question"],
  ["Tone", "Generic and promotional", "Confident, reflective, and personal"],
  ["Length", "Unpredictable", "Focused within the requested range"],
] as const;

const imageResults = [
  ["Subject", "A generic laptop user", "A young woman developer at work"],
  ["Setting", "Unspecified office", "Bright Johannesburg co-working space"],
  ["Composition", "Model-decided framing", "Eye-level, rule-of-thirds framing"],
  ["Visual direction", "Inconsistent", "Warm light, calm mood, realistic finish"],
] as const;

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-5 border-t py-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
      <div>
        <p className="font-mono text-xs text-primary">{number}</p>
        <h2 className="mt-2 text-lg font-semibold">{title}</h2>
      </div>
      <div className="min-w-0 space-y-5 text-sm leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

function ResultTable({ rows }: { rows: readonly (readonly [string, string, string])[] }) {
  return (
    <div className="overflow-x-auto border-y">
      <table className="w-full min-w-[34rem] text-left text-xs">
        <thead className="font-mono uppercase text-muted-foreground">
          <tr>
            <th className="py-3 pr-5 font-medium">Criterion</th>
            <th className="py-3 pr-5 font-medium">Initial prompt</th>
            <th className="py-3 font-medium">Structured prompt</th>
          </tr>
        </thead>
        <tbody className="divide-y text-foreground/85">
          {rows.map(([criterion, initial, improved]) => (
            <tr key={criterion}>
              <td className="py-3 pr-5 font-medium text-foreground">{criterion}</td>
              <td className="py-3 pr-5 text-signal">{initial}</td>
              <td className="py-3 text-primary">{improved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CaseStudy() {
  return (
    <article className="fade-up">
      <header className="pb-10 pt-2 sm:pb-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Case Study 01</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-5xl">
          Turning vague ideas into useful AI outputs
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          A practical prompt engineering study exploring how context, constraints, and output structure affect text and image generation in GenAI Studio.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/">Explore the live studio <ExternalLink className="h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="/genai-studio-project-prompt.md" download>
              Download project prompt <Download className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
          {[
            ["Role", "Product designer & developer"],
            ["Focus", "Text + image prompting"],
            ["Method", "Controlled prompt comparison"],
          ].map(([term, value]) => (
            <div key={term} className="bg-card p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{term}</dt>
              <dd className="mt-1 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Section number="01" title="The challenge">
        <p>
          Generative AI can produce fluent content from a short instruction, but fluent does not always mean useful. Early tests in GenAI Studio produced broad copy and visually acceptable images that lacked audience, purpose, and a consistent direction.
        </p>
        <div className="border-l-2 border-signal pl-4 text-foreground">
          <p className="font-medium">Research question</p>
          <p className="mt-1 text-muted-foreground">How much does a structured prompt improve control over an AI result compared with a simple request?</p>
        </div>
      </Section>

      <Section number="02" title="Approach">
        <p>
          I tested one variable: prompt quality. For each experiment, the task and output type stayed the same while the prompt changed from a short request to a structured brief. I reviewed the outputs using five practical criteria rather than treating personal preference as the only measure.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {criteria.map(([title, description]) => (
            <div key={title} className="flex gap-3 border-t pt-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <div><p className="font-medium text-foreground">{title}</p><p className="text-xs leading-5">{description}</p></div>
            </div>
          ))}
        </div>
      </Section>

      <Section number="03" title="Experiment one — text">
        <div>
          <p className="font-medium text-foreground">Goal</p>
          <p>Create a LinkedIn post about completing a Generative AI course.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <PromptBlock title="Initial prompt" text="Write a post about learning AI." />
          <PromptBlock
            title="Structured prompt"
            text="Act as a career coach. Write a 150–200 word LinkedIn post for recruiters and IT graduates about completing a Generative AI course. Use a confident but humble tone. Start with a short hook, share three lessons as bullet points, and end with a thoughtful question."
          />
        </div>
        <ResultTable rows={textResults} />
        <div className="flex gap-3 bg-muted p-4 text-foreground">
          <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <p><strong>Finding:</strong> defining the audience and format made the largest difference. The role added perspective, while the word range prevented unnecessary detail.</p>
        </div>
      </Section>

      <Section number="04" title="Experiment two — image">
        <div>
          <p className="font-medium text-foreground">Goal</p>
          <p>Create a portfolio image of a developer working in Johannesburg.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <PromptBlock title="Initial prompt" text="A woman working on a laptop." />
          <PromptBlock
            title="Structured prompt"
            text="Young woman developer working on a laptop in a bright Johannesburg co-working space, eye-level 50mm photograph, subject placed using the rule of thirds, warm late-afternoon window light, shallow depth of field, realistic detail, calm and optimistic mood."
          />
        </div>
        <ResultTable rows={imageResults} />
        <div className="flex gap-3 bg-muted p-4 text-foreground">
          <Target className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <p><strong>Finding:</strong> concrete visual language worked better than subjective adjectives. Subject, setting, camera angle, composition, lighting, and mood gave the model a coherent shot list.</p>
        </div>
      </Section>

      <Section number="05" title="What did not work">
        <div className="flex gap-3 border-l-2 border-signal pl-4">
          <TriangleAlert className="mt-1 h-5 w-5 shrink-0 text-signal" />
          <div className="space-y-2">
            <p className="font-medium text-foreground">More detail was not always better.</p>
            <p>Prompts with conflicting styles or too many instructions produced muddled results. Exact word counts were also treated as guidance rather than guaranteed rules.</p>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="border-t pt-3"><strong className="text-foreground">Over-prompting:</strong> competing instructions reduced clarity.</li>
          <li className="border-t pt-3"><strong className="text-foreground">Ambiguous language:</strong> words like “beautiful” gave little control.</li>
          <li className="border-t pt-3"><strong className="text-foreground">False certainty:</strong> polished text still required fact-checking.</li>
          <li className="border-t pt-3"><strong className="text-foreground">Variation:</strong> the same prompt could still produce different results.</li>
        </ul>
      </Section>

      <Section number="06" title="Lessons learned">
        <ol className="space-y-4">
          {[
            ["Treat prompts as specifications", "A useful prompt explains the goal, audience, context, constraints, and expected output."],
            ["Change one thing at a time", "Controlled iteration makes it easier to understand why an output improved or declined."],
            ["Use domain-specific language", "Format terms help text models; composition and lighting terms help image models."],
            ["Keep human review in the loop", "Prompt engineering improves direction, but it does not guarantee accuracy or quality."],
          ].map(([title, detail], index) => (
            <li key={title} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <p><strong className="text-foreground">{title}.</strong> {detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section number="07" title="Outcome & next steps">
        <p>
          The experiments showed that prompt engineering is less about finding “magic words” and more about communicating intent clearly. The structured prompts produced outputs that were easier to evaluate, edit, and reuse in a real workflow.
        </p>
        <p>
          The next version would run repeated generations for each prompt, score results against a fixed rubric, track prompt versions, and compare model performance using a larger test set.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild><Link to="/lab">Try the Prompt Lab <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button variant="outline" asChild><Link to="/project">View project overview</Link></Button>
        </div>
      </Section>

      <footer className="border-t py-8 text-xs leading-6 text-muted-foreground">
        <p>Case study by Moleboheng Hlalele · GenAI Studio project</p>
        <p>This study reports qualitative observations from prompt experiments; it does not claim statistically measured performance.</p>
      </footer>
    </article>
  );
}