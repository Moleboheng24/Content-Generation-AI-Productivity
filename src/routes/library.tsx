import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Copy, Heart, Bookmark, Eye } from "lucide-react";
import { meta, PageHeader, PromptBlock } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CATEGORIES, PROMPTS, type LibraryPrompt } from "@/lib/prompts-data";
import { studio, useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library")({
  head: () => meta("Prompt Library — GenAI Studio", "A searchable library of tested prompts across 10 categories."),
  component: LibraryPage,
});

function LibraryPage() {
  const s = useStudio();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [only, setOnly] = useState<"all" | "fav" | "saved">("all");
  const [open, setOpen] = useState<LibraryPrompt | null>(null);

  const list = useMemo(() => PROMPTS.filter((p) =>
    (cat === "All" || p.category === cat) &&
    (only === "all" || (only === "fav" ? s.favPrompts : s.savedPrompts).includes(p.id)) &&
    (p.name + p.prompt + p.purpose).toLowerCase().includes(q.toLowerCase()),
  ), [q, cat, only, s.favPrompts, s.savedPrompts]);

  const copy = (t: string) => { navigator.clipboard.writeText(t); toast.success("Prompt copied"); };

  return (
    <div>
      <PageHeader kicker="Resources / Library" title="Prompt Library">{PROMPTS.length} prompts, each annotated with the techniques that make it work.</PageHeader>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Search prompts" placeholder="Search prompts…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-lg border p-1">
          {(["all", "fav", "saved"] as const).map((o) => (
            <button key={o} onClick={() => setOnly(o)} className={cn("rounded-md px-3 py-1 text-xs", only === o && "bg-accent text-primary")}>{o === "all" ? "All" : o === "fav" ? "Favourites" : "Saved"}</button>
          ))}
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("rounded-full border px-3 py-1 text-xs", cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>{c}</button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed py-16 text-center text-sm text-muted-foreground">No prompts match. Try another search or category.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((p) => {
            const fav = s.favPrompts.includes(p.id), saved = s.savedPrompts.includes(p.id);
            return (
              <article key={p.id} className="fade-up flex flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{p.category}</p>
                <h2 className="mt-2 font-semibold">{p.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.purpose}</p>
                <p className="mt-3 line-clamp-3 font-mono text-xs text-foreground/70">{p.prompt}</p>
                <div className="mt-3 flex flex-wrap gap-1">{p.techniques.map((t) => <span key={t} className="rounded bg-muted px-2 py-0.5 text-[10px]">{t}</span>)}</div>
                <div className="mt-auto flex gap-1 pt-4">
                  <Button size="icon" variant="ghost" aria-label="Copy" onClick={() => copy(p.prompt)}><Copy /></Button>
                  <Button size="icon" variant="ghost" aria-label="Favourite" onClick={() => studio.toggle("favPrompts", p.id)}><Heart className={cn(fav && "fill-signal text-signal")} /></Button>
                  <Button size="icon" variant="ghost" aria-label="Save" onClick={() => studio.toggle("savedPrompts", p.id)}><Bookmark className={cn(saved && "fill-primary text-primary")} /></Button>
                  <Button size="sm" variant="ghost" className="ml-auto" onClick={() => setOpen(p)}><Eye /> Details</Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {open && (<>
            <DialogHeader><DialogTitle>{open.name}</DialogTitle><DialogDescription>{open.category} · {open.purpose}</DialogDescription></DialogHeader>
            <div className="space-y-3">
              <PromptBlock title="Prompt" text={open.prompt} />
              <PromptBlock title="Example output" text={open.example} />
              <div className="flex flex-wrap gap-1">{open.techniques.map((t) => <span key={t} className="rounded bg-muted px-2 py-0.5 text-xs">{t}</span>)}</div>
              <Button onClick={() => copy(open.prompt)}><Copy /> Copy prompt</Button>
            </div>
          </>)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
