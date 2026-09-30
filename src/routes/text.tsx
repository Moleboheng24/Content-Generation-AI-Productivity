import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, RefreshCw, Pencil, Save, Trash2, Loader2, Sparkles } from "lucide-react";
import { Chips, meta, PageHeader, Panel, PromptBlock } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateTextFn } from "@/lib/ai.functions";
import { studio, useStudio } from "@/lib/store";

export const Route = createFileRoute("/text")({
  head: () => meta("Text Generator — GenAI Studio", "Generate blogs, emails, captions and more with controllable tone, length and audience."),
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s['id'] === "string" ? (s['id'] as string) : undefined }),
  component: TextPage,
});

const TYPES = ["Blog post", "Social media caption", "Professional email", "Product description", "Story", "CV/cover-letter content", "Summary", "Marketing copy", "General text"] as const;
const TONES = ["Professional", "Friendly", "Casual", "Persuasive", "Creative", "Formal"] as const;
const LENGTHS = ["Short", "Medium", "Long"] as const;
const AUDIENCES = ["General", "Students", "Professionals", "Customers", "Developers"] as const;
const WORDS = { Short: "about 100 words", Medium: "about 300 words", Long: "about 700 words" };

function buildPrompt(type: string, desc: string, tone: string, length: keyof typeof WORDS, audience: string) {
  return `Role: You are an expert writer specialising in ${type.toLowerCase()}.
Task: Write a ${type.toLowerCase()} based on this brief: "${desc.trim()}".
Audience: ${audience}.
Tone: ${tone}.
Length: ${WORDS[length]}.
Format: Use clear structure appropriate for a ${type.toLowerCase()} (headings or paragraphs as suitable). Output only the content.`;
}

function TextPage() {
  const { id } = Route.useSearch();
  const { generations } = useStudio();
  const [type, setType] = useState<(typeof TYPES)[number]>("Blog post");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Professional");
  const [length, setLength] = useState<(typeof LENGTHS)[number]>("Medium");
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>("General");
  const [desc, setDesc] = useState("");
  const [output, setOutput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    const g = generations.find((x) => x.id === id && x.type === "text");
    if (g) { setOutput(g.output); setPrompt(g.prompt); setSavedId(g.id); setDesc(g.meta.brief ?? ""); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, generations.length]);

  async function run() {
    if (desc.trim().length < 10) { setError("Describe what you want in at least 10 characters."); return; }
    const p = buildPrompt(type, desc, tone, length, audience);
    setError(""); setLoading(true); setPrompt(p); setEditing(false); setSavedId(null);
    const res = await generateTextFn({ data: { prompt: p } });
    setLoading(false);
    if (!res.ok) { setError(res.error); return; }
    setOutput(res.data);
    const g = studio.addGeneration({ type: "text", prompt: p, output: res.data, meta: { label: `${type}: ${desc.slice(0, 60)}`, brief: desc, tone, length, audience } });
    setSavedId(g.id);
  }

  function save() {
    if (savedId) studio.updateGeneration(savedId, { output, favourite: true });
    toast.success("Saved to favourites in History");
  }

  return (
    <div>
      <PageHeader kicker="Studio / Text" title="Text Generator">
        Pick a format, describe your goal, and tune the controls. Every control becomes part of a structured prompt you can inspect.
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Panel className="space-y-5">
          <Chips label="Content type" options={TYPES} value={type} onChange={setType} />
          <div>
            <label htmlFor="brief" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Describe what you want</label>
            <Textarea id="brief" rows={4} maxLength={1500} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. A post announcing I completed an introduction to AI course and what I learned about prompts." />
          </div>
          <Chips label="Tone" options={TONES} value={tone} onChange={setTone} />
          <Chips label="Length" options={LENGTHS} value={length} onChange={setLength} />
          <Chips label="Audience" options={AUDIENCES} value={audience} onChange={setAudience} />
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button onClick={run} disabled={loading} className="w-full" size="lg">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Generate Content
          </Button>
        </Panel>

        <div className="space-y-4">
          <Panel className="min-h-[360px]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-3">
              <span className="font-mono text-xs text-muted-foreground">output.md</span>
              <div className="flex flex-wrap gap-1">
                <Button size="sm" variant="ghost" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}><Copy /> Copy</Button>
                <Button size="sm" variant="ghost" disabled={!prompt || loading} onClick={run}><RefreshCw /> Regenerate</Button>
                <Button size="sm" variant="ghost" disabled={!output} onClick={() => setEditing(!editing)}><Pencil /> {editing ? "Done" : "Edit"}</Button>
                <Button size="sm" variant="ghost" disabled={!output} onClick={save}><Save /> Save</Button>
                <Button size="sm" variant="ghost" disabled={!output} onClick={() => { setOutput(""); setPrompt(""); setSavedId(null); }}><Trash2 /> Clear</Button>
              </div>
            </div>
            {loading ? (
              <div className="space-y-3">{[90, 75, 85, 60, 80].map((w, i) => <div key={i} className="scan h-3 rounded bg-muted" style={{ width: `${w}%` }} />)}</div>
            ) : editing ? (
              <Textarea rows={16} value={output} onChange={(e) => setOutput(e.target.value)} className="font-mono text-sm" />
            ) : output ? (
              <div className="whitespace-pre-wrap text-sm leading-7">{output}</div>
            ) : (
              <p className="py-20 text-center text-sm text-muted-foreground">Your generated content will appear here.</p>
            )}
          </Panel>
          {prompt && <PromptBlock text={prompt} />}
        </div>
      </div>
    </div>
  );
}
