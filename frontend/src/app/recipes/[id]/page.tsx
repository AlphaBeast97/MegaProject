"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Utensils,
  Clock,
  Users,
  ArrowLeft,
  ChefHat,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types";
import "./animations.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function RecipeDetailPage() {
  const params = useParams();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!isLoaded || !user) return;

      try {
        setLoading(true);
        const token = await getToken();
        if (!token) return;

        const response = await fetch(`${API_URL}/recipes/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else if (response.status === 404) {
          setError("Recipe not found");
        } else {
          setError("Failed to fetch recipe");
        }
      } catch (err) {
        setError("Error loading recipe");
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [isLoaded, user, getToken, params.id]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-amber-100/20 to-yellow-100/20"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-12 relative z-0">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4 animate-pulse-glow">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-2 sm:inset-3 bg-white rounded-full flex items-center justify-center">
                  <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 animate-bounce" />
                </div>
              </div>
              <span className="text-base sm:text-lg text-gray-600 font-medium">
                Loading recipe...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 relative z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 via-rose-100/20 to-pink-100/20"></div>

        <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-12 relative z-0">
          <Link href="/recipes">
            <Button
              variant="ghost"
              className="mb-4 sm:mb-6 hover:bg-red-100 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back to Recipes</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <div className="text-center py-12 sm:py-16 animate-fade-in-up">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-200 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float">
              <ChefHat className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-red-600">
              Error
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {error || "Recipe not found"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative z-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-amber-100/20 to-yellow-100/20"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-12 max-w-6xl relative z-0">
        <Link href="/recipes" passHref>
          <Button
            variant="ghost"
            className="mb-4 sm:mb-6 hover:bg-orange-100 transition-colors duration-200 animate-fade-in-left"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back to Recipes</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>

        <Card className="overflow-hidden shadow-2xl bg-white/90 backdrop-blur-sm border-0 animate-fade-in-up">
          <div className="relative h-48 sm:h-64 md:h-96 w-full group">
            <Image
              src={recipe.imageUrl || "https://placehold.co/600x400"}
              alt={recipe.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 animate-fade-in-up delay-400">
              <div className="max-w-4xl">
                <Badge className="mb-1 sm:mb-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 text-xs px-2 py-0.5">
                  {recipe.category || "Uncategorized"}
                </Badge>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-headline font-bold text-white shadow-lg mb-1 sm:mb-2 line-clamp-2">
                  {recipe.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed line-clamp-2 max-w-2xl">
                  {recipe.description || "No description available"}
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8 text-center animate-fade-in-up delay-600">
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all duration-300 group">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-semibold text-sm sm:text-base text-gray-800">
                  Prep Time
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  {recipe.prepTime || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-all duration-300 group">
                <Utensils className="h-5 w-5 sm:h-6 sm:w-6 mb-2 text-amber-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-semibold text-sm sm:text-base text-gray-800">
                  Cook Time
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  {recipe.cookTime || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm border border-yellow-100 hover:shadow-md transition-all duration-300 group">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 mb-2 text-yellow-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-semibold text-sm sm:text-base text-gray-800">
                  Created
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  {recipe.createdAt
                    ? new Date(recipe.createdAt).toLocaleDateString()
                    : "Unknown"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="animate-fade-in-left delay-800">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 sm:p-6 border border-orange-100 shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-headline font-semibold mb-3 sm:mb-4 flex items-center text-orange-700">
                    <ChefHat className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Ingredients
                  </h2>
                  <ul className="space-y-2 sm:space-y-3">
                    {recipe.ingredients?.length > 0 ? (
                      recipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 sm:space-x-3 group animate-slide-in-left"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <Checkbox
                            id={`ingredient-${index}`}
                            className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                          />
                          <label
                            htmlFor={`ingredient-${index}`}
                            className="text-xs sm:text-sm font-medium leading-relaxed cursor-pointer text-gray-700 group-hover:text-orange-700 transition-colors duration-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {ingredient}
                          </label>
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No ingredients listed
                      </p>
                    )}
                  </ul>
                </div>
              </div>

              <div className="animate-fade-in-right delay-1000">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 sm:p-6 border border-amber-100 shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-headline font-semibold mb-3 sm:mb-4 flex items-center text-amber-700">
                    <Sparkles className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Instructions
                  </h2>
                  <ol className="space-y-3 sm:space-y-4">
                    {recipe.instructions?.length > 0 ? (
                      recipe.instructions.map((instruction, index) => (
                        <li
                          key={index}
                          className="flex space-x-3 sm:space-x-4 group animate-slide-in-right"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium group-hover:scale-110 transition-transform duration-200">
                            {index + 1}
                          </span>
                          <span className="text-xs sm:text-sm leading-relaxed text-gray-700 group-hover:text-amber-700 transition-colors duration-200">
                            {instruction}
                          </span>
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No instructions provided
                      </p>
                    )}
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
