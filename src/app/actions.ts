'use server';

import { suggestCookingTimes, type SuggestCookingTimesInput, type SuggestCookingTimesOutput } from '@/ai/flows/suggest-cooking-times';
import { formSchema } from '@/lib/schema';
import { z } from 'zod';

export async function getCookingSuggestion(
  values: z.infer<typeof formSchema>
): Promise<{ suggestion: SuggestCookingTimesOutput | null; error: string | null }> {
  
  const validatedFields = formSchema.safeParse(values);
  if (!validatedFields.success) {
    return { suggestion: null, error: 'Invalid input.' };
  }

  const { dishName, userPreferences, photoDataUri } = validatedFields.data;

  const availablePrograms = ['Keep Warm', 'Strong', 'Rice', 'Soup', 'Chicken', 'Steam'];
  
  const input: SuggestCookingTimesInput = {
    dishName,
    userPreferences,
    availablePrograms,
    photoDataUri,
  };

  try {
    const suggestion = await suggestCookingTimes(input);
    return { suggestion, error: null };
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    return { suggestion: null, error: `Failed to get cooking suggestion. Please try again.` };
  }
}
