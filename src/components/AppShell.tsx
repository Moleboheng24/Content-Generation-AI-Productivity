import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, PenLine, ImageIcon, FlaskConical, GitCompare, Library, History,
  Briefcase, FileText, Menu, X, Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const studioNav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/text", label: "Text Generator", icon: PenLine },
  { to: "/image", label: "Image Generator", icon: ImageIcon },
  { to: "/lab", label: "Prompt Lab", icon: FlaskConical },
  { to: "/how-prompts-work", label: "How Prompts Work", icon: GitCompare },
  { to: "/library", label: "Prompt Library", icon: Library },
  { to: "/history", label: "History", icon: History },
] as const;

const projectNav = [
  { to: "/project", label: "GenAI Project", icon: Briefcase },
  { to: "/case-study", label: "Case Study", icon: FileText },
  { to: "/case-studies/prompt-engineering", label: "Prompt Engineering Case Study", icon: FlaskConical },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

function NavGroup({ title, items, onNav }: { title: string; items: readonly { to: string; label: string; icon: typeof LayoutDashboard }[]; onNav: () => void }) {
  return (
    <div>
      <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <ul className="space-y-0.5">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              onClick={onNav}
              activeOptions={{ exact: to === "/" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "bg-sidebar-accent !text-primary font-medium" }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="min-h-screen lg:flex">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <button aria-label="Toggle navigation" onClick={() => setOpen(!open)} className="rounded-md p-2 hover:bg-accent">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r bg-sidebar p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 hidden lg:block"><Brand /></div>
        <nav className="space-y-6">
          <NavGroup title="Studio" items={studioNav} onNav={close} />
          <NavGroup title="Project" items={projectNav} onNav={close} />
        </nav>
        <p className="mt-8 px-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
          Explore. Generate.<br />Experiment. Learn.
        </p>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-background/70 lg:hidden" onClick={close} />}
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground">G/</span>
      <span className="font-semibold tracking-tight">GenAI Studio</span>
    </Link>
  );
}

export function PageHeader({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="fade-up mb-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{kicker}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {children && <p className="mt-3 max-w-2xl text-muted-foreground">{children}</p>}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border bg-card p-5 sm:p-6", className)}>{children}</div>;
}

export function Chips<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              value === o ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/60 hover:text-primary",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function PromptBlock({ title = "Prompt used", text }: { title?: string; text: string }) {
  return (
    <div className="rounded-xl border border-dashed bg-background/60 p-4">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{title}</p>
      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/85">{text}</pre>
    </div>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
