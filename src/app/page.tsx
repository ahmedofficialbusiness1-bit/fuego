"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

import { FuegoLogo } from '@/components/fuego-logo';
import { AISuggestionForm } from '@/components/ai-suggestion-form';
import type { SuggestCookingTimesOutput } from '@/ai/flows/suggest-cooking-times';
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [time, setTime] = useState(28 * 60); // 28 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [imageSrc, setImageSrc] = useState("/fuego-cooker.png");
  const [imageHint, setImageHint] = useState("pressure cooker");

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, time]);

  const handleSuggestion = useCallback((suggestion: SuggestCookingTimesOutput) => {
    if (suggestion.suggestedCookingTime) {
      const [minutes, seconds] = suggestion.suggestedCookingTime.split(':').map(Number);
      if (!isNaN(minutes) && !isNaN(seconds)) {
        const newTime = (minutes * 60) + seconds;
        setTime(newTime);
        setIsTimerRunning(true);
      }
    }
  }, []);
  
  const handleImageChange = useCallback((newImageSrc: string) => {
    setImageSrc(newImageSrc);
    setImageHint("user uploaded dish");
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <>
      <main className="min-h-screen w-full bg-background font-body text-foreground flex items-center justify-center p-4 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center max-w-7xl w-full gap-16">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <FuegoLogo className="h-10 w-auto" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight font-headline">
              Fuego SmartCook
            </h1>
            <p className="text-2xl text-foreground/80 font-medium">
              Always Smart.
            </p>
            <p className="max-w-md text-muted-foreground">
              Experience the future of cooking. Fuego SmartCook adapts to your needs, delivering perfect meals every time with AI-powered precision.
            </p>
            <AISuggestionForm onSuggestion={handleSuggestion} onImageChange={handleImageChange} />
          </div>
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src={imageSrc}
              alt="Fuego SmartCook"
              fill
              className="object-contain"
              data-ai-hint={imageHint}
            />
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
