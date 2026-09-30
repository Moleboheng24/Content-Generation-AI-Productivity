import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Download, RefreshCw, Save, Copy, Loader2, Wand2, ImageIcon } from "lucide-react";
import { Chips, meta, PageHeader, Panel, PromptBlock } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateImageFn } from "@/lib/ai.functions";
import { studio, useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/image")({
  head: () => meta("AI Image Generator — GenAI Studio", "Describe an image and control style, mood, lighting and aspect ratio."),
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : undefined }),
  component: ImagePage,
});

const STYLES = ["Photorealistic", "Digital art", "Illustration", "3D", "Cinematic", "Anime", "Minimalist", "Watercolor"] as const;
const MOODS = ["Professional", "Dramatic", "Calm", "Futuristic", "Energetic", "Mysterious"] as const;
const LIGHTS = ["Natural", "Studio", "Golden hour", "Neon", "Cinematic"] as const;
const RATIOS = ["Square", "Portrait", "Landscape"] as const;
const SIZE = { Square: "1024x1024", Portrait: "1024x1536", Landscape: "1536x1024" } as const;
const ASPECT = { Square: "aspect-square", Portrait: "aspect-[2/3]", Landscape: "aspect-[3/2]" };

function ImagePage() {
  const { id } = Route.useSearch();
  const { generations } = useStudio();
  const [desc, setDesc] = useState("A futuristic Johannesburg skyline at sunset with a cyberpunk aesthetic.");
  const [style, setStyle] = useState<(typeof STYLES)[number]>("Cinematic");
  const [mood, setMood] = useState<(typeof MOODS)[number]>("Futuristic");
  const [light, setLight] = useState<(typeof LIGHTS)[number]>("Golden hour");
  const [ratio, setRatio] = useState<(typeof RATIOS)[number]>("Landscape");
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    const g = generations.find((x) => x.id === id && x.type === "image");
    if (g) { setImage(g.output); setPrompt(g.prompt); setSavedId(g.id); setRatio((g.meta.ratio as typeof ratio) ?? "Square"); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, generations.length]);

  async function run() {
    if (desc.trim().length < 10) { setError("Describe the image in at least 10 characters."); return; }
    const p = `${desc.trim().replace(/\.$/, "")}. Style: ${style.toLowerCase()}. Mood: ${mood.toLowerCase()}. Lighting: ${light.toLowerCase()} lighting. Composition: ${ratio.toLowerCase()} framing, clear focal subject, high detail, coherent colour palette.`;
    setError(""); setLoading(true); setPrompt(p); setSavedId(null);
    const res = await generateImageFn({ data: { prompt: p, size: SIZE[ratio] } });
    setLoading(false);
    if (!res.ok) { setError(res.error); return; }
    setImage(res.data);
    const g = studio.addGeneration({ type: "image", prompt: p, output: res.data, meta: { label: desc.slice(0, 70), style, mood, light, ratio } });
    setSavedId(g.id);
  }

  return (
    <div>
      <PageHeader kicker="Studio / Image" title="AI Image Generator">
        Image models respond to visual vocabulary — subject, style, lighting, framing. Each control appends a descriptor to the final prompt.
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Panel className="space-y-5">
          <div>
            <label htmlFor="idesc" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Describe the image</label>
            <Textarea id="idesc" rows={4} maxLength={1000} value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <Chips label="Style" options={STYLES} value={style} onChange={setStyle} />
          <Chips label="Mood" options={MOODS} value={mood} onChange={setMood} />
          <Chips label="Lighting" options={LIGHTS} value={light} onChange={setLight} />
          <Chips label="Aspect ratio" options={RATIOS} value={ratio} onChange={setRatio} />
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button onClick={run} disabled={loading} className="w-full" size="lg">
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />} Generate Image
          </Button>
        </Panel>
        <div className="space-y-4">
          <Panel>
            <div className={cn("mx-auto w-full max-h-[70vh] overflow-hidden rounded-xl border bg-muted", ASPECT[ratio], ratio === "Portrait" && "max-w-sm")}>
              {loading ? (
                <div className="scan grid h-full place-items-center text-sm text-muted-foreground">Rendering… this can take up to a minute</div>
              ) : image ? (
                <img src={image} alt={desc} className="h-full w-full object-cover fade-up" />
              ) : (
                <div className="grid h-full place-items-center text-muted-foreground"><ImageIcon className="h-10 w-10" /></div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-1">
              <Button size="sm" variant="ghost" disabled={!image} asChild={!!image}>
                {image ? <a href={image} download="genai-studio.png"><Download /> Download</a> : <span><Download /> Download</span>}
              </Button>
              <Button size="sm" variant="ghost" disabled={!prompt || loading} onClick={run}><RefreshCw /> Regenerate</Button>
              <Button size="sm" variant="ghost" disabled={!savedId} onClick={() => { savedId && studio.updateGeneration(savedId, { favourite: true }); toast.success("Saved to favourites"); }}><Save /> Save</Button>
              <Button size="sm" variant="ghost" disabled={!prompt} onClick={() => { navigator.clipboard.writeText(prompt); toast.success("Prompt copied"); }}><Copy /> Copy Prompt</Button>
            </div>
          </Panel>
          {prompt && <PromptBlock title="Final image prompt" text={prompt} />}
        </div>
      </div>
    </div>
  );
}
