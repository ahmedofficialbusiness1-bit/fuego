'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal cooking times and programs based on user preferences and cooking habits.
 *
 * - suggestCookingTimes - A function that handles the cooking time suggestion process.
 * - SuggestCookingTimesInput - The input type for the suggestCookingTimes function.
 * - SuggestCookingTimesOutput - The return type for the suggestCookingTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCookingTimesInputSchema = z.object({
  dishName: z.string().describe('The name of the dish to be cooked.'),
  userPreferences: z
    .string()
    .describe(
      'The user preferences and cooking habits, including preferred cooking styles, ingredients, and dietary restrictions.'
    ),
  availablePrograms:
  z.array(z.string()).describe('Available cooking programs of the Fuego SmartCook pressure cooker, such as Keep Warm, Strong, Rice, Soup, Chicken, and Steam'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the dish, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestCookingTimesInput = z.infer<typeof SuggestCookingTimesInputSchema>;

const SuggestCookingTimesOutputSchema = z.object({
  suggestedProgram: z.string().describe('The suggested cooking program for the dish.'),
  suggestedCookingTime: z.string().describe('The suggested cooking time for the dish (e.g., \'00:28\').'),
  additionalTips: z.string().optional().describe('Any additional tips or recommendations for cooking the dish.'),
});
export type SuggestCookingTimesOutput = z.infer<typeof SuggestCookingTimesOutputSchema>;

export async function suggestCookingTimes(input: SuggestCookingTimesInput): Promise<SuggestCookingTimesOutput> {
  return suggestCookingTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCookingTimesPrompt',
  input: {schema: SuggestCookingTimesInputSchema},
  output: {schema: SuggestCookingTimesOutputSchema},
  prompt: `You are an AI cooking assistant that suggests optimal cooking times and programs for the Fuego SmartCook pressure cooker.

  Based on the photo of the dish, the dish name, user preferences, and available cooking programs, determine the most suitable cooking program and time.

  Photo of dish: {{media url=photoDataUri}}
  Dish Name: {{{dishName}}}
  User Preferences: {{{userPreferences}}}
  Available Cooking Programs: {{#each availablePrograms}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Provide a suggested cooking program and cooking time, formatted as \'00:00\'.  Include any additional tips that can help the user.
  Output the results as JSON of type SuggestCookingTimesOutput.
  `,
});

const suggestCookingTimesFlow = ai.defineFlow(
  {
    name: 'suggestCookingTimesFlow',
    inputSchema: SuggestCookingTimesInputSchema,
    outputSchema: SuggestCookingTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
