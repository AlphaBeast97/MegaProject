'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateRecipeSuggestionsFromIngredients } from '@/ai/flows/generate-recipe-suggestions-from-ingredients';
import { Lightbulb, Loader2, Utensils } from 'lucide-react';

const ingredientsSchema = z.object({
  ingredients: z.string().min(3, 'Please enter at least one ingredient.'),
});

type IngredientsFormValues = z.infer<typeof ingredientsSchema>;

export default function GenerateFromIngredientsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string>('');

  const form = useForm<IngredientsFormValues>({
    resolver: zodResolver(ingredientsSchema),
    defaultValues: {
      ingredients: '',
    },
  });

  const onSubmit = async (data: IngredientsFormValues) => {
    setIsLoading(true);
    setSuggestions('');
    try {
      const result = await generateRecipeSuggestionsFromIngredients({ ingredients: data.ingredients });
      setSuggestions(result.suggestions);
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Could not generate recipe suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-0">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold mb-2 flex items-center gap-2">
            <Utensils className="w-8 h-8"/>
            Recipe from Ingredients
        </h1>
        <p className="text-muted-foreground">
          List the ingredients you have, and let AI suggest recipes you can make.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Your Ingredients</CardTitle>
                <CardDescription>Enter ingredients you have on hand, separated by commas.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="ingredients"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ingredients</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="e.g., chicken breast, broccoli, garlic, olive oil"
                                className="min-h-[150px]"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                        ) : (
                        <>
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Get Suggestions
                        </>
                        )}
                    </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>AI-Powered Suggestions</CardTitle>
             <CardDescription>Recipes you can create with your ingredients will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full min-h-[150px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {suggestions && (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {suggestions}
              </div>
            )}
            {!isLoading && !suggestions && (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full min-h-[150px]">
                    <Lightbulb className="h-10 w-10 mb-4"/>
                    <p>Your recipe ideas are waiting!</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
