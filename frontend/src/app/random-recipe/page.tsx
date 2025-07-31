'use client';

import { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shuffle, Loader2, Sparkles, ArrowLeft, RefreshCw, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const cuisineTypes = ['Any', 'Italian', 'Asian', 'Mexican', 'Mediterranean', 'Indian', 'American', 'French', 'Thai', 'Japanese'];
const difficultyLevels = ['Any', 'Easy', 'Medium', 'Hard'];
const dietaryPreferences = ['Any', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Low-Carb', 'High-Protein'];

export default function RandomRecipePage() {
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const { toast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);
    const [cuisine, setCuisine] = useState('Any');
    const [difficulty, setDifficulty] = useState('Any');
    const [dietary, setDietary] = useState('Any');
    const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

    const randomRecipes = [
        {
            title: "Mediterranean Quinoa Bowl",
            description: "A healthy and colorful bowl packed with fresh vegetables and quinoa",
            cuisine: "Mediterranean",
            difficulty: "Easy",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 4,
            imageUrl: "https://placehold.co/400x300",
            ingredients: [
                "1 cup quinoa",
                "2 cups vegetable broth",
                "1 cucumber, diced",
                "2 tomatoes, chopped",
                "1/2 red onion, sliced",
                "1/4 cup olives",
                "1/4 cup feta cheese",
                "2 tbsp olive oil",
                "1 lemon, juiced",
                "Fresh herbs"
            ],
            instructions: [
                "Cook quinoa in vegetable broth until fluffy",
                "Let quinoa cool to room temperature",
                "Prepare all vegetables and herbs",
                "Mix olive oil and lemon juice for dressing",
                "Combine quinoa with vegetables",
                "Top with feta cheese and olives",
                "Drizzle with dressing and serve"
            ]
        },
        {
            title: "Spicy Korean Kimchi Fried Rice",
            description: "A flavorful and spicy dish made with fermented kimchi and rice",
            cuisine: "Asian",
            difficulty: "Medium",
            prepTime: "10 min",
            cookTime: "15 min",
            servings: 3,
            imageUrl: "https://placehold.co/400x300",
            ingredients: [
                "3 cups cooked rice (preferably day-old)",
                "1 cup kimchi, chopped",
                "2 eggs",
                "2 green onions, sliced",
                "2 tbsp sesame oil",
                "2 tbsp soy sauce",
                "1 tbsp gochujang",
                "1 clove garlic, minced",
                "Sesame seeds for garnish"
            ],
            instructions: [
                "Heat sesame oil in a large pan or wok",
                "Add garlic and cook until fragrant",
                "Add kimchi and cook for 2-3 minutes",
                "Add rice and break up any clumps",
                "Mix in soy sauce and gochujang",
                "Push rice to one side and scramble eggs",
                "Mix everything together",
                "Garnish with green onions and sesame seeds"
            ]
        }
    ];

    const handleGenerateRandomRecipe = async () => {
        setIsGenerating(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo, pick a random recipe from the array
            const randomIndex = Math.floor(Math.random() * randomRecipes.length);
            setGeneratedRecipe(randomRecipes[randomIndex]);

            toast({
                title: "Random Recipe Generated!",
                description: "Here's a delicious recipe suggestion for you.",
            });
        } catch (error) {
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
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto p-0">
                <div className="text-center py-16">
                    <Shuffle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Sign In Required</h2>
                    <p className="text-muted-foreground mb-4">
                        Please sign in to discover random AI recipes.
                    </p>
                    <Link href="/sign-in">
                        <Button>Sign In</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-0 max-w-6xl">
            <div className="mb-8">
                <Link href="/dashboard">
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
                <h1 className="text-4xl font-headline font-bold mb-2">Random AI Recipes</h1>
                <p className="text-muted-foreground">
                    Discover new culinary adventures with AI-generated recipes tailored to your preferences.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Preferences Section */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Recipe Preferences
                        </CardTitle>
                        <CardDescription>
                            Customize your recipe suggestions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Cuisine Type</label>
                            <Select value={cuisine} onValueChange={setCuisine}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {cuisineTypes.map((type) => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                            <Select value={difficulty} onValueChange={setDifficulty}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {difficultyLevels.map((level) => (
                                        <SelectItem key={level} value={level}>{level}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Dietary Preference</label>
                            <Select value={dietary} onValueChange={setDietary}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {dietaryPreferences.map((pref) => (
                                        <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={handleGenerateRandomRecipe}
                            className="w-full"
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Shuffle className="mr-2 h-4 w-4" />
                                    Generate Random Recipe
                                </>
                            )}
                        </Button>

                        {generatedRecipe && (
                            <Button
                                variant="outline"
                                onClick={handleGenerateRandomRecipe}
                                className="w-full"
                                disabled={isGenerating}
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Generate Another
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* Generated Recipe Section */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Shuffle className="mr-2 h-5 w-5" />
                            Your Random Recipe
                        </CardTitle>
                        <CardDescription>
                            AI-generated recipe based on your preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {generatedRecipe ? (
                            <div className="space-y-6">
                                {/* Recipe Header */}
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="md:w-1/3">
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={generatedRecipe.imageUrl}
                                                alt={generatedRecipe.title}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-2/3">
                                        <h3 className="text-2xl font-bold mb-2">{generatedRecipe.title}</h3>
                                        <p className="text-muted-foreground mb-4">{generatedRecipe.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge variant="secondary">{generatedRecipe.cuisine}</Badge>
                                            <Badge variant="outline">{generatedRecipe.difficulty}</Badge>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                                <span>Prep: {generatedRecipe.prepTime}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                                <span>Cook: {generatedRecipe.cookTime}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                                <span>Serves: {generatedRecipe.servings}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ingredients and Instructions */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-3">Ingredients:</h4>
                                        <ul className="space-y-2">
                                            {generatedRecipe.ingredients.map((ingredient: string, index: number) => (
                                                <li key={index} className="text-sm flex items-start">
                                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                                    {ingredient}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">Instructions:</h4>
                                        <ol className="space-y-2">
                                            {generatedRecipe.instructions.map((instruction: string, index: number) => (
                                                <li key={index} className="text-sm flex">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                                                        {index + 1}
                                                    </span>
                                                    {instruction}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button className="flex-1">
                                        Save to Collection
                                    </Button>
                                    <Button variant="outline">
                                        Share Recipe
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 text-muted-foreground">
                                <Shuffle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium mb-2">Ready to discover something new?</p>
                                <p>Click the generate button to get a random AI recipe</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
