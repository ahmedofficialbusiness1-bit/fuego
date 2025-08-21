"use client";

import { AISuggestionForm } from "@/components/ai-suggestion-form";
import { FuegoLogo } from "@/components/fuego-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import type { SuggestCookingTimesOutput } from "@/ai/flows/suggest-cooking-times";
import { Bolt, Lock, Soup } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [suggestion, setSuggestion] =
    useState<SuggestCookingTimesOutput | null>(null);
  const [dishImage, setDishImage] = useState<string | null>('/1000786745-removebg-preview.png');

  const handleSuggestion = (newSuggestion: SuggestCookingTimesOutput) => {
    setSuggestion(newSuggestion);
  };

  const handleImageChange = (dataUrl: string) => {
    setDishImage(dataUrl);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-black font-body text-white">
        <header className="w-full max-w-7xl mx-auto flex items-center justify-between p-4 md:p-8">
          <FuegoLogo className="h-10 w-auto" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-white hover:text-accent transition-colors border-b-2 border-accent pb-1">Home</Link>
            <Link href="#" className="text-gray-400 hover:text-accent transition-colors">About</Link>
            <Link href="#" className="text-gray-400 hover:text-accent transition-colors">Products</Link>
            <Link href="#" className="text-gray-400 hover:text-accent transition-colors">Contact</Link>
          </nav>
          <Button variant="outline" className="md:hidden bg-transparent border-gray-600 text-white hover:bg-gray-800">Menu</Button>
        </header>
        
        <main className="flex flex-col items-center justify-center p-4 md:p-8 text-center">
          <div className="relative w-full max-w-lg mx-auto aspect-square mb-8">
            <Image
              src={dishImage || '/1000786745-removebg-preview.png'}
              alt="Fuego SmartCook"
              fill
              className="object-contain animate-glow"
              data-ai-hint="pressure cooker"
            />
            <Badge className="absolute top-[10%] left-[5%] bg-black/50 backdrop-blur-sm border-accent text-white animate-pulse">
              <Bolt className="mr-2 h-4 w-4 text-accent" />
              HARAKA (70% Faster)
            </Badge>
            <Badge className="absolute top-[40%] right-[-10%] bg-black/50 backdrop-blur-sm border-accent text-white animate-pulse animation-delay-2000">
              <Soup className="mr-2 h-4 w-4 text-accent" />
              AUTOMATIC Programs
            </Badge>
            <Badge className="absolute bottom-[15%] left-[-5%] bg-black/50 backdrop-blur-sm border-accent text-white animate-pulse animation-delay-4000">
              <Lock className="mr-2 h-4 w-4 text-accent" />
              SAFI (Safety Lock)
            </Badge>
          </div>
          
          <div className="space-y-4 max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-headline">
                UHODARI WA KUPIKIA
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
                FUMUA LADHA ZOTE KWA SEKUNDE
              </h2>
              <p className="max-w-lg text-gray-400 mx-auto text-base">
                Mfinyaniko wa Umeme wa Kisasa na Vipimo 10 vilivyoboreshwa. Pika kwa usahihi, weka joto, na ongoza kwa urahisi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">SOMA MAELEZO ZAIDI</Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black font-bold">NAUNUA SASA</Button>
              </div>
            </div>

            <div className="w-full max-w-lg mt-12">
                <AISuggestionForm onSuggestion={handleSuggestion} onImageChange={handleImageChange} />
            </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}
