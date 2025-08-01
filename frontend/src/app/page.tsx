import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChefHat,
  BookOpen,
  Sparkles,
  ArrowRight,
  Camera,
  Shuffle,
  Zap,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const user = await currentUser();

  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  // Landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16 text-orange-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Culinary Canvas
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your AI-powered culinary companion. Transform photos into recipes,
            discover random AI-generated dishes, and create your perfect cooking
            collection with intelligent assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="outline"
                size="lg"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                Try AI Features
              </Button>
            </Link>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <Camera className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Photo to Recipe
              </span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <Shuffle className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Random AI Recipes
              </span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <Sparkles className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Smart Generation
              </span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle>Recipe Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize your favorite recipes in one place. Never lose a great
                recipe again.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle>AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get intelligent suggestions and automatic recipe generation to
                inspire your cooking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <ChefHat className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle>Cooking Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Step-by-step guidance and smart recommendations for your
                culinary journey.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardHeader>
              <Camera className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-orange-800">Image to Recipe</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-orange-700">
                Upload a photo of any dish and our AI will generate a complete
                recipe with ingredients and instructions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <Shuffle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-purple-800">
                Random AI Recipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-700">
                Discover new culinary adventures with AI-generated random
                recipes tailored to your preferences.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Smart Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-700">
                AI-powered recipe creation with automatic image generation and
                nutritional insights.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* New AI Features Highlight */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of cooking with our cutting-edge AI features
              designed to revolutionize your kitchen adventures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Camera className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Photo Recognition
                </h3>
                <p className="text-gray-600">
                  Simply snap a photo of any dish, and our AI will analyze the
                  image to create a detailed recipe with ingredients,
                  instructions, and cooking tips.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shuffle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Recipe Discovery
                </h3>
                <p className="text-gray-600">
                  Get personalized random recipes based on your dietary
                  preferences, available ingredients, and cooking skill level.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Enhancement
                </h3>
                <p className="text-gray-600">
                  Every recipe comes with AI-generated images, nutritional
                  information, and personalized cooking suggestions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Community Driven
                </h3>
                <p className="text-gray-600">
                  Join a community of food enthusiasts sharing AI-enhanced
                  recipes and culinary discoveries.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/sign-in">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Try AI Features Now
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start cooking?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of home cooks already using Culinary Canvas's AI
            features
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/image-to-recipe">
              <Button
                variant="outline"
                size="lg"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                Try Image to Recipe
                <Camera className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
