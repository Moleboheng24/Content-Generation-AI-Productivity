import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { meta, PageHeader, Panel } from "@/components/AppShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/how-prompts-work")({
  head: () => meta("How Prompts Work — GenAI Studio", "Compare how text and image prompts grow from simple to detailed."),
  component: HowPrompts,
});

type Layer = { key: string; add: string };
const TEXT_BASE = "Write a professional LinkedIn post about learning Artificial Intelligence.";
const TEXT_LAYERS: Layer[] = [
  { key: "Audience", add: "The audience is recruiters and fellow IT graduates." },
  { key: "Tone", add: "Use a confident but humble, conversational tone." },
  { key: "Context", add: "I recently completed a Generative AI course and built a prompt-engineering app." },
  { key: "Length", add: "Keep it between 150 and 200 words." },
  { key: "Structure", add: "Open with a hook, share 3 key lessons as bullets, and end with a question to invite comments." },
];
const IMG_BASE = "A woman working on a laptop.";
const IMG_LAYERS: Layer[] = [
  { key: "Subject", add: "A young Black woman software developer in her twenties, focused expression, braided hair" },
  { key: "Environment", add: "in a bright modern Johannesburg co-working space with plants and a city view" },
  { key: "Composition", add: "rule-of-thirds framing, subject on the left, laptop screen softly visible" },
  { key: "Lighting", add: "warm golden-hour sunlight streaming through large windows" },
  { key: "Camera", add: "eye-level, 50mm lens, shallow depth of field" },
  { key: "Style", add: "photorealistic editorial photography" },
  { key: "Mood", add: "calm, ambitious, optimistic" },
  { key: "Colour", add: "warm amber and soft green palette, gentle contrast" },
];

function Builder({ base, layers, joiner }: { base: string; layers: Layer[]; joiner: string }) {
  const [on, setOn] = useState<string[]>([]);
  const active = layers.filter((l) => on.includes(l.key));
  const text = active.length ? `${base.replace(/\.$/, "")}${joiner}${active.map((l) => l.add).join(joiner)}.` : base;
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <Panel>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Add layers</p>
        <div className="space-y-2">
          {layers.map((l) => {
            const a = on.includes(l.key);
            return (
              <button key={l.key} aria-pressed={a} onClick={() => setOn(a ? on.filter((x) => x !== l.key) : [...on, l.key])}
                className={cn("flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors", a ? "border-primary bg-primary/10 text-primary" : "hover:border-primary/50")}>
                {l.key}<span className="font-mono text-xs">{a ? "−" : "+"}</span>
              </button>
            );
          })}
        </div>
      </Panel>
      <Panel>
        <div className="mb-3 flex justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>Resulting prompt</span><span>{active.length}/{layers.length} layers · {text.split(/\s+/).length} words</span>
        </div>
        <p className="text-lg leading-8">
          {base.replace(/\.$/, "")}
          {active.map((l) => (<span key={l.key} className="fade-up text-primary">{joiner}{l.add}</span>))}.
        </p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${(active.length / layers.length) * 100}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Specificity</p>
      </Panel>
    </div>
  );
}

function HowPrompts() {
  return (
    <div>
      <PageHeader kicker="Learn / Compare" title="How Prompts Work">
        Toggle each layer to watch a simple prompt become a precise one.
      </PageHeader>
      <Tabs defaultValue="text">
        <TabsList className="mb-6"><TabsTrigger value="text">Text Prompt</TabsTrigger><TabsTrigger value="image">Image Prompt</TabsTrigger></TabsList>
        <TabsContent value="text"><Builder base={TEXT_BASE} layers={TEXT_LAYERS} joiner=" " /></TabsContent>
        <TabsContent value="image"><Builder base={IMG_BASE} layers={IMG_LAYERS} joiner=", " /></TabsContent>
      </Tabs>
      <Panel className="mt-8">
        <h2 className="font-semibold">Why image prompts are different</h2>
        <div className="mt-3 grid gap-6 text-sm leading-6 text-muted-foreground md:grid-cols-2">
          <p><strong className="text-foreground">Text models</strong> follow instructions: who you are, who it's for, what to include, how long, what structure. They reason about purpose and audience, so prompts read like a brief.</p>
          <p><strong className="text-foreground">Image models</strong> map words to visual features. They don't need a "task" — they need a scene: subject, setting, framing, light, lens, style and colour. Prompts read like a shot list, and missing details get filled in randomly.</p>
        </div>
      </Panel>
    </div>
  );
}
