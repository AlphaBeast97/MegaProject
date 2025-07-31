'use client';

import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, PlusCircle, BookOpen, Camera, Shuffle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import StatCard from '@/components/dashboard/StatCard';
import { Recipe } from '@/types';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!isLoaded || !user) return;

      try {
        setLoading(true);
        setError(null);
        const token = await getToken();
        if (!token) return;

        const response = await fetch(`${API_URL}/recipes`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched recipes:', data); // Debug log
          // Sort recipes by creation date (newest first)
          const sortedRecipes = Array.isArray(data)
            ? data.sort((a, b) => new Date(b.createdAt || b._id).getTime() - new Date(a.createdAt || a._id).getTime())
            : [];
          setRecipes(sortedRecipes);
        } else {
          console.error('Failed to fetch recipes:', response.status, response.statusText);
          setError('Failed to fetch recipes');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Error loading recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [isLoaded, user, getToken]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

  if (!user) {
    return null; // This shouldn't happen due to auth middleware
  }

  if (error) {
    return (
      <div className="container mx-auto p-0">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2 text-red-600">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const recentRecipes = recipes.slice(0, 3); // Show 3 most recent recipes

  return (
    <div className="container mx-auto p-0">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-foreground">
          Welcome back, {user?.firstName || 'there'}!
        </h1>
        <p className="text-muted-foreground">
          Here's a taste of what's cooking in your culinary world.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Recipes"
          value={recipes.length.toString()}
          icon={BookOpen}
          description="Your recipe collection"
        />
        <StatCard
          title="Recent Activity"
          value={recipes.length > 0 ? `${recentRecipes.length} Recent` : 'Getting Started'}
          icon={Activity}
          description={recipes.length > 0 ? 'New recipes this week' : 'Create your first recipe'}
        />

        {/* AI Features Cards */}
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <Camera className="mr-2 h-5 w-5" />
              Image to Recipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-700 mb-3">Upload a photo and get an AI-generated recipe</p>
            <Link href="/image-to-recipe">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                Try Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Shuffle className="mr-2 h-5 w-5" />
              Random Recipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700 mb-3">Discover new recipes with AI suggestions</p>
            <Link href="/random-recipe">
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                Discover
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-headline font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 hover:shadow-md transition-shadow">
            <Link href="/recipes/new" className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Create Recipe</h3>
                <p className="text-sm text-muted-foreground">Traditional recipe creation</p>
              </div>
              <PlusCircle className="h-6 w-6 text-orange-500" />
            </Link>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <Link href="/image-to-recipe" className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Photo to Recipe</h3>
                <p className="text-sm text-muted-foreground">AI-powered image analysis</p>
              </div>
              <Camera className="h-6 w-6 text-orange-500" />
            </Link>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <Link href="/random-recipe" className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Random Discovery</h3>
                <p className="text-sm text-muted-foreground">Surprise me with AI</p>
              </div>
              <Shuffle className="h-6 w-6 text-orange-500" />
            </Link>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-headline font-semibold mb-4">
          Your Recipes
        </h2>

        {recipes.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
              <p className="text-muted-foreground mb-4">
                Start building your culinary collection by creating your first recipe.
              </p>
              <Link href="/recipes/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Recipe
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {recentRecipes.map((recipe) => (
                <Link href={`/recipes/${recipe._id}`} key={recipe._id} className="group">
                  <Card className="overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 w-full">
                      <Image
                        src={recipe.imageUrl || 'https://placehold.co/600x400'}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors duration-300">
                        {recipe.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {recipe.description || 'No description available'}
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {recipe.ingredients?.length || 0} ingredients • {recipe.instructions?.length || 0} steps
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {recipes.length > 3 && (
              <div className="text-center">
                <Link href="/recipes">
                  <Button variant="outline">
                    View All Recipes ({recipes.length})
                    <BookOpen className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
