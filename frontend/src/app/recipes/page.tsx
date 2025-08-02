"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2, BookOpen, PlusCircle, ChefHat, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import "./animations.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function RecipesPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!isLoaded || !user) return;

      try {
        setLoading(true);
        const token = await getToken();
        if (!token) return;

        const response = await fetch(`${API_URL}/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sort recipes by creation date (newest first)
          const sortedRecipes = Array.isArray(data)
            ? data.sort(
              (a, b) =>
                new Date(b.createdAt || b._id).getTime() -
                new Date(a.createdAt || a._id).getTime()
            )
            : [];
          setRecipes(data);
        } else {
          setError("Failed to fetch recipes");
        }
      } catch (err) {
        setError("Error loading recipes");
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [isLoaded, user, getToken]);

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((recipe) =>
      category === "all" ? true : recipe.category === category
    );

  const categories = [
    "all",
    ...Array.from(new Set(recipes.map((r) => r.category || "uncategorized"))),
  ];

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-indigo-100/20 to-purple-100/20"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-12 relative z-0">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4 animate-pulse-glow">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-spin-slow mx-auto"></div>
                <div className="absolute inset-2 sm:inset-3 bg-white rounded-full flex items-center justify-center">
                  <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-bounce" />
                </div>
              </div>
              <span className="text-base sm:text-lg text-gray-600 font-medium">Loading recipes...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 relative z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 via-rose-100/20 to-pink-100/20"></div>

        <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-12 relative z-0">
          <div className="text-center py-12 sm:py-16 animate-fade-in-up">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-200 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float">
              <ChefHat className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-red-600">Error</h2>
            <p className="text-sm sm:text-base text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative z-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-indigo-100/20 to-purple-100/20"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-12 max-w-7xl relative z-0">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
            <div className="w-6 sm:w-8 border-t-2 border-blue-300"></div>
            <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500 animate-pulse delay-500" />
            <div className="w-6 sm:w-8 border-t-2 border-indigo-300"></div>
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 animate-pulse delay-1000" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Recipe Collection
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Browse, search, and get inspired by your saved recipes. 📚✨
          </p>
        </div>

      </div>

      {recipes.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-0 rounded-xl shadow-lg animate-fade-in-up delay-400">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search recipes by title..."
              className="pl-9 sm:pl-10 w-full border-blue-200 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base h-10 sm:h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px] border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 h-10 sm:h-11">
              <Filter className="mr-2 h-4 w-4 text-indigo-500" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {recipes.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in-up delay-600">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float">
              <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">No recipes yet</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
              Start building your culinary collection by creating your first recipe.
            </p>
            <Link href="/recipes/new">
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                <PlusCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Create Your First Recipe</span>
                <span className="sm:hidden">Create Recipe</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up delay-800">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={recipe._id}
              className="animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16 animate-fade-in-up">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float">
            <Search className="h-8 w-8 sm:h-10 sm:w-10 text-purple-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">No Recipes Found</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Try adjusting your search or filter.
          </p>
        </div>
      )}
    </div>
  );
}
