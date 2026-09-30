import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { meta, Panel } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/portfolio")({
  head: () => meta("Moleboheng Hlalele — IT & AI Portfolio", "IT graduate exploring data, AI and Generative AI through hands-on projects."),
  component: Home,
});

const SKILLS = ["Python", "SQL", "HTML/CSS", "JavaScript", "Git/GitHub", "Data Analytics", "Artificial Intelligence", "Generative AI", "Prompt Engineering", "Microsoft Office"];

function Home() {
  return (
    <div className="space-y-8">
      <section className="fade-up rounded-3xl border bg-card p-8 sm:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Portfolio</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Hi, I'm Moleboheng Hlalele.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">I'm an IT professional focused on data and artificial intelligence. I learn by building — turning concepts like prompt engineering into working tools I can test, measure and explain.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Button asChild><Link to="/contact">Contact me</Link></Button><Button variant="outline" asChild><Link to="/about">About me</Link></Button></div>
      </section>
      <Panel>
        <h2 className="mb-4 font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2">{SKILLS.map((s) => <span key={s} className="rounded-full border px-3 py-1 text-sm">{s}</span>)}</div>
      </Panel>
      <div>
        <h2 className="mb-4 font-semibold">Featured project</h2>
        <Link to="/project" className="group block rounded-2xl border bg-card p-6 transition-colors hover:border-primary/60">
          <p className="font-mono text-xs text-primary">Generative AI · Prompt Engineering</p>
          <h3 className="mt-2 text-xl font-semibold">GenAI Studio — Text & Image Generation Lab</h3>
          <p className="mt-2 text-sm text-muted-foreground">A working app for generating text and images and learning how prompt structure changes the results.</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">View project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
        </Link>
      </div>
    </div>
  );
}
