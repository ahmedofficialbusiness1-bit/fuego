"use client";

import { AISuggestionForm } from "@/components/ai-suggestion-form";
import { FuegoLogo } from "@/components/fuego-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import type { SuggestCookingTimesOutput } from "@/ai/flows/suggest-cooking-times";
import { Bolt, Clock, Cpu, LifeBuoy, Lock, Mail, MessageSquare, Phone, Soup, User, Zap, HomeIcon, Lightbulb, UserCheck, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [activeFace, setActiveFace] = useState<Face>('front');

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
  
  const title = "FUEGO PRESSURE COOKER";

  return (
    <>
      <div className="fixed inset-0 -z-20 h-full w-full bg-black" />
      <div className="stars" />
      <div className="font-body text-foreground min-h-screen flex flex-col justify-between">
        <header className="fixed top-0 left-0 w-full max-w-7xl mx-auto flex items-center justify-between p-4 md:p-8 z-50">
          <FuegoLogo className="h-28 w-64" />
          <Navigation activeFace={activeFace} setActiveFace={setActiveFace} />
        </header>

        <main className="flex-grow flex items-center justify-center">
          <div className="scene">
            <div className={`cube show-${activeFace}`}>
              {/* Face 1: Main Product View */}
              <div className="face front flex-col">
                 <div 
                  className="relative w-full max-w-4xl mx-auto h-[80vh] z-10"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ perspective: '1000px' }}
                >
                  <Image
                    src="/Adobe Express - file.png"
                    alt="Fuego SmartCook"
                    fill
                    quality={100}
                    className="object-contain"
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
                 <div className="absolute inset-0 flex items-end justify-center pb-20 -z-10">
                    <h1 className="text-7xl md:text-9xl font-extrabold text-white/10 tracking-tighter [text-shadow:none]">
                        {title}
                    </h1>
                </div>
              </div>

              {/* Face 2: AI Suggestion Form */}
              <div className="face right">
                <AISuggestionForm onSuggestion={handleSuggestion} onImageChange={handleImageChange} />
              </div>

              {/* Face 3: Features */}
              <div className="face back">
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
              </div>

              {/* Face 4: Contact Form */}
              <div className="face left">
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
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}
