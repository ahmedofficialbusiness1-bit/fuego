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
import { useState, useEffect } from "react";
import type { MouseEvent } from "react";

export default function Home() {
  const [suggestion, setSuggestion] =
    useState<SuggestCookingTimesOutput | null>(null);
  const [dishImage, setDishImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const title = "FUEGO PRESSURE COOKER";
  
  const [randomAngles, setRandomAngles] = useState<number[]>([]);

  useEffect(() => {
    // This now only runs on the client, after the initial render.
    setRandomAngles(
      Array.from({ length: title.length }, () => Math.random() * 360)
    );
  }, [title.length]);

  useEffect(() => {
    const dotContainer = document.getElementById('dot-container');
    if (!dotContainer) return;

    if (dotContainer.childElementCount > 0) return;

    const gridSize = 20;
    const numDots = (window.innerWidth / gridSize) * (window.innerHeight / gridSize);

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        const x = (i * gridSize) % window.innerWidth;
        const y = Math.floor(i * gridSize / window.innerWidth) * gridSize;
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.dataset.originalX = String(x);
        dot.dataset.originalY = String(y);
        dotContainer.appendChild(dot);
    }
    
    const handleMouseMove = (e: globalThis.MouseEvent) => {
        const dots = document.querySelectorAll('.dot');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const magnetRadius = 150;

        dots.forEach(dot => {
            const el = dot as HTMLElement;
            const dotX = parseFloat(el.dataset.originalX || '0');
            const dotY = parseFloat(el.dataset.originalY || '0');
            
            const dx = mouseX - dotX;
            const dy = mouseY - dotY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < magnetRadius) {
                el.classList.add('highlighted');
            } else {
                el.classList.remove('highlighted');
            }
        });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
}, []);


  const handleSuggestion = (newSuggestion: SuggestCookingTimesOutput) => {
    setSuggestion(newSuggestion);
  };

  const handleImageChange = (dataUrl: string) => {
    setDishImage(dataUrl);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    setRotation({ x: -y * 10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };
  
  const subtitle = "FUMUA LADHA ZOTE KWA SEKUNDE";

  return (
    <>
      <div id="dot-container"></div>
      <div className="fixed inset-0 -z-20 h-full w-full bg-white" />
      <div className="min-h-screen w-full bg-transparent font-body text-foreground">
        <header className="w-full max-w-7xl mx-auto flex items-center justify-between p-4 md:p-8">
          <FuegoLogo className="h-28 w-64" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-foreground hover:text-accent transition-colors border-b-2 border-accent pb-1">Home</Link>
            <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">About</Link>
            <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">Products</Link>
            <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact</Link>
          </nav>
          <Button variant="outline" className="md:hidden">Menu</Button>
        </header>
        
        <main className="flex flex-col items-center p-4 md:p-8">
          <div 
            className="relative w-full max-w-2xl mx-auto aspect-square"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <Image
              src="/Adobe Express - file.png"
              alt="Fuego SmartCook"
              width={800}
              height={800}
              quality={100}
              className="object-contain w-full h-full"
              style={{
                filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))',
                transition: 'transform 0.1s ease-out',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
              data-ai-hint="pressure cooker"
            />
            <Badge className="absolute top-[10%] left-[5%] bg-background/50 backdrop-blur-sm border-accent text-foreground animate-pulse">
              <Bolt className="mr-2 h-4 w-4 text-accent" />
              HARAKA (70% Faster)
            </Badge>
            <Badge className="absolute top-[40%] right-[-10%] bg-background/50 backdrop-blur-sm border-accent text-foreground animate-pulse animation-delay-2000">
              <Soup className="mr-2 h-4 w-4 text-accent" />
              AUTOMATIC Programs
            </Badge>
            <Badge className="absolute bottom-[15%] left-[-5%] bg-background/50 backdrop-blur-sm border-accent text-foreground animate-pulse animation-delay-4000">
              <Lock className="mr-2 h-4 w-4 text-accent" />
              SAFI (Safety Lock)
            </Badge>
          </div>
          
          <div className="space-y-4 max-w-4xl text-center">
             <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter [text-shadow:0_4px_15px_rgba(0,0,0,0.5)] group">
                {title.split('').map((char, index) => (
                  <span
                    key={index}
                    className="inline-block transition-all duration-300 ease-out group-hover:animate-disperse-and-gather hover:text-accent hover:-translate-y-2 hover:scale-110"
                    style={{ 
                      whiteSpace: 'pre',
                      '--angle': `${randomAngles[index]}deg` 
                    } as React.CSSProperties}
                  >
                    {char}
                  </span>
                ))}
            </h1>
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground/90 tracking-tight">
              {subtitle.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-300 ease-out hover:text-accent hover:-translate-y-2 hover:scale-110"
                  style={{ whiteSpace: 'pre' }}
                >
                  {char}
                </span>
              ))}
            </h2>
            <p className="max-w-xl text-muted-foreground mx-auto text-sm">
              Mfinyaniko wa Umeme wa Kisasa na Vipimo 10 vilivyoboreshwa. Pika kwa usahihi, weka joto, na ongoza kwa urahisi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">SOMA MAELEZO ZAIDI</Button>
              <Button size="lg" variant="outline" className="font-bold">NUNUA SASA</Button>
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
