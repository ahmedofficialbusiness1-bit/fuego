"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getCookingSuggestion } from "@/app/actions";
import { formSchema } from "@/lib/schema";
import type { SuggestCookingTimesOutput } from "@/ai/flows/suggest-cooking-times";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Sparkles, Lightbulb, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISuggestionFormProps {
  onSuggestion: (suggestion: SuggestCookingTimesOutput) => void;
  onImageChange: (dataUrl: string) => void;
}

export function AISuggestionForm({ onSuggestion, onImageChange }: AISuggestionFormProps) {
  const [suggestion, setSuggestion] = useState<SuggestCookingTimesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dishName: "",
      userPreferences: "",
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPhotoDataUri(dataUrl);
        onImageChange(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);

    if (!photoDataUri) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please upload a photo of your dish.",
        });
        setIsLoading(false);
        return;
    }

    const result = await getCookingSuggestion({ ...values, photoDataUri });

    setIsLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else if (result.suggestion) {
      setSuggestion(result.suggestion);
      onSuggestion(result.suggestion);
       toast({
        title: "Suggestion Ready!",
        description: "We've found the perfect settings for your dish.",
      });
    }
  }

  return (
    <Card className="w-full max-w-lg bg-white/60 backdrop-blur-sm border-gray-300 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-accent" />
          AI Cooking Assistant
        </CardTitle>
        <CardDescription>
          Tell us what you're cooking, and we'll find the perfect settings for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormItem>
              <FormLabel>Photo of your Dish</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handlePhotoChange} className="file:text-foreground"/>
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="dishName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Chicken Soup, Risotto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferences & Habits</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I like my chicken very tender. I prefer using fresh herbs. Low sodium diet."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : "Get Suggestion" }
            </Button>
          </form>
        </Form>

        {suggestion && (
          <Card className="mt-6 border-accent bg-accent/10">
            <CardHeader>
              <CardTitle className="text-lg">Your Personalized Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                <strong>Suggested Program:</strong>{" "}
                <span className="font-semibold text-accent">{suggestion.suggestedProgram}</span>
              </p>
              <p>
                <strong>Cooking Time:</strong>{" "}
                <span className="font-semibold text-accent">{suggestion.suggestedCookingTime}</span>
              </p>
              {suggestion.additionalTips && (
                <div className="flex items-start gap-2 pt-2">
                  <Lightbulb className="h-5 w-5 mt-0.5 text-accent flex-shrink-0"/>
                  <p>
                    <strong>Pro Tip:</strong> {suggestion.additionalTips}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
