'use server';
/**
 * @fileOverview Generates recipe suggestions based on an uploaded image of food ingredients.
 *
 * - generateRecipeSuggestionsFromImage - A function that handles the recipe suggestion generation process.
 * - GenerateRecipeSuggestionsFromImageInput - The input type for the generateRecipeSuggestionsFromImage function.
 * - GenerateRecipeSuggestionsFromImageOutput - The return type for the generateRecipeSuggestionsFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeSuggestionsFromImageInputSchema = z.object({
  foodImageUri: z
    .string()
    .describe(
      "A picture of food ingredients, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateRecipeSuggestionsFromImageInput = z.infer<typeof GenerateRecipeSuggestionsFromImageInputSchema>;

const GenerateRecipeSuggestionsFromImageOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of recipe suggestions based on the image.'),
});
export type GenerateRecipeSuggestionsFromImageOutput = z.infer<typeof GenerateRecipeSuggestionsFromImageOutputSchema>;

export async function generateRecipeSuggestionsFromImage(input: GenerateRecipeSuggestionsFromImageInput): Promise<GenerateRecipeSuggestionsFromImageOutput> {
  return generateRecipeSuggestionsFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeSuggestionsFromImagePrompt',
  input: {schema: GenerateRecipeSuggestionsFromImageInputSchema},
  output: {schema: GenerateRecipeSuggestionsFromImageOutputSchema},
  prompt: `You are a recipe suggestion bot.  A user will upload a picture of food ingredients, and you will
  return a list of possible recipes that can be made with them.

  Here is the picture:

  {{media url=foodImageUri}}
  `,
});

const generateRecipeSuggestionsFromImageFlow = ai.defineFlow(
  {
    name: 'generateRecipeSuggestionsFromImageFlow',
    inputSchema: GenerateRecipeSuggestionsFromImageInputSchema,
    outputSchema: GenerateRecipeSuggestionsFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
