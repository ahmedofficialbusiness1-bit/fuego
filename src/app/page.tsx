"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Bolt, Soup, Drumstick, Wheat, Cloud, Flame } from 'lucide-react';

import { cn } from '@/lib/utils';
import { FuegoLogo } from '@/components/fuego-logo';
import { AISuggestionForm } from '@/components/ai-suggestion-form';
import type { SuggestCookingTimesOutput } from '@/ai/flows/suggest-cooking-times';
import { Toaster } from "@/components/ui/toaster";

const cookingPrograms = [
  { name: 'Strong', icon: Bolt, position: 'top-10 left-10' },
  { name: 'Keep Warm', icon: Flame, position: 'top-20 right-10' },
  { name: 'Rice', icon: Wheat, position: 'top-1/2 -translate-y-1/2 left-0' },
  { name: 'Soup', icon: Soup, position: 'top-1/2 -translate-y-1/2 right-0' },
  { name: 'Chicken', icon: Drumstick, position: 'bottom-20 left-10' },
  { name: 'Steam', icon: Cloud, position: 'bottom-10 right-20' },
];

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
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl w-full">
          <div className="relative flex items-center justify-center w-full aspect-square -mt-16 lg:mt-0">
             <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
            {cookingPrograms.map((program, index) => (
              <div
                key={program.name}
                className={cn(
                  'absolute flex flex-col items-center gap-2 text-primary animate-glow',
                  program.position
                )}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg border border-primary/20">
                   <program.icon className="w-8 h-8 drop-shadow-[0_0_8px_hsl(var(--accent))]"/>
                </div>
                <span className="text-sm font-medium">{program.name}</span>
              </div>
            ))}

            <div className="relative w-[70%] h-[70%]">
              <Image
                src={imageSrc}
                alt="Fuego SmartCook Pressure Cooker"
                width={600}
                height={600}
                priority
                className="rounded-full object-cover shadow-2xl z-10 aspect-square"
                data-ai-hint={imageHint}
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-48 h-24 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-600 flex flex-col items-center justify-center shadow-inner-lg">
                  <span className="text-6xl font-mono font-bold text-accent tracking-widest drop-shadow-[0_0_5px_hsl(var(--accent))]">
                    {formatTime(time)}
                  </span>
                  <span className="text-xs text-primary-foreground/70 uppercase tracking-widest">
                    Fuego
                  </span>
                </div>
              </div>
            </div>
          </div>

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
        </div>
      </main>
      <Toaster />
    </>
  );
}
