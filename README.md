# AI Alchemy Studio

Build a polished, modern Generative AI Content Studio web application that I can use as a practical project for my IT and AI portfolio.

The purpose of this project is to help me explore and demonstrate practical applications of Generative AI, prompt engineering, text generation, and AI image generation.

The application should feel like a real product rather than a basic chatbot or static portfolio page.

## PROJECT NAME

GenAI Studio — Text & Image Generation Lab

---

# 1. MAIN DASHBOARD

Create a professional dashboard as the landing page after entering the application.

Display:

* Welcome message
* Short explanation of what Generative AI is
* Text Generation card
* Image Generation card
* Prompt Library card
* Prompt Engineering Lab card
* Recent generations
* Number of prompts created
* Number of text generations
* Number of image generations

Include clear buttons such as:

Generate Text
Generate Image
Explore Prompts
Improve a Prompt

Use a clean, modern AI/technology aesthetic with subtle animations and responsive design.

---

# 2. TEXT GENERATOR

Create a dedicated Text Generator page.

Allow users to select the type of content they want to generate.

Options should include:

* Blog post
* Social media caption
* Professional email
* Product description
* Story
* CV/cover-letter content
* Summary
* Marketing copy
* General text

The user should be able to enter a description of what they want.

Include additional controls such as:

Tone
* Professional
* Friendly
* Casual
* Persuasive
* Creative
* Formal

Length
* Short
* Medium
* Long

Audience
* General
* Students
* Professionals
* Customers
* Developers

Allow the user to click:

Generate Content

Display the generated content in a clean editor-style output area.

Include:

* Copy button
* Regenerate button
* Edit button
* Save button
* Clear button

Also display the prompt that was used to generate the content.

---

# 3. IMAGE GENERATOR

Create a dedicated AI Image Generator page.

Allow users to describe the image they want to create.

For example:

"A futuristic Johannesburg skyline at sunset with a cyberpunk aesthetic."

Include controls for:

Style
* Photorealistic
* Digital art
* Illustration
* 3D
* Cinematic
* Anime
* Minimalist
* Watercolor

Mood
* Professional
* Dramatic
* Calm
* Futuristic
* Energetic
* Mysterious

Lighting
* Natural
* Studio
* Golden hour
* Neon
* Cinematic

Aspect Ratio
* Square
* Portrait
* Landscape

Include:

Generate Image

Display the generated image prominently.

Under the image provide:

* Download button
* Regenerate button
* Save button
* Copy Prompt button

Also display the final image-generation prompt used.

If a real image-generation API is not connected initially, create a realistic placeholder/mock generation experience while keeping the architecture ready for integration with an actual image-generation API.

---

# 4. PROMPT ENGINEERING LAB

Create a section called:

Prompt Engineering Lab

This should be one of the main educational features of the project.

Allow the user to enter a simple prompt.

Example:

"Write a post about AI."

Then provide an Improve Prompt button.

Show:

### Original Prompt
The user's original prompt.

### Improved Prompt
A more detailed version containing:
* Role
* Context
* Task
* Audience
* Constraints
* Desired output format

### Why It Was Improved
Explain the changes in simple language.

For example:
"The original prompt is broad and does not specify the audience, tone, length, or desired structure. The improved prompt provides this context so the model can produce a more targeted response."

Show the prompt engineering techniques used.

Include:
* Role prompting
* Context
* Specific instructions
* Constraints
* Examples
* Output formatting
* Iterative refinement

Do not expose private chain-of-thought. Instead, provide concise explanations of the prompt improvements and observable output differences.

---

# 5. TEXT VS IMAGE PROMPT EXPLORATION

Create an educational section called:

How Prompts Work

Allow users to compare prompts for different generative AI tasks.

Create two tabs:

### Text Prompt
Example:
"Write a professional LinkedIn post about learning Artificial Intelligence."

Show how adding:
* Audience
* Tone
* Context
* Length
* Structure
changes the prompt.

### Image Prompt
Example:
"A woman working on a laptop."

Then demonstrate how adding:
* Subject
* Environment
* Composition
* Lighting
* Camera perspective
* Art style
* Mood
* Color/visual characteristics
creates a much more detailed image prompt.

Include a simple explanation of why image-generation prompts often require different descriptive elements from text-generation prompts.

---

# 6. PROMPT LIBRARY

Create a searchable Prompt Library.

Users should be able to:
* Search prompts
* Filter by category
* Copy prompts
* Favourite prompts
* Save prompts
* View prompt details

Categories:
* Text Generation
* Image Generation
* Marketing
* Coding
* Data Analytics
* Career
* Education
* Productivity
* Creative Writing
* Prompt Engineering

Add realistic sample prompts.

Each prompt should contain:
Prompt Name
Category
Purpose
Prompt
Example Output
Techniques Used

Include at least 15–20 example prompts so the library looks populated.

---

# 7. GENERATION HISTORY

Create a History section.

Save previous generations and display:
* Generation type
* Date
* Prompt
* Output preview
* Favourite status

Allow users to reopen previous generations.

Separate them into:
Text and Images

---

# 8. PORTFOLIO PROJECT PAGE

Create a professional portfolio page for this project.

Project title:
GenAI Studio — Text & Image Generation Lab

Include:
### Project Overview
Explain that this project explores practical applications of Generative AI through text generation, image generation, and prompt engineering.

### Problem Statement
Explain that Generative AI can produce very different results depending on how instructions are written. The project explores how structured prompting can improve the quality and consistency of AI-generated content.

### Objectives
Include:
* Explore Generative AI
* Understand prompt engineering
* Build a practical AI-powered application
* Experiment with text generation
* Experiment with image generation
* Compare different prompting approaches
* Document the development process

### Features
List all major features of the application.

### Technologies
Include placeholders for the technologies actually used.
For example:
* React
* JavaScript/TypeScript
* HTML/CSS
* AI APIs
* Git/GitHub
* Lovable

Do not claim technologies that are not actually used.

### Challenges
Include realistic development challenges such as:
* Designing effective prompts
* Managing AI-generated responses
* Handling API integration
* Designing a useful user experience
* Maintaining consistent output

### Lessons Learned
Discuss:
* Prompt specificity
* Context
* Constraints
* Iterative prompting
* Differences between text and image generation
* AI limitations
* Importance of testing outputs

---

# 9. PROMPT ENGINEERING CASE STUDY

Create a separate case-study page:
Prompt Engineering Case Study: Exploring Generative AI

Structure it as:
1. Introduction
2. What is Generative AI?
3. Text Generation Experiment
4. Image Generation Experiment
5. Initial Prompt
6. Improved Prompt
7. Output Comparison
8. Prompt Engineering Techniques
9. What Worked
10. What Did Not Work
11. Lessons Learned
12. Future Improvements

Include visual comparisons wherever appropriate.

The case study should demonstrate the actual experimentation process rather than simply explaining theoretical concepts.

---

# 10. PORTFOLIO STRUCTURE

Expand the portfolio around this project.

Create:

### Home
* Professional introduction
* Short bio
* Skills
* Featured projects
* Contact button

### About
* Education
* Career interests
* Technical skills
* AI interests

### Projects
Include:
GenAI Studio — Text & Image Generation Lab
Leave space for additional projects.

### Case Studies
Include:
Generative AI & Prompt Engineering Case Study

### Skills
Include:
* Python
* SQL
* HTML/CSS
* JavaScript
* Git/GitHub
* Data Analytics
* Artificial Intelligence
* Generative AI
* Prompt Engineering
* Microsoft Office

Only display skills that I can realistically demonstrate or edit later.

### Contact
Include:
* LinkedIn
* GitHub
* Email
* Contact form

Use placeholder links where necessary so I can replace them later.

---

# 11. TECHNICAL REQUIREMENTS

Build this using a modern web stack supported by Lovable.

Use:
* Reusable components
* Clean project structure
* Responsive design
* Accessible UI
* Loading states
* Error handling
* Input validation
* Empty states
* Responsive mobile design

If AI APIs are required, use secure environment variables for API keys.
Never expose API keys in frontend code.
Design the application so that I can connect real AI APIs later.
If an API is not available during initial development, use realistic mock responses while maintaining a clear separation between the frontend and AI-generation logic.

---

# 12. DESIGN REQUIREMENTS

The application should look like a professional AI product.

Use:
* Modern typography
* Clean cards
* Rounded components
* Subtle animations
* Clear navigation
* Responsive layouts
* Professional spacing
* Attractive but not excessive visual effects

The interface should feel suitable for presentation to employers during an interview.

Do not make it look like a generic ChatGPT clone.

The primary focus should be:
Experiment → Generate → Compare → Improve → Learn

Make the application visually demonstrate that I am exploring how Generative AI works rather than simply consuming AI-generated content.

---

# 13. IMPORTANT

Build the application with portfolio presentation in mind.

I want to be able to explain this project during an interview by discussing:
* Why I built it
* What Generative AI is
* How text generation works
* How image generation works
* How prompts affect outputs
* How I improved prompts
* What challenges I encountered
* What I learned
* What I would improve next

Make the project feel like a genuine learning + experimentation project that evolved into a functional AI application.

Use the final branding:
GenAI Studio
Explore. Generate. Experiment. Learn.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://intelligent-artisan-studio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5d7f6c37-c294-4459-a4cc-d815a16b2b83).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
