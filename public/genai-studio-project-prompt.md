# GenAI Studio — Project Build Prompt

## Project goal

Build a polished, modern Generative AI Content Studio for an IT and AI portfolio. It must feel like a real product rather than a chatbot or static page. The experience should help a visitor explore, generate, compare, improve, and learn.

**Brand:** GenAI Studio  
**Tagline:** Explore. Generate. Experiment. Learn.

## Core experience

### 1. Dashboard

Create a welcoming dashboard with:

- A short, accessible explanation of Generative AI
- Feature links for Text Generation, Image Generation, Prompt Library, and Prompt Engineering Lab
- Recent generations
- Counts for prompts created, text generations, and image generations
- Clear actions: Generate Text, Generate Image, Explore Prompts, and Improve a Prompt

### 2. Text Generator

Include:

- Content types: blog post, social media caption, professional email, product description, story, CV or cover-letter content, summary, marketing copy, and general text
- A description field
- Tone options: Professional, Friendly, Casual, Persuasive, Creative, and Formal
- Length options: Short, Medium, and Long
- Audience options: General, Students, Professionals, Customers, and Developers
- A Generate Content action with loading, validation, and error states
- An editor-style result with Copy, Regenerate, Edit, Save, and Clear actions
- The final prompt used for generation

### 3. Image Generator

Include:

- An image-description field
- Style options: Photorealistic, Digital art, Illustration, 3D, Cinematic, Anime, Minimalist, and Watercolor
- Mood options: Professional, Dramatic, Calm, Futuristic, Energetic, and Mysterious
- Lighting options: Natural, Studio, Golden hour, Neon, and Cinematic
- Aspect ratios: Square, Portrait, and Landscape
- A Generate Image action with loading, validation, and error states
- Download, Regenerate, Save, and Copy Prompt actions
- The final image prompt used for generation

If a real image API is unavailable, provide a realistic mock while keeping the interface and logic ready for a future API connection.

### 4. Prompt Engineering Lab

Let a user enter a simple prompt and improve it. Show the original and improved versions side by side. Break the improved prompt into:

- Role
- Context
- Task
- Audience
- Constraints
- Output format

Explain why the prompt improved in clear, simple language. Identify relevant techniques such as role prompting, context, specific instructions, constraints, examples, output formatting, and iterative refinement. Never expose private chain-of-thought.

### 5. How Prompts Work

Create two interactive views: Text Prompt and Image Prompt.

For text, demonstrate how Audience, Tone, Context, Length, and Structure transform a basic prompt.

For images, demonstrate how Subject, Environment, Composition, Lighting, Camera, Style, Mood, and Colour transform a basic prompt.

Explain why text prompts work like written briefs while image prompts work more like visual shot lists.

### 6. Prompt Library

Create a searchable, filterable library. Users must be able to copy, favourite, save, and view prompt details.

Use these categories:

- Text Generation
- Image Generation
- Marketing
- Coding
- Data Analytics
- Career
- Education
- Productivity
- Creative Writing
- Prompt Engineering

Include 15–20 useful sample prompts. Each prompt should have a name, category, purpose, complete prompt, example output, and techniques used.

### 7. History

Save generations with their type, date, prompt, output preview, and favourite status. Separate Text and Image history and allow a saved item to be reopened.

## Portfolio pages

### Project page

Use the title **GenAI Studio — Text & Image Generation Lab** and include:

- Project overview
- Problem statement
- Objectives
- Features
- Technologies actually used
- Challenges
- Lessons learned

The objectives should cover exploring Generative AI, understanding prompt engineering, building a practical application, experimenting with text and images, comparing prompting approaches, and documenting the development process.

Do not claim technologies that were not used. Keep placeholders only where personal links or information have not been supplied.

### Prompt engineering case study

Create an interview-ready case study that demonstrates experimentation rather than only explaining theory. Include:

- The challenge and research question
- The evaluation method
- A text-generation experiment
- An image-generation experiment
- Initial and improved prompts
- Side-by-side output comparisons
- Prompt engineering techniques
- What worked
- What did not work
- Lessons learned
- Limitations and future improvements

Avoid unsupported performance statistics. Clearly distinguish observed qualitative findings from future measurements.

### Personal portfolio

Include:

- Home: introduction, short bio, skills, featured projects, and contact action
- About: education, career interests, technical skills, and AI interests
- Projects: GenAI Studio plus room for future work
- Case Studies: the prompt engineering case study
- Skills: Python, SQL, HTML/CSS, JavaScript, Git/GitHub, Data Analytics, Artificial Intelligence, Generative AI, Prompt Engineering, and Microsoft Office
- Contact: LinkedIn, GitHub, email, and a contact form, using placeholders until real details are supplied

## Technical and quality requirements

- Use a modern Lovable-supported React and TypeScript stack
- Use reusable components and a clean structure
- Make every page responsive and accessible
- Include loading states, error handling, input validation, and useful empty states
- Keep API keys in secure server-side environment variables and never expose them in browser code
- Separate presentation from generation logic so an API can be replaced later
- Save useful local activity such as history, favourites, and saved prompts
- Use accurate, unique page titles and descriptions for sharing and search

## Visual direction

- Modern typography and professional spacing
- Clean, restrained cards and controls
- Subtle motion that respects reduced-motion preferences
- Clear navigation across studio and portfolio sections
- Interview-ready presentation without looking like a ChatGPT clone
- Visually reinforce the workflow: **Experiment → Generate → Compare → Improve → Learn**

## Final outcome

The finished project should let the creator explain in an interview:

1. Why the product was built
2. What Generative AI is
3. How text and image generation differ
4. How prompts affect output quality and control
5. How prompts were tested and improved
6. What challenges appeared
7. What was learned
8. What would be improved next