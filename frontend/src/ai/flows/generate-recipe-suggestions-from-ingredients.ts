'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating recipe suggestions based on a list of ingredients provided by the user.
 *
 * - generateRecipeSuggestionsFromIngredients - A function that takes a list of ingredients and returns recipe suggestions.
 * - GenerateRecipeSuggestionsFromIngredientsInput - The input type for the generateRecipeSuggestionsFromIngredients function.
 * - GenerateRecipeSuggestionsFromIngredientsOutput - The return type for the generateRecipeSuggestionsFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeSuggestionsFromIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available to the user.'),
});
export type GenerateRecipeSuggestionsFromIngredientsInput = z.infer<
  typeof GenerateRecipeSuggestionsFromIngredientsInputSchema
>;

const GenerateRecipeSuggestionsFromIngredientsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of recipe suggestions based on the provided ingredients.'),
});
export type GenerateRecipeSuggestionsFromIngredientsOutput = z.infer<
  typeof GenerateRecipeSuggestionsFromIngredientsOutputSchema
>;

export async function generateRecipeSuggestionsFromIngredients(
  input: GenerateRecipeSuggestionsFromIngredientsInput
): Promise<GenerateRecipeSuggestionsFromIngredientsOutput> {
  return generateRecipeSuggestionsFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeSuggestionsFromIngredientsPrompt',
  input: {schema: GenerateRecipeSuggestionsFromIngredientsInputSchema},
  output: {schema: GenerateRecipeSuggestionsFromIngredientsOutputSchema},
  prompt: `You are a recipe suggestion bot. A user will provide you with a list of ingredients that they have, and you will suggest recipes that they can make with those ingredients.

Ingredients: {{{ingredients}}}

Suggestions:`, 
});

const generateRecipeSuggestionsFromIngredientsFlow = ai.defineFlow(
  {
    name: 'generateRecipeSuggestionsFromIngredientsFlow',
    inputSchema: GenerateRecipeSuggestionsFromIngredientsInputSchema,
    outputSchema: GenerateRecipeSuggestionsFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
