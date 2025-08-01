"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Utensils, Clock, Users, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types";

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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-2 text-muted-foreground">Loading recipe...</span>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto p-0">
        <Link href="/recipes">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recipes
          </Button>
        </Link>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2 text-red-600">Error</h2>
          <p className="text-muted-foreground">{error || "Recipe not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-0">
      <Link href="/recipes" passHref>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Recipes
        </Button>
      </Link>
      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={recipe.imageUrl || "https://placehold.co/600x400"}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <Badge className="mb-2 bg-primary text-primary-foreground">
              {recipe.category || "Uncategorized"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-white shadow-lg">
              {recipe.title}
            </h1>
            <p className="text-lg text-white/90 mt-2 max-w-2xl">
              {recipe.description || "No description available"}
            </p>
          </div>
        </div>
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
            <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <span className="font-semibold">Prep Time</span>
              <span className="text-muted-foreground">
                {recipe.prepTime || "N/A"}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
              <Utensils className="h-6 w-6 mb-2 text-primary" />
              <span className="font-semibold">Cook Time</span>
              <span className="text-muted-foreground">
                {recipe.cookTime || "N/A"}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
              <Users className="h-6 w-6 mb-2 text-primary" />
              <span className="font-semibold">Created</span>
              <span className="text-muted-foreground">
                {recipe.createdAt
                  ? new Date(recipe.createdAt).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients?.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Checkbox id={`ingredient-${index}`} />
                      <label
                        htmlFor={`ingredient-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {ingredient}
                      </label>
                    </li>
                  ))
                ) : (
                  <p className="text-muted-foreground">No ingredients listed</p>
                )}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions?.length > 0 ? (
                  recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm">{instruction}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    No instructions provided
                  </p>
                )}
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
