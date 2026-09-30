import { createFileRoute, Link } from "@tanstack/react-router";
import { PenLine, ImageIcon, Library, FlaskConical, ArrowRight } from "lucide-react";
import { meta, Panel } from "@/components/AppShell";
import { useStudio } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => meta("GenAI Studio — Dashboard", "A hands-on lab for text generation, image generation and prompt engineering."),
  component: Dashboard,
});

const tools = [
  { to: "/text", icon: PenLine, title: "Text Generation", desc: "Blogs, emails, captions and more — shaped by tone, length and audience.", cta: "Generate Text" },
  { to: "/image", icon: ImageIcon, title: "Image Generation", desc: "Turn descriptions into images with control over style, mood and light.", cta: "Generate Image" },
  { to: "/library", icon: Library, title: "Prompt Library", desc: "20+ tested prompts across 10 categories, with the techniques behind them.", cta: "Explore Prompts" },
  { to: "/lab", icon: FlaskConical, title: "Prompt Engineering Lab", desc: "Paste a vague prompt and see it restructured — with the reasons why.", cta: "Improve a Prompt" },
] as const;

function Dashboard() {
  const s = useStudio();
  const text = s.generations.filter((g) => g.type === "text").length;
  const img = s.generations.filter((g) => g.type === "image").length;
  return (
    <div className="space-y-8">
      <section className="fade-up relative overflow-hidden rounded-3xl border bg-card p-6 sm:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Welcome to the lab</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Explore. Generate. <span className="text-primary">Experiment.</span> Learn.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          <strong className="text-foreground">Generative AI</strong> refers to models that create new content — text, images, code —
          by learning patterns from huge datasets and predicting what comes next. The quality of what they produce depends heavily on
          the instructions they receive. This studio is where I test that idea.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          {["Experiment", "Generate", "Compare", "Improve", "Learn"].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-full border px-3 py-1">{s}</span>
              {i < 4 && <ArrowRight className="h-3 w-3" />}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3 sm:gap-4">
        {[["Prompts created", s.promptsCreated], ["Text generations", text], ["Image generations", img]].map(([l, v]) => (
          <Panel key={l as string} className="fade-up">
            <p className="font-mono text-3xl font-medium text-primary sm:text-4xl">{v}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{l}</p>
          </Panel>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {tools.map(({ to, icon: Icon, title, desc, cta }, i) => (
          <Link key={to} to={to} className="group fade-up rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60" style={{ animationDelay: `${i * 60}ms` }}>
            <Icon className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <Panel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Recent generations</h2>
          <Link to="/history" className="text-sm text-primary">View all</Link>
        </div>
        {s.generations.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Nothing yet — your first generation will appear here.</p>
        ) : (
          <ul className="divide-y">
            {s.generations.slice(0, 5).map((g) => (
              <li key={g.id} className="flex items-center gap-4 py-3">
                {g.type === "image" ? (
                  <img src={g.output} alt="" className="h-12 w-12 rounded-lg object-cover" />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-muted"><PenLine className="h-4 w-4 text-muted-foreground" /></div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{g.meta.label ?? g.prompt}</p>
                  <p className="font-mono text-xs text-muted-foreground">{g.type} · {new Date(g.createdAt).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
