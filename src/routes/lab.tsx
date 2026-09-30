import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, FlaskConical, Check } from "lucide-react";
import { meta, PageHeader, Panel, PromptBlock } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { improvePromptFn, type Improvement } from "@/lib/ai.functions";
import { studio } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lab")({
  head: () => meta("Prompt Engineering Lab — GenAI Studio", "Turn vague prompts into structured ones and learn why the changes matter."),
  component: Lab,
});

const ALL = ["Role prompting", "Context", "Specific instructions", "Constraints", "Examples", "Output formatting", "Iterative refinement"];
const DESC: Record<string, string> = {
  "Role prompting": "Tell the model who to be, which sets vocabulary and expertise.",
  Context: "Background the model can't guess on its own.",
  "Specific instructions": "Concrete verbs and deliverables instead of vague asks.",
  Constraints: "Limits on length, tone, and what to avoid.",
  Examples: "Show a sample of the desired output (few-shot).",
  "Output formatting": "Define the shape: bullets, table, headings, JSON.",
  "Iterative refinement": "Review the output and adjust the prompt in rounds.",
};

function Lab() {
  const [input, setInput] = useState("Write a post about AI.");
  const [res, setRes] = useState<Improvement | null>(null);
  const [original, setOriginal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    if (input.trim().length < 3) { setError("Enter a prompt to improve."); return; }
    setError(""); setLoading(true);
    const r = await improvePromptFn({ data: { prompt: input.trim() } });
    setLoading(false);
    if (!r.ok) { setError(r.error); return; }
    setOriginal(input.trim()); setRes(r.data); studio.countPrompt();
  }

  return (
    <div>
      <PageHeader kicker="Learn / Lab" title="Prompt Engineering Lab">
        Enter a simple prompt. The lab rewrites it using the Role · Context · Task · Audience · Constraints · Format structure and explains what changed.
      </PageHeader>
      <Panel className="mb-6">
        <label htmlFor="lab" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Your prompt</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Textarea id="lab" rows={2} value={input} maxLength={2000} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={go} disabled={loading} size="lg" className="sm:self-end">
            {loading ? <Loader2 className="animate-spin" /> : <FlaskConical />} Improve Prompt
          </Button>
        </div>
        {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
      </Panel>

      {loading && <div className="scan h-40 rounded-2xl border bg-card" />}

      {res && !loading && (
        <div className="fade-up space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Original prompt</p>
              <p className="mt-3 text-lg">{original}</p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">{original.split(/\s+/).length} words</p>
            </Panel>
            <Panel className="border-primary/50">
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">Improved prompt</p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6">{res.improved}</p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">{res.improved.split(/\s+/).length} words</p>
            </Panel>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(res.parts ?? {}).map(([k, v]) => (
              <PromptBlock key={k} title={k} text={v} />
            ))}
          </div>
          <Panel>
            <h2 className="font-semibold">Why it was improved</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{res.why}</p>
          </Panel>
          <Panel>
            <h2 className="mb-4 font-semibold">Techniques used</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {ALL.map((t) => {
                const used = res.techniques?.some((x) => x.toLowerCase() === t.toLowerCase());
                return (
                  <div key={t} className={cn("flex gap-3 rounded-xl border p-3", used ? "border-primary/50" : "opacity-50")}>
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", used ? "text-primary" : "text-muted-foreground")} />
                    <div><p className="text-sm font-medium">{t}</p><p className="text-xs text-muted-foreground">{DESC[t]}</p></div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
