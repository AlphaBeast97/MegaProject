"use client";

import "./animations.css";
import { useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shuffle,
  Loader2,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Clock,
  Users,
  ChefHat,
  Star,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const cuisineTypes = [
  "Any",
  "Italian",
  "Asian",
  "Mexican",
  "Mediterranean",
  "Indian",
  "American",
  "French",
  "Thai",
  "Japanese",
];
const difficultyLevels = ["Any", "Easy", "Medium", "Hard"];
const dietaryPreferences = [
  "Any",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Keto",
  "Low-Carb",
  "High-Protein",
];

export default function RandomRecipePage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [cuisine, setCuisine] = useState("Any");
  const [difficulty, setDifficulty] = useState("Any");
  const [dietary, setDietary] = useState("Any");
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
  const handleGenerateRandomRecipe = async () => {
    setIsGenerating(true);
    try {
      const token = await getToken();

      const response = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "random",
          content: {
            userid: user?.id,
            preferences: {
              cuisine: cuisine !== "Any" ? cuisine : undefined,
              difficulty: difficulty !== "Any" ? difficulty : undefined,
              dietary: dietary !== "Any" ? dietary : undefined,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const generatedRecipe = await response.json();
      setGeneratedRecipe(generatedRecipe);

      toast({
        title: "Random Recipe Generated!",
        description: "Here's a delicious recipe suggestion for you.",
      });
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error",
        description: "Failed to generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center pt-12 sm:pt-16">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading your culinary adventure...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center pt-12 sm:pt-16">
        <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="text-center py-12 px-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Shuffle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Sign In Required</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Please sign in to discover amazing AI-generated recipes tailored to your taste preferences.
            </p>
            <Link href="/sign-in">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <Sparkles className="mr-2 h-5 w-5" />
                Sign In to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-12 sm:pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto p-4 sm:p-6 max-w-7xl relative z-0">
        <div className="mb-6 sm:mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4 sm:mb-6 hover:bg-white/50 transition-colors duration-200">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 space-y-4">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">
                Random AI Recipes
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
                <Shuffle className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 animate-pulse" />
                <div className="w-6 sm:w-8 border-t-2 border-purple-300"></div>
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse delay-500" />
                <div className="w-6 sm:w-8 border-t-2 border-blue-300"></div>
                <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500 animate-pulse delay-1000" />
              </div>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Discover new culinary adventures with AI-generated recipes tailored to your taste preferences.
                Let our AI chef surprise you! 🎲✨
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Preferences Section */}
          <Card className="lg:col-span-1 group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in-left">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg p-4 sm:p-6">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Sparkles className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                Recipe Preferences
              </CardTitle>
              <CardDescription className="text-purple-100 text-sm sm:text-base">
                Customize your recipe suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className="animate-fade-in delay-200">
                <label className="text-sm font-semibold mb-3 flex items-center text-gray-700">
                  <Utensils className="h-4 w-4 mr-2 text-purple-500" />
                  Cuisine Type
                </label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger className="border-2 border-purple-100 hover:border-purple-300 transition-colors duration-200 bg-gradient-to-r from-purple-50 to-blue-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="animate-fade-in delay-400">
                <label className="text-sm font-semibold mb-3 flex items-center text-gray-700">
                  <Star className="h-4 w-4 mr-2 text-blue-500" />
                  Difficulty Level
                </label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="border-2 border-blue-100 hover:border-blue-300 transition-colors duration-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="animate-fade-in delay-600">
                <label className="text-sm font-semibold mb-3 flex items-center text-gray-700">
                  <ChefHat className="h-4 w-4 mr-2 text-indigo-500" />
                  Dietary Preference
                </label>
                <Select value={dietary} onValueChange={setDietary}>
                  <SelectTrigger className="border-2 border-indigo-100 hover:border-indigo-300 transition-colors duration-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dietaryPreferences.map((pref) => (
                      <SelectItem key={pref} value={pref}>
                        {pref}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateRandomRecipe}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in delay-800 text-sm sm:text-base"
                disabled={isGenerating}
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    <span className="hidden sm:inline">Generating Magic...</span>
                    <span className="sm:hidden">Generating...</span>
                  </>
                ) : (
                  <>
                    <Shuffle className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                    <span className="hidden sm:inline">Generate Random Recipe</span>
                    <span className="sm:hidden">Generate Recipe</span>
                  </>
                )}
              </Button>

              {generatedRecipe && (
                <Button
                  variant="outline"
                  onClick={handleGenerateRandomRecipe}
                  className="w-full border-2 border-purple-200 hover:bg-purple-50 transition-colors duration-200 animate-bounce-in text-sm sm:text-base"
                  disabled={isGenerating}
                  size="lg"
                >
                  <RefreshCw className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  Generate Another
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Generated Recipe Section */}
          <Card className="lg:col-span-2 group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in-right">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg p-4 sm:p-6">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Shuffle className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                Your Random Recipe
              </CardTitle>
              <CardDescription className="text-blue-100 text-sm sm:text-base">
                AI-generated recipe based on your preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {generatedRecipe ? (
                <div className="space-y-6 sm:space-y-8 animate-bounce-in">
                  {/* Recipe Header */}
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-6 animate-fade-in">
                    <div className="md:w-1/3">
                      <div className="relative h-48 sm:h-56 md:h-64 w-full group">
                        {generatedRecipe.imageUrl ? (
                          <Image
                            src={generatedRecipe.imageUrl}
                            alt={generatedRecipe.title}
                            fill
                            className="object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              console.error("Image load error:", e);
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                            unoptimized={true}
                          />
                        ) : null}
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-200 rounded-xl flex items-center justify-center"
                          style={{
                            display: generatedRecipe.imageUrl ? "none" : "flex",
                          }}
                        >
                          <div className="text-center text-purple-600">
                            <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 sm:mb-4 animate-pulse" />
                            <span className="text-base sm:text-lg font-bold">AI Recipe</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-fade-in delay-200">
                        {generatedRecipe.title}
                      </h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed animate-fade-in delay-400">
                        {generatedRecipe.description}
                      </p>

                      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 animate-fade-in delay-600">
                        {generatedRecipe.category && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-sm">
                            {generatedRecipe.category}
                          </Badge>
                        )}
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-sm">
                          AI Generated
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 animate-fade-in delay-800">
                        <div className="flex items-center bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-500 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-gray-500 block">Prep Time</span>
                            <span className="font-semibold text-gray-700 text-sm">{generatedRecipe.prepTime || "30 min"}</span>
                          </div>
                        </div>
                        <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-gray-500 block">Cook Time</span>
                            <span className="font-semibold text-gray-700 text-sm">{generatedRecipe.cookTime || "25 min"}</span>
                          </div>
                        </div>
                        <div className="flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-indigo-500 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-gray-500 block">Servings</span>
                            <span className="font-semibold text-gray-700 text-sm">4 people</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients and Instructions */}
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="animate-fade-in delay-1000">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500 mr-2" />
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800">Ingredients</h4>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-purple-200">
                        <ul className="space-y-2 sm:space-y-3">
                          {generatedRecipe.ingredients.map(
                            (ingredient: string, index: number) => (
                              <li key={index} className="group flex items-center animate-slide-in-left" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">
                                  {ingredient}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="animate-fade-in delay-1200">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mr-2" />
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800">Instructions</h4>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {generatedRecipe.instructions.map(
                          (instruction: string, index: number) => (
                            <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-in-right" style={{ animationDelay: `${index * 150}ms` }}>
                              <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold group-hover:scale-110 transition-transform duration-200">
                                  {index + 1}
                                </div>
                                <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">
                                  {instruction}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 sm:py-20 space-y-4 sm:space-y-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
                    <Shuffle className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400" />
                  </div>
                  <div className="space-y-2 px-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                      Ready for a Culinary Adventure?
                    </h3>
                    <p className="text-gray-500 text-base sm:text-lg">
                      Set your preferences and click generate to discover your next favorite recipe!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
