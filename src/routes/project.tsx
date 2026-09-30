import { createFileRoute, Link } from "@tanstack/react-router";
import { meta, PageHeader, Panel } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/project")({
  head: () => meta("GenAI Studio Project Overview — Portfolio", "Overview, objectives, challenges and lessons from building GenAI Studio."),
  component: ProjectPage,
});

const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Panel><h2 className="mb-3 text-lg font-semibold">{title}</h2><div className="space-y-2 text-sm leading-6 text-muted-foreground">{children}</div></Panel>
);
const Ul = ({ items }: { items: string[] }) => <ul className="list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>;

function ProjectPage() {
  return (
    <div>
      <PageHeader kicker="Portfolio / Project" title="GenAI Studio — Text & Image Generation Lab">Explore. Generate. Experiment. Learn.</PageHeader>
      <div className="grid gap-4 md:grid-cols-2">
        <S title="Project Overview"><p>GenAI Studio explores practical applications of Generative AI through text generation, image generation and prompt engineering — built as a working product, not a static demo.</p></S>
        <S title="Problem Statement"><p>Generative AI can produce very different results depending on how instructions are written. This project explores how structured prompting improves the quality and consistency of AI-generated content.</p></S>
        <S title="Objectives"><Ul items={["Explore Generative AI", "Understand prompt engineering", "Build a practical AI-powered application", "Experiment with text generation", "Experiment with image generation", "Compare different prompting approaches", "Document the development process"]} /></S>
        <S title="Features"><Ul items={["Dashboard with usage stats and recent work", "Text generator with type, tone, length and audience controls", "Image generator with style, mood, lighting and aspect ratio", "Prompt Engineering Lab with explained rewrites", "Interactive text vs image prompt builder", "Searchable prompt library (20+ prompts)", "Generation history with favourites and reopen", "Case study documenting experiments"]} /></S>
        <S title="Technologies"><Ul items={["React 19 + TypeScript", "TanStack Start (routing & server functions)", "Tailwind CSS", "Lovable AI Gateway (text & image models, key kept server-side)", "Lovable (build platform)", "Git/GitHub — [add repo link]"]} /></S>
        <S title="Challenges"><Ul items={["Designing effective prompts that generalise across inputs", "Managing and parsing AI-generated responses reliably", "Handling API integration, errors and rate limits", "Designing a UX that teaches rather than just outputs", "Maintaining consistent output quality"]} /></S>
        <S title="Lessons Learned"><Ul items={["Specificity: vague prompts yield generic output", "Context: models can't infer what they aren't told", "Constraints: length and tone limits improve focus", "Iteration: the first prompt is rarely the best", "Text vs image: briefs vs visual shot lists", "Limitations: models can be confidently wrong", "Testing: outputs must be reviewed, not trusted blindly"]} /></S>
      </div>
      <div className="mt-6 flex gap-3"><Button asChild><Link to="/">Open the Studio</Link></Button><Button variant="outline" asChild><Link to="/case-study">Read the case study</Link></Button></div>
    </div>
  );
}
