
"use client";

import { FuegoLogo } from "@/components/fuego-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import type { SuggestCookingTimesOutput } from "@/ai/flows/suggest-cooking-times";
import { Bolt, Clock, Cpu, LifeBuoy, Lock, Mail, MessageSquare, Phone, Soup, User, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/ui/navigation";

type Face = 'front' | 'right' | 'back' | 'left';

export default function Home() {
  const [suggestion, setSuggestion] =
    useState<SuggestCookingTimesOutput | null>(null);
  const [dishImage, setDishImage] = useState<string | null>(null);
  const [activeFace, setActiveFace] = useState<Face>('front');

  const sectionRefs = {
    front: useRef<HTMLDivElement>(null),
    right: useRef<HTMLDivElement>(null),
    back: useRef<HTMLDivElement>(null),
    left: useRef<HTMLDivElement>(null),
  };

  const handleSuggestion = (newSuggestion: SuggestCookingTimesOutput) => {
    setSuggestion(newSuggestion);
  };

  const handleImageChange = (dataUrl: string) => {
    setDishImage(dataUrl);
  };

  const handleSetActiveFace = (face: Face) => {
    setActiveFace(face);
    let ref;
    switch (face) {
      case 'front':
        ref = sectionRefs.front;
        break;
      case 'right':
        ref = sectionRefs.right;
        break;
      case 'back':
        ref = sectionRefs.back;
        break;
      case 'left':
        ref = sectionRefs.left;
        break;
    }
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const face = entry.target.id as Face;
          setActiveFace(face);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);


  return (
    <>
      
      <main className="w-full">
        <section id="front" ref={sectionRefs.front} className="screen-section relative">
          <FuegoLogo className="h-24 w-48 absolute top-8 left-8" />
          <div className="absolute top-8 right-8 z-10">
            <Navigation activeFace={activeFace} setActiveFace={handleSetActiveFace} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-headline font-black text-foreground tracking-tighter">
                FUEGO PRESSURE COOKER
              </h1>
              <p className="max-w-md mx-auto md:mx-0 mt-6 text-muted-foreground">
                The smart way to cook. Perfectly cooked meals, every single time. Effortless, fast, and intelligent.
              </p>
              <div className="flex items-center gap-4 mt-8 justify-center md:justify-start">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Nunua Sasa <ArrowRight />
                </Button>
                <Button size="lg" variant="outline">
                  Soma Zaidi <ArrowRight />
                </Button>
              </div>
            </div>
            <div className="relative md:w-1/2 w-full h-[90vh]">
              <Image
                src="/Adobe Express - file.png"
                alt="Fuego SmartCook"
                fill
                quality={100}
                className="object-contain"
                style={{
                  filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))',
                }}
                data-ai-hint="pressure cooker"
              />
            </div>
          </div>
        </section>

        <section id="right" ref={sectionRefs.right} className="screen-section">
          <div className="grid md:grid-cols-5 items-center justify-center gap-12 w-full max-w-7xl">
            <div className="col-span-1 text-right">
              <h2 className="text-3xl font-bold tracking-tighter">Gundua Upishi wa Kisasa</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Fuego SmartCook inabadilisha jinsi unavyopika. Kwa teknolojia yake ya hali ya juu, unaweza kupika milo mbalimbali kwa haraka, kwa urahisi, na kwa uhakika wa matokeo bora kila wakati. Sahau usumbufu wa jikoni na karibisha mapishi ya kisasa.
              </p>
               <Button size="lg" variant="outline" className="mt-6">
                  Jifunze Zaidi <ArrowRight />
                </Button>
            </div>
            
            <div className="col-span-3 flex justify-center items-center">
              <div className="relative w-full h-[90vh]">
                  <Image
                    src="/Adobe Express - file.png"
                    alt="Fuego SmartCook"
                    fill
                    quality={100}
                    className="object-contain"
                    style={{
                      filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))',
                    }}
                    data-ai-hint="pressure cooker"
                  />
                </div>
            </div>
            
            <div className="col-span-1 h-full flex flex-col items-center justify-around">
                <div className="flex items-center gap-4 w-full">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 1: Chakula cha Wali" layout="fill" objectFit="cover" data-ai-hint="rice dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 1: Wali</h3>
                        <p className="text-xs text-muted-foreground">Wali mtamu na wa kuchambuka.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 2: Chakula cha Nyama" layout="fill" objectFit="cover" data-ai-hint="meat stew"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 2: Nyama</h3>
                        <p className="text-xs text-muted-foreground">Rosti laini na lenye ladha.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 3: Chakula cha Supu" layout="fill" objectFit="cover" data-ai-hint="soup"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 3: Supu</h3>
                        <p className="text-xs text-muted-foreground">Supu ya moto na yenye virutubisho.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 4: Chakula cha Maharage" layout="fill" objectFit="cover" data-ai-hint="bean stew"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Picha 4: Maharage</h3>
                        <p className="text-xs text-muted-foreground">Maharage laini na ya kuvutia.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 5: Keki" layout="fill" objectFit="cover" data-ai-hint="cake"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Picha 5: Keki</h3>
                        <p className="text-xs text-muted-foreground">Keki laini iliyopikwa kwa urahisi.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        <section id="back" ref={sectionRefs.back} className="screen-section">
           <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter">Sifa za Kipekee</h2>
            <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Gundua uwezo wa Fuego SmartCook unaofanya upishi kuwa rahisi na wa kufurahisha.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader className="items-center">
                <Zap className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Upishi wa Haraka</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-sm">
                Punguza muda wa kupika hadi 70% ikilinganishwa na njia za kawaida. Zaidi ya ladha, ni kuhusu muda wako.
              </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader className="items-center">
                <Cpu className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Programu za Akili</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-sm">
                Programu 10 zilizowekwa tayari kwa ajili ya wali, supu, nyama, na zaidi. Chagua na uache Fuego ifanye mengine.
              </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader className="items-center">
                <Clock className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Weka Joto Moja kwa Moja</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-sm">
                Baada ya kupika, Fuego huweka chakula chako joto hadi uwe tayari kukila. Hakuna tena chakula baridi.
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="left" ref={sectionRefs.left} className="screen-section">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter">Wasiliana Nasi</h2>
            <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Una maswali? Tuko hapa kukusaidia. Wasiliana nasi kupitia njia yoyote hapa chini.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <Card className="bg-card/60 backdrop-blur-sm p-8">
              <form className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Jina lako" className="pl-10" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="email" placeholder="Barua pepe yako" className="pl-10" />
                </div>
                <div className="relative">
                  <Textarea placeholder="Ujumbe wako..." rows={5} />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Tuma Ujumbe</Button>
              </form>
            </Card>
            <div className="space-y-4 flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-accent" />
                <span className="text-muted-foreground">+255 712 345 678</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-accent" />
                <span className="text-muted-foreground">msaada@fuego.co.tz</span>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquare className="w-6 h-6 text-accent" />
                <span className="text-muted-foreground">Chat na sisi moja kwa moja</span>
              </div>
              <div className="flex items-center gap-4">
                <LifeBuoy className="w-6 h-6 text-accent" />
                <span className="text-muted-foreground">Tembelea kituo chetu cha usaidizi</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Toaster />
    </>
  );
}
