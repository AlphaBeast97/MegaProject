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
import { generateRecipeTitleAndDescription } from '@/ai/flows/generate-recipe-title-and-description';
import { Lightbulb, PlusCircle, Trash2, Loader2, Sparkles } from 'lucide-react';

const recipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  ingredients: z.array(z.object({ value: z.string().min(1, 'Ingredient cannot be empty.') })),
  instructions: z.array(z.object({ value: z.string().min(1, 'Instruction cannot be empty.') })),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

export default function NewRecipePage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      ingredients: [{ value: '' }],
      instructions: [{ value: '' }],
    },
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control: form.control,
    name: 'instructions',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    const ingredients = form.getValues('ingredients').map(i => i.value).join(', ');
    const instructions = form.getValues('instructions').map(i => i.value).join('\n');

    if (!ingredients || !instructions) {
      toast({
        title: 'Error',
        description: 'Please provide some ingredients and instructions to generate a title and description.',
        variant: 'destructive',
      });
      setIsGenerating(false);
      return;
    }

    try {
      const result = await generateRecipeTitleAndDescription({ ingredients, instructions });
      form.setValue('title', result.title, { shouldValidate: true });
      form.setValue('description', result.description, { shouldValidate: true });
      toast({
        title: 'Success!',
        description: 'Title and description have been generated.',
      });
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Could not generate title and description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (data: RecipeFormValues) => {
    console.log(data);
    toast({
      title: 'Recipe Submitted!',
      description: 'Your new recipe has been saved.',
    });
    form.reset();
  };

  return (
    <div className="container mx-auto p-0">
      <h1 className="text-4xl font-headline font-bold mb-2">Create a New Recipe</h1>
      <p className="text-muted-foreground mb-8">Fill out the details below to add a new recipe to your collection.</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
              <CardDescription>Give your recipe a catchy title and a brief description.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Classic Lasagna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short, enticing summary of your dish..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
               <CardDescription>List all the ingredients needed for your recipe.</CardDescription>
            </CardHeader>
            <CardContent>
              {ingredientFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`ingredients.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mb-2">
                       <FormControl>
                        <Input placeholder={`Ingredient ${index + 1}`} {...field} />
                      </FormControl>
                      {ingredientFields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendIngredient({ value: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Ingredient
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
               <CardDescription>Provide step-by-step instructions.</CardDescription>
            </CardHeader>
            <CardContent>
              {instructionFields.map((field, index) => (
                 <FormField
                  key={field.id}
                  control={form.control}
                  name={`instructions.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-2 mb-2">
                       <span className="mt-2 font-bold text-primary">{index + 1}.</span>
                       <FormControl>
                        <Textarea placeholder={`Step ${index + 1}`} {...field} />
                      </FormControl>
                       {instructionFields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeInstruction(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendInstruction({ value: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Step
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-secondary border-dashed">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary"/>
                <CardTitle>AI Assistant</CardTitle>
              </div>
              <CardDescription>Stuck? Let AI generate a title and description based on your ingredients and instructions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button type="button" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg">Submit Recipe</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
