// Server-only AI Gateway helpers. API key never leaves the server.
const BASE = "https://ai.gateway.lovable.dev/v1";
export const TEXT_MODEL = "openai/gpt-6-astra";
export const IMAGE_MODEL = "openai/gpt-image-2.5-sunburst";

export class GatewayError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function key() {
  const k = process.env['LOVABLE_API_KEY'];
  if (!k) throw new GatewayError(401, "AI is not configured on the server.");
  return k;
}

async function fail(res: Response): Promise<never> {
  let msg = `AI request failed (${res.status})`;
  try {
    const j = await res.json();
    msg = j?.error?.message || j?.message || msg;
  } catch {}
  if (res.status === 429) msg = "Rate limited — please wait a moment and try again.";
  if (res.status === 402) msg = "AI credits exhausted. Add credits to continue.";
  throw new GatewayError(res.status, msg);
}

async function* sse(res: Response) {
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf("\n\n")) >= 0) {
      const frame = buf.slice(0, i);
      buf = buf.slice(i + 2);
      const data = frame
        .split("\n")
        .filter((l) => l.startsWith("data:"))
        .map((l) => l.slice(5).trim())
        .join("");
      if (!data || data === "[DONE]") continue;
      try {
        yield JSON.parse(data);
      } catch {}
    }
  }
}

export async function completeText(instructions: string, input: string): Promise<string> {
  const res = await fetch(`${BASE}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({ model: TEXT_MODEL, instructions, input, stream: true }),
  });
  if (!res.ok) await fail(res);
  let out = "";
  for await (const ev of sse(res)) {
    if (ev.type === "response.output_text.delta") out += ev.delta ?? "";
    if (ev.type === "response.failed" || ev.type === "error")
      throw new GatewayError(500, ev?.response?.error?.message || ev?.error?.message || "Generation failed");
    if (ev.type === "response.refusal.delta") throw new GatewayError(400, "The model declined this request.");
  }
  if (!out.trim()) throw new GatewayError(500, "The model returned an empty response.");
  return out.trim();
}

export async function createImage(prompt: string, size: string): Promise<string> {
  const res = await fetch(`${BASE}/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({ model: IMAGE_MODEL, prompt, size, stream: true, partial_images: 1 }),
  });
  if (!res.ok) await fail(res);
  let b64 = "";
  for await (const ev of sse(res)) {
    if (ev?.error) throw new GatewayError(500, ev.error.message || "Image generation failed");
    const v = ev?.b64_json ?? ev?.data?.[0]?.b64_json;
    if (v) b64 = v;
  }
  if (!b64) throw new GatewayError(500, "No image was returned.");
  return `data:image/png;base64,${b64}`;
}
