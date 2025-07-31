import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe-suggestions-from-image.ts';
import '@/ai/flows/generate-recipe-suggestions-from-ingredients.ts';
import '@/ai/flows/generate-recipe-title-and-description.ts';