import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2, ExternalLink, History as HistoryIcon } from "lucide-react";
import { meta, PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studio, useStudio, type Generation } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  head: () => meta("Generation History — GenAI Studio", "Review, favourite and reopen previous text and image generations."),
  component: HistoryPage,
});

function List({ items }: { items: Generation[] }) {
  if (!items.length)
    return (
      <div className="rounded-2xl border border-dashed py-16 text-center text-sm text-muted-foreground">
        <HistoryIcon className="mx-auto mb-3 h-6 w-6" />No generations yet.
      </div>
    );
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((g) => (
        <article key={g.id} className="fade-up flex gap-4 rounded-2xl border bg-card p-4">
          {g.type === "image" && <img src={g.output} alt="" className="h-24 w-24 shrink-0 rounded-lg object-cover" />}
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{g.type} · {new Date(g.createdAt).toLocaleString()}</p>
            <p className="mt-1 truncate text-sm font-medium">{g.meta.label}</p>
            {g.type === "text" && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{g.output}</p>}
            <p className="mt-1 line-clamp-1 font-mono text-[11px] text-foreground/60">{g.prompt}</p>
            <div className="mt-2 flex gap-1">
              <Button size="icon" variant="ghost" aria-label="Favourite" onClick={() => studio.updateGeneration(g.id, { favourite: !g.favourite })}><Heart className={cn(g.favourite && "fill-signal text-signal")} /></Button>
              <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => studio.removeGeneration(g.id)}><Trash2 /></Button>
              <Button size="sm" variant="ghost" asChild>
                <Link to={g.type === "text" ? "/text" : "/image"} search={{ id: g.id }}><ExternalLink /> Reopen</Link>
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function HistoryPage() {
  const { generations } = useStudio();
  return (
    <div>
      <PageHeader kicker="Studio / History" title="Generation History">Stored locally in this browser.</PageHeader>
      <Tabs defaultValue="text">
        <TabsList className="mb-6">
          <TabsTrigger value="text">Text ({generations.filter((g) => g.type === "text").length})</TabsTrigger>
          <TabsTrigger value="image">Images ({generations.filter((g) => g.type === "image").length})</TabsTrigger>
        </TabsList>
        <TabsContent value="text"><List items={generations.filter((g) => g.type === "text")} /></TabsContent>
        <TabsContent value="image"><List items={generations.filter((g) => g.type === "image")} /></TabsContent>
      </Tabs>
    </div>
  );
}
