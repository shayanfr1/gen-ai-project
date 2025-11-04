# Gen-AI Meal Image Generator

This project uses Next.js and the OpenAI API to generate senior-friendly food images from simple text prompts. The goal is to support research on accessible nutrition visualization for older adults by producing clear, gentle, and realistic meal images suitable for seniors.

## How It Works
- User enters a food name or meal description (example: "grilled salmon and vegetables")
- The backend refines the prompt to optimize for clarity, portion size, and senior-friendly presentation
- OpenAI generates a realistic food image using the refined prompt
- The result displays within a clean, accessible interface

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS (optional for UI)
- OpenAI API

## Project Purpose
Older adults often benefit from visual cues for meal planning and nutrition. This project explores how AI-generated food imagery can help seniors visualize accessible, appealing meals that promote healthy eating habits.

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Create environment file
Create a file named `.env.local` in the project root and add:
```
OPENAI_API_KEY=your_key_here
```

### 3. Run the app
```bash
npm run dev
```

Visit:
```
http://localhost:3000
```

## Project Structure
```
app/
  api/generate/route.ts     # API route for OpenAI
  page.tsx                  # Main UI
lib/
  refinePrompt.ts           # Refines user input into senior-friendly prompt
.env.local                  # API key file (ignored)
```

## Status
✅ Working prototype  
✅ Secure API key handling  
🚧 Deployment to Vercel coming soon  

## Future Enhancements
- Upload prompt screenshots and compare outputs
- UI to select portion size and texture
- Voice input for accessibility
- Nutrition breakdown for each result
- Save / share image options