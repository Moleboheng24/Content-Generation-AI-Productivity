import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

async function wrap<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong" };
  }
}

export const generateTextFn = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ prompt: z.string().min(5).max(4000) }).parse(d))
  .handler(async ({ data }) => {
    const { completeText } = await import("./ai.server");
    return wrap(() =>
      completeText(
        "You are a skilled content writer. Follow the brief exactly. Output only the requested content in clean Markdown, no preamble.",
        data.prompt,
      ),
    );
  });

export const generateImageFn = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ prompt: z.string().min(5).max(4000), size: z.enum(["1024x1024", "1024x1536", "1536x1024"]) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { createImage } = await import("./ai.server");
    return wrap(() => createImage(data.prompt, data.size));
  });

export type Improvement = {
  improved: string;
  parts: { role: string; context: string; task: string; audience: string; constraints: string; format: string };
  why: string;
  techniques: string[];
};

export const improvePromptFn = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ prompt: z.string().min(3).max(2000) }).parse(d))
  .handler(async ({ data }) => {
    const { completeText } = await import("./ai.server");
    return wrap(async () => {
      const raw = await completeText(
        `You are a prompt engineering tutor. Rewrite the user's prompt into a stronger prompt. Respond ONLY with JSON of shape:
{"parts":{"role":"...","context":"...","task":"...","audience":"...","constraints":"...","format":"..."},"improved":"full improved prompt as one paragraph block","why":"2-4 plain-language sentences on what was missing and what changed","techniques":["subset of: Role prompting, Context, Specific instructions, Constraints, Examples, Output formatting, Iterative refinement"]}
Do not include reasoning traces—only concise explanations.`,
        data.prompt,
      );
      const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
      const parsed = JSON.parse(json) as Improvement;
      if (!parsed.improved) throw new Error("Could not parse the improved prompt.");
      return parsed;
    });
  });
