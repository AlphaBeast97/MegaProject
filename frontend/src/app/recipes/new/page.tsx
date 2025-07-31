'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, Loader2, Sparkles, ChefHat } from 'lucide-react';
import { useUser, useAuth } from '@clerk/nextjs';

const recipeSchema = z.object({
  ingredients: z.array(z.object({ value: z.string().min(1, 'Ingredient cannot be empty.') })).min(1, 'At least one ingredient is required'),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

export default function NewRecipePage() {
  const { toast } = useToast();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ value: '' }],
    },
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const handleGenerate = async () => {
    const ingredients = form.getValues('ingredients')
      .map(i => i.value.trim())
      .filter(i => i !== '');

    if (ingredients.length === 0) {
      toast({
        title: 'Error',
        description: 'Please provide at least one ingredient to generate a recipe.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      toast({
        title: "Generating Recipe...",
        description: "Our AI is creating a complete recipe from your ingredients.",
      });

      const token = await getToken();
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "ingredients",
          content: {
            userid: user?.id,
            ingredients: ingredients
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }

      const generatedRecipe = await response.json();
      console.log('Generated recipe:', generatedRecipe);
      setGeneratedRecipe(generatedRecipe);

      toast({
        title: 'Recipe Generated!',
        description: 'A complete recipe has been created from your ingredients.',
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate recipe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (data: RecipeFormValues) => {
    handleGenerate();
  };

  return (
    <div className="container mx-auto p-0 max-w-4xl">
      <h1 className="text-4xl font-headline font-bold mb-2">Create Recipe from Ingredients</h1>
      <p className="text-muted-foreground mb-8">Add your ingredients and let AI create a complete recipe for you.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Ingredients Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChefHat className="mr-2 h-5 w-5" />
              Your Ingredients
            </CardTitle>
            <CardDescription>
              List the ingredients you have available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {ingredientFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`ingredients.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder={`Ingredient ${index + 1}`} {...field} />
                        </FormControl>
                        {ingredientFields.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendIngredient({ value: '' })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Ingredient
                </Button>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Recipe...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Recipe
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Generated Recipe Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Generated Recipe
            </CardTitle>
            <CardDescription>
              AI-created recipe based on your ingredients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedRecipe ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{generatedRecipe.title}</h3>
                  <p className="text-muted-foreground">{generatedRecipe.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ingredients:</h4>
                  <ul className="space-y-1">
                    {generatedRecipe.ingredients?.map((ingredient: string, index: number) => (
                      <li key={index} className="text-sm flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Instructions:</h4>
                  <ol className="space-y-2">
                    {generatedRecipe.instructions?.map((instruction: string, index: number) => (
                      <li key={index} className="text-sm flex">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                          {index + 1}
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                {generatedRecipe.prepTime && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Prep Time:</strong> {generatedRecipe.prepTime} |
                    <strong> Cook Time:</strong> {generatedRecipe.cookTime || 'N/A'} |
                    <strong> Category:</strong> {generatedRecipe.category || 'Uncategorized'}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Add ingredients and generate a recipe</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
