'use server';
/**
 * @fileOverview Generates a recipe title and description based on provided ingredients and instructions.
 *
 * - generateRecipeTitleAndDescription - A function that generates a recipe title and description.
 * - GenerateRecipeTitleAndDescriptionInput - The input type for the generateRecipeTitleAndDescription function.
 * - GenerateRecipeTitleAndDescriptionOutput - The return type for the generateRecipeTitleAndDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeTitleAndDescriptionInputSchema = z.object({
  ingredients: z.string().describe('A comma-separated list of ingredients used in the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
});
export type GenerateRecipeTitleAndDescriptionInput = z.infer<
  typeof GenerateRecipeTitleAndDescriptionInputSchema
>;

const GenerateRecipeTitleAndDescriptionOutputSchema = z.object({
  title: z.string().describe('A creative and appealing title for the recipe.'),
  description: z
    .string()
    .describe('A concise and enticing description of the recipe.'),
});
export type GenerateRecipeTitleAndDescriptionOutput = z.infer<
  typeof GenerateRecipeTitleAndDescriptionOutputSchema
>;

export async function generateRecipeTitleAndDescription(
  input: GenerateRecipeTitleAndDescriptionInput
): Promise<GenerateRecipeTitleAndDescriptionOutput> {
  return generateRecipeTitleAndDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeTitleAndDescriptionPrompt',
  input: {schema: GenerateRecipeTitleAndDescriptionInputSchema},
  output: {schema: GenerateRecipeTitleAndDescriptionOutputSchema},
  prompt: `You are a creative recipe developer. Given the following ingredients and instructions, generate an appealing title and description for a recipe.

Ingredients: {{{ingredients}}}
Instructions: {{{instructions}}}

Please provide a creative title and enticing description for this recipe.

Title:
Description: `,
});

const generateRecipeTitleAndDescriptionFlow = ai.defineFlow(
  {
    name: 'generateRecipeTitleAndDescriptionFlow',
    inputSchema: GenerateRecipeTitleAndDescriptionInputSchema,
    outputSchema: GenerateRecipeTitleAndDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
