import { z } from 'zod';

export const formSchema = z.object({
  dishName: z.string().min(3, { message: "Dish name must be at least 3 characters long." }),
  userPreferences: z.string().min(10, { message: "Preferences must be at least 10 characters long." }),
  photoDataUri: z.string().url({ message: "Invalid photo format." }),
});
