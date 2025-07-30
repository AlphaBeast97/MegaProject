# 🧠 Recipe Generator — PRD (Updated)

## 🔍 Problem Statement
People often struggle with deciding what to cook based on ingredients they have, or recognizing a dish they’ve eaten. This app solves that by letting users:
- Input ingredients
- Upload a photo of a dish
- Get surprise recipe suggestions

All powered by AI (Google AI Studio) via n8n.

---

## 🎯 Goal
Build a fun, mobile-friendly AI-powered recipe generation app that works through multiple input modes:
- Text-based ingredients
- Random generation
- Image upload

---

## 🧩 Core Features

| Feature                  | Description |
|--------------------------|-------------|
| Home Page (NEW LOGIC)    | Landing hub showing all features with AI hype, buttons to get started |
| Auth via Magic Link      | Passwordless login via email |
| Input Ingredients        | User types ingredients, filters by diet |
| Random Recipe            | Instantly generates a random recipe |
| Image-to-Recipe          | Upload a photo of a dish to get its recipe |
| Recipe Viewer            | Title, time, servings, instructions |
| Save Recipe (optional)   | Save recipe to MongoDB |
| About Page               | Info about project, tech, credits |
| Mobile-Responsive UI     | Works well on all screen sizes |

---

## 📐 App Pages & Navigation

### 1. Home Page (`/`)
- **Overview of Features**:
  - “Generate from ingredients”
  - “Random recipe”
  - “Image-to-recipe”
- Short blurb hyping AI usefulness
- Button: **“Get Started”**
  - If **not logged in** → redirect to `/auth`
  - If **logged in** → route to selected operation (`/ingredients`, `/random`, `/upload`)

### 2. Auth Page (`/auth`)
- Email input
- "Send Magic Link" button

### 3. Ingredients Page (`/ingredients`)
- Ingredients input
- Diet filter
- “Generate Recipe” button

### 4. Random Page (`/random`)
- Auto-triggers random recipe generation
- Shows loading UI → recipe result

### 5. Upload Page (`/upload`)
- Image uploader
- Calls AI image → recipe pipeline
- Shows output

### 6. Recipe View Page (`/recipe`)
- Title, cook time, servings
- Steps
- “Save” / “Regenerate” buttons

### 7. About Page (`/about`)
- Mission, tech stack, credits

---

## 🧠 AI Workflow (via n8n + Google AI Studio)

| Mode            | Flow |
|-----------------|------|
| Ingredients     | Prompt with ingredient list |
| Random          | General creative recipe prompt |
| Image-to-recipe | Send base64 image → dish + recipe |

---

## ⚙️ Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | Next.js 15 (App Router)     |
| Auth        | Magic.link or Clerk         |
| Database    | MongoDB                     |
| AI Backend  | n8n + Google AI Studio API  |
| Deployment  | Vercel                      |

---

## ✅ Milestones

| Task                     | Deadline | Path |
|--------------------------|----------|------|
| PRD + Wireframes         | Day 1    | `/grand-project/docs/` |
| Backend & DB Setup       | Day 2    | `/grand-project/api/`  |
| Frontend UI              | Day 3    | `/grand-project/app/`  |
| AI logic + testing       | Day 4    | `/grand-project/ai/`   |
| Public demo live         | Day 5    | —                      |
| Docs + Loom walkthrough  | Day 6    | `README.md`            |

---

## ✅ MVP Checklist

- [ ] Home page with feature showcase
- [ ] Auth page
- [ ] Ingredients → recipe page
- [ ] Random recipe page
- [ ] Image upload → recipe page
- [ ] Recipe view
- [ ] About page
- [ ] Vercel deployment
