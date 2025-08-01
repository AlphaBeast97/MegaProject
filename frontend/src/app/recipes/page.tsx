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
import { Search, Loader2, BookOpen, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-2 text-muted-foreground">Loading recipes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2 text-red-600">Error</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-0">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold mb-2">
          Your Recipe Collection
        </h1>
        <p className="text-muted-foreground">
          Browse, search, and get inspired by your saved recipes.
        </p>
      </div>

      {recipes.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card border rounded-lg shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes by title..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
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
        <Card className="p-8 text-center">
          <CardContent>
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
            <p className="text-muted-foreground mb-4">
              Start building your culinary collection by creating your first
              recipe.
            </p>
            <Link href="/recipes/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Recipe
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No Recipes Found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter.
          </p>
        </div>
      )}
    </div>
  );
}
