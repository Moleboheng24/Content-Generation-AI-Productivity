import { useSyncExternalStore } from "react";

export type Generation = {
  id: string;
  type: "text" | "image";
  createdAt: number;
  prompt: string;
  output: string; // text or image data URL
  meta: Record<string, string>;
  favourite: boolean;
};

type State = { generations: Generation[]; favPrompts: string[]; savedPrompts: string[]; promptsCreated: number };
const KEY = "genai-studio-v1";
const empty: State = { generations: [], favPrompts: [], savedPrompts: [], promptsCreated: 0 };
let state: State = empty;
let loaded = false;
const subs = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...empty, ...JSON.parse(raw) };
  } catch {}
}
function set(next: State) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // quota (large images): drop oldest images
    state = { ...state, generations: state.generations.slice(0, 20) };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }
  subs.forEach((f) => f());
}

export function useStudio() {
  return useSyncExternalStore(
    (f) => { load(); subs.add(f); f(); return () => subs.delete(f); },
    () => { load(); return state; },
    () => empty,
  );
}

export const studio = {
  addGeneration(g: Omit<Generation, "id" | "createdAt" | "favourite">) {
    load();
    const item: Generation = { ...g, id: crypto.randomUUID(), createdAt: Date.now(), favourite: false };
    set({ ...state, generations: [item, ...state.generations], promptsCreated: state.promptsCreated + 1 });
    return item;
  },
  updateGeneration(id: string, patch: Partial<Generation>) {
    set({ ...state, generations: state.generations.map((g) => (g.id === id ? { ...g, ...patch } : g)) });
  },
  removeGeneration(id: string) {
    set({ ...state, generations: state.generations.filter((g) => g.id !== id) });
  },
  countPrompt() {
    load();
    set({ ...state, promptsCreated: state.promptsCreated + 1 });
  },
  toggle(list: "favPrompts" | "savedPrompts", id: string) {
    load();
    const has = state[list].includes(id);
    set({ ...state, [list]: has ? state[list].filter((x) => x !== id) : [...state[list], id] });
  },
};
