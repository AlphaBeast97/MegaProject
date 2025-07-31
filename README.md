# 🍳 Culinary Canvas

**An AI-Powered Recipe Management Platform**

Culinary Canvas is a modern, intelligent recipe management application that transforms how you discover, create, and manage recipes. Built with cutting-edge AI technology, it offers innovative features like image-to-recipe generation, random recipe suggestions, and ingredients-based recipe creation.

![Project Banner](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)

## 🌟 Features

### 🤖 AI-Powered Recipe Generation

- **Image to Recipe**: Upload any food image and get a complete recipe with ingredients and cooking instructions
- **Random Recipe Generator**: Discover new culinary adventures with AI-generated recipes tailored to your preferences
- **Ingredient-Based Creation**: Input available ingredients and get personalized recipe suggestions
- **Smart Recipe Optimization**: AI-assisted recipe creation with automatic image generation and nutritional insights

### 🍽️ Recipe Management

- **Complete Recipe Database**: Store and organize your personal recipe collection
- **Advanced Search & Filtering**: Find recipes by ingredients, category, dietary preferences, and more
- **Recipe Details**: Comprehensive recipe view with ingredients, step-by-step instructions, prep/cook times
- **Mobile-Responsive Design**: Perfect experience across all devices

### 🔐 Authentication & User Management

- **Secure Authentication**: Powered by Clerk with support for Google and GitHub OAuth
- **User Profiles**: Personalized dashboard with recipe statistics and recent activity
- **Cloud Storage**: Automatic image storage and optimization via Cloudinary

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Authentication**: Clerk
- **AI Integration**: Genkit with Gemini AI
- **Image Handling**: Next.js Image optimization + Cloudinary
- **State Management**: React Hooks + Server Actions

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk Express SDK + JWT
- **AI Services**: Google Gemini AI (2.0 Flash)
- **Image Storage**: Cloudinary
- **Workflow Automation**: n8n integration
- **Environment**: Docker-ready configuration

### AI & Machine Learning

- **Primary AI**: Google Gemini 2.0 Flash
- **Computer Vision**: Image analysis for recipe generation
- **Natural Language Processing**: Recipe optimization and generation
- **Image Generation**: AI-powered recipe image creation
- **Workflow Engine**: n8n for AI pipeline orchestration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account or local MongoDB instance
- Clerk account for authentication
- Google AI Studio API key
- Cloudinary account
- n8n instance (optional, for advanced workflows)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AlphaBeast97/MegaProject.git
   cd MegaProject
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Create .env file
   cp .env.example .env
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install

   # Create .env.local file
   cp .env.local.example .env.local
   ```

### Environment Configuration

#### Backend (.env)

```env
# Database
MONGODB_URI=mongodb+srv://your-connection-string

# Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your-key
CLERK_SECRET_KEY=sk_test_your-key
JWT_SECRET=your-jwt-secret

# AI Services
GEMINI_API_KEY=your-gemini-api-key

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# n8n Integration
N8N_WEBHOOK_URL_RECIPE=your-n8n-webhook-url
N8N_WEBHOOK_URL_IMAGE=your-n8n-image-webhook-url

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### Frontend (.env.local)

```env
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key
CLERK_SECRET_KEY=sk_test_your-key

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# AI Configuration
GOOGLE_GENAI_API_KEY=your-gemini-api-key

# App URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Running the Application

1. **Start the Backend**

   ```bash
   cd backend
   npm run server  # Development with nodemon
   # or
   npm start      # Production
   ```

2. **Start the Frontend**

   ```bash
   cd frontend
   npm run dev    # Development server on port 9002
   # or
   npm run build && npm start  # Production build
   ```

3. **Access the Application**
   - Frontend: http://localhost:9002
   - Backend API: http://localhost:5000

## 📖 API Documentation

### Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-clerk-jwt-token>
```

### Core Endpoints

#### Recipes

- `GET /api/recipes` - Get user's recipes
- `POST /api/recipes` - Create/generate recipe
- `GET /api/recipes/:id` - Get specific recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

#### Image Upload

- `POST /api/upload-image` - Upload image to Cloudinary

#### User Management

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Recipe Generation Types

#### 1. Ingredient-Based Generation

```json
POST /api/recipes
{
  "type": "ingredients",
  "content": {
    "userid": "user_123",
    "ingredients": ["chicken", "broccoli", "garlic"]
  }
}
```

#### 2. Image-Based Generation

```json
POST /api/recipes
{
  "type": "image",
  "content": {
    "userid": "user_123",
    "image": "https://cloudinary-url/image.jpg"
  }
}
```

#### 3. Random Recipe Generation

```json
POST /api/recipes
{
  "type": "random",
  "content": {
    "userid": "user_123",
    "preferences": {
      "cuisine": "Italian",
      "difficulty": "Medium",
      "dietary": "Vegetarian"
    }
  }
}
```

## 🎨 Project Structure

```
MegaProject/
├── frontend/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── dashboard/   # User dashboard
│   │   │   ├── recipes/     # Recipe management
│   │   │   ├── image-to-recipe/  # Image upload & generation
│   │   │   ├── random-recipe/    # Random recipe generator
│   │   │   └── about/       # Project information
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── AppLayout.tsx
│   │   │   └── AppSidebar.tsx
│   │   ├── ai/             # AI integration
│   │   │   ├── flows/      # Genkit AI flows
│   │   │   └── genkit.ts   # AI configuration
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js Backend API
│   ├── controllers/        # API route handlers
│   │   ├── recipe.controller.js
│   │   └── user.controller.js
│   ├── models/            # MongoDB schemas
│   │   ├── recipe.model.js
│   │   └── user.model.js
│   ├── routes/            # API routes
│   │   ├── recipe.routes.js
│   │   └── user.routes.js
│   ├── libs/              # External service integrations
│   │   └── image_generator.js
│   ├── utils/             # Utility functions
│   │   ├── db.js          # Database connection
│   │   ├── env.js         # Environment variables
│   │   └── jwtUtils.js    # JWT utilities
│   ├── config/            # Configuration files
│   │   └── cloudinary.js
│   ├── server.js          # Application entry point
│   └── package.json
├── Docs/                   # Project documentation
│   ├── PRD + Wireframes.md
│   └── wireframe_mob.png
└── README.md
```

## 🔧 Configuration Details

### Database Schema

#### Recipe Model

```javascript
{
  title: String,           // Recipe name
  description: String,     // Recipe description
  category: String,        // Recipe category
  clerkId: String,        // User identifier
  ingredients: [String],   // List of ingredients
  instructions: [String], // Step-by-step instructions
  prepTime: String,       // Preparation time
  cookTime: String,       // Cooking time
  imageUrl: String,       // Recipe image URL
  timestamps: true        // createdAt, updatedAt
}
```

#### User Model

```javascript
{
  username: String,
  email: String,
  clerkId: String,        // Clerk user ID
  timestamps: true
}
```

### AI Workflows

#### Genkit Flows

1. **Recipe Title & Description Generation**

   - Input: ingredients, instructions
   - Output: creative title and description

2. **Recipe Suggestions from Ingredients**

   - Input: comma-separated ingredients
   - Output: recipe suggestions array

3. **Recipe Suggestions from Image**
   - Input: food image URI (base64)
   - Output: recipe suggestions based on visual analysis

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Build and deploy to Vercel
npm run build
vercel --prod
```

### Backend (Railway/Heroku)

```bash
# Set environment variables in your platform
# Deploy using platform-specific methods
```

### Database (MongoDB Atlas)

- Create a MongoDB Atlas cluster
- Configure network access and database users
- Update connection string in environment variables

### Cloud Services Setup

#### Cloudinary Configuration

1. Create Cloudinary account
2. Get cloud name, API key, and API secret
3. Configure upload presets for image optimization

#### Clerk Authentication

1. Create Clerk application
2. Configure OAuth providers (Google, GitHub)
3. Set up webhooks for user management
4. Configure redirect URLs

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run lint        # ESLint checks
npm run typecheck   # TypeScript validation
```

### Backend Testing

```bash
cd backend
npm test           # Run test suite (if configured)
```

## 📈 Performance Optimization

### Frontend Optimizations

- **Image Optimization**: Next.js Image component with Cloudinary
- **Code Splitting**: Automatic with Next.js App Router
- **Bundle Analysis**: Built-in Next.js bundle analyzer
- **Caching**: Server-side caching for API responses

### Backend Optimizations

- **Database Indexing**: Optimized MongoDB queries
- **Rate Limiting**: API rate limiting for stability
- **Compression**: Gzip compression for responses
- **Caching**: Redis caching for frequently accessed data

## 🛡️ Security Features

- **Authentication**: Secure JWT-based authentication with Clerk
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive request validation
- **Environment Security**: Secure environment variable management
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Image Upload Security**: File type and size validation

## 🐛 Troubleshooting

### Common Issues

#### Authentication Problems

```bash
# Check Clerk configuration
# Verify environment variables
# Clear browser cookies and local storage
```

#### Database Connection Issues

```bash
# Verify MongoDB connection string
# Check network access in MongoDB Atlas
# Ensure database user permissions
```

#### AI Generation Failures

```bash
# Verify Gemini API key
# Check API quota and limits
# Validate image formats and sizes
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Standards

- Follow existing code style and conventions
- Add TypeScript types for new features
- Include proper error handling
- Update documentation for new features
- Test your changes thoroughly

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **[AlphaBeast](https://github.com/AlphaBeast)** - Full Stack Developer (Backend & AI Integration)
- **[MaximumCell](https://github.com/MaximumCell)** - Frontend Developer (UI/UX & React Components)

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Clerk** for seamless authentication
- **Cloudinary** for image management
- **MongoDB** for flexible data storage
- **Vercel** for deployment platform
- **Next.js team** for the amazing framework
- **shadcn/ui** for beautiful UI components

## 📞 Support

For support, email [support@culinarycanvas.com](mailto:support@culinarycanvas.com) or create an issue in the [GitHub repository](https://github.com/AlphaBeast97/MegaProject/issues).

## 🔗 Links

- **Live Demo**: [https://mega-project-livid.vercel.app/](https://mega-project-livid.vercel.app/)
- **Documentation**: [https://docs.culinarycanvas.com](https://docs.culinarycanvas.com)
- **API Reference**: [https://api.culinarycanvas.com/docs](https://api.culinarycanvas.com/docs)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by the Culinary Canvas Team
