import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Linkedin, Github, Mail } from "lucide-react";
import { meta, PageHeader, Panel } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact — Moleboheng Hlalele", "Get in touch via LinkedIn, GitHub, email or the contact form."),
  component: Contact,
});

const EMAIL = "your.email@example.com";

function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || f.message.trim().length < 10) { setErr("Please add your name, a valid email and a message of at least 10 characters."); return; }
    setErr("");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio enquiry from " + f.name)}&body=${encodeURIComponent(f.message + "\n\n— " + f.email)}`;
    toast.success("Opening your email app…");
  }
  return (
    <div>
      <PageHeader kicker="Portfolio / Contact" title="Let's talk" />
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Panel className="space-y-3">
          {[[Linkedin, "LinkedIn", "https://linkedin.com/in/your-profile"], [Github, "GitHub", "https://github.com/your-username"], [Mail, EMAIL, `mailto:${EMAIL}`]].map(([Icon, l, h]) => {
            const I = Icon as typeof Mail;
            return <a key={l as string} href={h as string} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border p-3 text-sm hover:border-primary/60"><I className="h-4 w-4 text-primary" />{l as string}</a>;
          })}
        </Panel>
        <Panel>
          <form onSubmit={submit} className="space-y-4" noValidate>
            <Input aria-label="Name" placeholder="Name" maxLength={100} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            <Input aria-label="Email" type="email" placeholder="Email" maxLength={255} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            <Textarea aria-label="Message" rows={5} placeholder="Message" maxLength={1000} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <Button type="submit">Send message</Button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
