import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, X, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { meta, Panel } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/case-studies/prompt-engineering")({
  head: () =>
    meta(
      "Prompt Engineering Case Study — Moleboheng Hlalele",
      "Exploring Generative AI through text and image generation: experiments, prompt refinement, results, challenges and lessons learned.",
    ),
  component: CaseStudy,
});

const NAV = ["Introduction", "Project Context", "Problem Statement", "Text Generation Experiment", "Image Generation Experiment", "Text vs Image Prompting", "Prompt Refinement Process", "Prompt Engineering Techniques", "What Worked", "What Did Not Work", "Challenges", "Lessons Learned", "Future Improvements"];

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section id={`s${n}`} className="fade-up scroll-mt-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{n}</p>
      <h2 className="mt-1 mb-4 text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function PromptCard({ label, tone, text }: { label: string; tone: "before" | "after"; text: string }) {
  const after = tone === "after";
  return (
    <div className={`rounded-2xl border p-5 ${after ? "border-primary/50 bg-primary/5" : "bg-card"}`}>
      <p className={`mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest ${after ? "text-primary" : "text-muted-foreground"}`}>
        {after ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />} {label}
      </p>
      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/90">{text}</pre>
    </div>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4 text-foreground">
      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <div className="text-sm">{children}</div>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="rounded-full border px-3 py-1 text-xs text-foreground/85">{t}</span>
      ))}
    </div>
  );
}

function ElementList({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-hidden rounded-xl border">
      {rows.map(([k, v]) => (
        <div key={k} className="grid gap-1 border-b p-3 last:border-0 sm:grid-cols-[160px_1fr] sm:gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-primary">{k}</span>
          <span className="text-sm">{v}</span>
        </div>
      ))}
    </div>
  );
}

const TEXT_BEFORE = "Write a LinkedIn post about AI.";
const TEXT_AFTER = `Role: You are a career coach who writes for early-career IT professionals.
Context: I am an IT graduate building practical Generative AI projects to grow my skills.
Audience: Recruiters and peers in the South African tech industry.
Task: Write a LinkedIn post sharing one lesson I learned about prompt engineering.
Tone: Professional, warm and authentic — no hype.
Length: 150–200 words.
Output structure: A one-line hook, three short bullet points, and a closing question that invites comments.`;

const IMG_BEFORE = "A futuristic city.";
const IMG_AFTER = `Subject: A sustainable futuristic city skyline with vertical gardens on glass towers.
Environment: Built along a river, with elevated walkways and electric trams.
Lighting: Soft golden-hour sunlight with warm reflections on the water.
Mood: Optimistic and calm.
Style: Photorealistic architectural visualisation.
Composition: Rule of thirds, skyline on the upper third, river leading the eye inward.
Perspective: Wide-angle, slightly elevated drone view.
Visual details: Green rooftops, people on walkways, subtle haze, no text or logos.`;

const TECHNIQUES = [
  ["Role prompting", "Assigning the model a role (e.g. career coach) to shape expertise and voice."],
  ["Context", "Giving background so the output fits the real situation."],
  ["Specific instructions", "Stating exactly what to produce instead of hinting."],
  ["Constraints", "Setting limits such as length, tone or things to avoid."],
  ["Examples", "Showing a sample of the desired style or format."],
  ["Output formatting", "Defining the structure: bullets, headings, sections."],
  ["Iterative refinement", "Testing, reviewing and improving the prompt step by step."],
];

const STEPS = ["Write", "Test", "Evaluate", "Refine", "Repeat"];

function CaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <a href="#top" className="font-semibold tracking-tight">Moleboheng Hlalele <span className="font-mono text-xs text-primary">/ Case Study</span></a>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:block">Prompt Engineering</span>
        </div>
      </header>
      <div id="top" className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-8 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-1 border-l pl-4 text-sm">
            {NAV.map((t, i) => (
              <li key={t}><a href={`#s${String(i + 1).padStart(2, "0")}`} className="block py-1 text-muted-foreground transition-colors hover:text-primary"><span className="mr-2 font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>{t}</a></li>
            ))}
          </ol>
        </nav>
    <article className="min-w-0 max-w-4xl space-y-14 pb-12">
      <header className="fade-up rounded-3xl border bg-card p-8 sm:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Portfolio / Case Studies</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Prompt Engineering Case Study</h1>
        <p className="mt-3 text-lg text-foreground/85">Exploring Generative AI Through Text and Image Generation</p>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          This case study documents my practical exploration of Generative AI and prompt engineering while developing my
          GenAI Studio project — what I tested, what changed, and what I learned.
        </p>
        <div className="mt-6"><Tags items={["Generative AI", "Prompt Engineering", "Text Generation", "Image Generation", "AI APIs", "React"]} /></div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link to="/project">View GenAI Studio Project <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </header>

      <Section n="01" title="Introduction">
        <p><strong className="text-foreground">Generative AI</strong> is a type of artificial intelligence that creates new content — text, images and more — based on patterns it learned from large amounts of data.</p>
        <p><strong className="text-foreground">Prompt engineering</strong> is the skill of writing clear instructions (prompts) so the AI produces useful, relevant results.</p>
        <p>The model only knows what the prompt tells it. A vague prompt leaves the AI to guess; a clear prompt guides it. I wanted to understand this practically, by building and testing rather than only reading about it.</p>
      </Section>

      <Section n="02" title="Project Context">
        <p>I built <strong className="text-foreground">GenAI Studio — Text & Image Generation Lab</strong> as a hands-on environment to explore Generative AI, text generation, image generation, prompt engineering and AI experimentation.</p>
        <p>This page documents the experiments and learning behind that project. The application itself is a separate piece of work.</p>
      </Section>

      <Section n="03" title="Problem Statement">
        <p>Vague prompts tend to produce generic or unpredictable outputs. For example:</p>
        <PromptCard label="Initial prompt" tone="before" text="Write something about AI." />
        <p>This prompt does not specify:</p>
        <Tags items={["Audience", "Purpose", "Tone", "Length", "Context", "Desired structure"]} />
      </Section>

      <Section n="04" title="Text Generation Experiment">
        <p>The initial prompt gave the model a topic but no direction. Results were generic, overly broad, and the length and tone changed between attempts.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <PromptCard label="Before" tone="before" text={TEXT_BEFORE} />
          <PromptCard label="After" tone="after" text={TEXT_AFTER} />
        </div>
        <p>Why each element was added:</p>
        <ElementList rows={[
          ["Role", "Sets the voice and expertise the response should have."],
          ["Context", "Explains who I am so the post sounds personal and relevant."],
          ["Audience", "Determines vocabulary and what readers care about."],
          ["Task", "Narrows the topic to one clear lesson."],
          ["Tone", "Keeps the post professional and avoids hype."],
          ["Length", "Fits LinkedIn reading habits and keeps results consistent."],
          ["Output structure", "Makes the post scannable and encourages engagement."],
        ]} />
        <Callout>Defining the audience and output structure made the biggest difference — the post went from generic to something I could actually publish.</Callout>
      </Section>

      <Section n="05" title="Image Generation Experiment">
        <p>“A futuristic city” could mean almost anything — the style, time of day, viewpoint and mood were all left to chance, so every result looked different.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <PromptCard label="Before" tone="before" text={IMG_BEFORE} />
          <PromptCard label="After" tone="after" text={IMG_AFTER} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Typical result — before</p>
            <ul className="mt-3 space-y-1 text-sm"><li>• Generic sci-fi neon skyline</li><li>• Random style and lighting</li><li>• Inconsistent between attempts</li></ul>
          </Panel>
          <Panel className="border-primary/50">
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary">Typical result — after</p>
            <ul className="mt-3 space-y-1 text-sm"><li>• Matches the intended scene and mood</li><li>• Controlled composition and viewpoint</li><li>• Far more repeatable</li></ul>
          </Panel>
        </div>
        <Callout>Concrete visual language (lighting, camera angle, composition) works better than subjective words like “beautiful” or “amazing”.</Callout>
      </Section>

      <Section n="06" title="Text vs Image Prompting">
        <div className="grid gap-4 md:grid-cols-2">
          <Panel><h3 className="mb-3 font-semibold text-foreground">Text generation</h3><Tags items={["Context", "Audience", "Tone", "Constraints", "Structure", "Desired output"]} /></Panel>
          <Panel><h3 className="mb-3 font-semibold text-foreground">Image generation</h3><Tags items={["Subject", "Environment", "Style", "Lighting", "Composition", "Perspective", "Mood"]} /></Panel>
        </div>
        <p>Both use Generative AI, but the information the model needs reflects the type of output: text prompts describe meaning and communication, while image prompts describe what can be seen.</p>
      </Section>

      <Section n="07" title="Prompt Refinement Process">
        <ol className="flex flex-wrap items-center gap-2">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground">{s}</span>
              {i < STEPS.length - 1 && <ArrowRight className="h-4 w-4 text-primary" />}
            </li>
          ))}
        </ol>
        <p>Rather than expecting the first prompt to be perfect, I treated each prompt as a draft: test it, review the output against what I wanted, change one thing at a time, and try again.</p>
      </Section>

      <Section n="08" title="Prompt Engineering Techniques">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNIQUES.map(([t, d]) => (
            <Panel key={t} className="transition-colors hover:border-primary/60">
              <h3 className="font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm">{d}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section n="09" title="What Worked">
        <ul className="space-y-2">
          {["Providing relevant context", "Being specific about the desired result", "Defining constraints", "Specifying the output format", "Iteratively improving prompts"].map((w) => (
            <li key={w} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{w}</li>
          ))}
        </ul>
      </Section>

      <Section n="10" title="What Did Not Work">
        <p>Making a prompt longer did not automatically make it better. Overloaded prompts with conflicting or irrelevant details often confused the model and produced worse results.</p>
        <Callout><strong>Key lesson:</strong> Relevant specificity is more valuable than unnecessary complexity.</Callout>
      </Section>

      <Section n="11" title="Challenges">
        <div className="grid gap-3 sm:grid-cols-2">
          {["Understanding AI-generated outputs", "Prompt ambiguity", "Controlling image-generation results", "Evaluating output quality", "Understanding API integration", "Dealing with AI limitations"].map((c) => (
            <div key={c} className="rounded-xl border bg-card p-3 text-sm text-foreground/90">{c}</div>
          ))}
        </div>
      </Section>

      <Section n="12" title="Lessons Learned">
        <ElementList rows={[
          ["Generative AI", "It predicts likely content from patterns — powerful, but not always correct."],
          ["Prompt engineering", "Prompts work like specifications: clearer specs, better results."],
          ["APIs", "AI features rely on secure server-side API calls with keys kept private."],
          ["Experimentation", "Change one variable at a time to see what actually helped."],
          ["Iteration", "Small, repeated improvements beat trying to get it perfect first time."],
          ["Evaluation", "Judge outputs against clear criteria and keep a human review step."],
          ["Communication", "Clear communication with AI systems is a core skill, like with people."],
        ]} />
      </Section>

      <Section n="13" title="Future Improvements">
        <Tags items={["Prompt version history", "Prompt comparison", "Multiple AI models", "Output evaluation", "Prompt sharing", "Advanced image controls", "AI prompt suggestions", "Analytics"]} />
      </Section>

      <Panel className="text-center">
        <h2 className="text-xl font-semibold">See the project behind this case study</h2>
        <p className="mt-2 text-sm text-muted-foreground">GenAI Studio is the working application where these experiments were carried out.</p>
        <Button asChild className="mt-4"><Link to="/project">View GenAI Studio Project <ArrowRight className="h-4 w-4" /></Link></Button>
      </Panel>
    </article>
  );
}
