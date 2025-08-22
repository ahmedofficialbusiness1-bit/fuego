
"use client";

import { FuegoLogo } from "@/components/fuego-logo";
import { Navigation } from "@/components/ui/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import type { SuggestCookingTimesOutput } from "@/ai/flows/suggest-cooking-times";
import { Bolt, Clock, Cpu, LifeBuoy, Lock, Mail, MessageSquare, Phone, Soup, User, Zap, ArrowRight, Salad, Utensils, ShieldCheck, HeartPulse, BrainCircuit, Users, Thermometer, Scaling, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";


type Face = 'front' | 'right' | 'back' | 'left';

export default function Home() {
  const [suggestion, setSuggestion] =
    useState<SuggestCookingTimesOutput | null>(null);
  const [dishImage, setDishImage] = useState<string | null>(null);

  const [activeFace, setActiveFace] = useState<Face>('front');
  
  const frontRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveFace(entry.target.id as Face);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const refs = [frontRef, rightRef, backRef, leftRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const handleSuggestion = (newSuggestion: SuggestCookingTimesOutput) => {
    setSuggestion(newSuggestion);
  };

  const handleImageChange = (dataUrl: string) => {
    setDishImage(dataUrl);
  };
  
  const handleSetActiveFace = (face: Face) => {
    setActiveFace(face);
  };

  return (
    <>
      <main className="w-full relative overflow-x-hidden">
        <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-8">
            <FuegoLogo className="h-24 w-48" />
            <Navigation activeFace={activeFace} onNavigate={handleSetActiveFace} />
        </header>
        
        <section id="front" ref={frontRef} className="screen-section px-8">
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
            <div className="relative md:w-1/2 w-full h-[60vh] md:h-[90vh]">
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

        <section id="right" ref={rightRef} className="screen-section px-8">
          <div className="flex flex-col md:grid md:grid-cols-6 items-center justify-center w-full max-w-full h-full gap-4">
            <div className="md:col-span-2 order-2 md:order-1">
                <h2 className="text-3xl font-headline font-bold tracking-tighter mb-6 text-center">Faida za Fuego</h2>
                <ScrollArea className="h-[60vh] md:h-[70vh] w-full pr-4">
                    <div className="space-y-4">
                        <Card className="bg-accent/10 backdrop-blur-sm border-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><Bolt className="text-accent" /> Punguza Gharama</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Sahau gharama za mkaa na gesi zinazopanda kila siku! Fuego SmartCook inatumia umeme mdogo sana, ikikupunguzia bili na kukuwekea akiba. Ni uwekezaji bora kwa jiko la kisasa na familia yako.
                            </CardContent>
                        </Card>
                        <Card className="bg-accent/10 backdrop-blur-sm border-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><Clock className="text-accent" /> Hifadhi Muda Wako</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Fuego imeundwa kwa teknolojia ya kisasa inayopika haraka na salama. Haijalishi unapika wali, ugali, makande, maharage,keki, maandazi, supu au nyama ngumu kila kitu kinakamilika kwa muda mfupi bila kupoteza ladha fuego inapika zaidi ya vyakula 44.
                            </CardContent>
                        </Card>
                         <Card className="bg-accent/10 backdrop-blur-sm border-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><HeartPulse className="text-accent" /> Pika Chakula Chenye Afya </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Kwa kutumia Fuego Pressure Cooker utaboresha afya yako kwani huhifadhi virutubisho na vitamini kwenye chakula chako. Hakuna haja ya mafuta mengi au kupika kwa muda mrefu unaopoteza ladha.
                            </CardContent>
                        </Card>
                         <Card className="bg-accent/10 backdrop-blur-sm border-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><Utensils className="text-accent" /> Rafiki Yako Jikoni</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Kwa vitufe vya moja kwa moja (Rice, Beans, Meat, Soup, Chicken n.k.), huitaji kuwa mtaalamu wa mapishi. Bonyeza tu na acha Fuego ikufanyie kazi.
                            </CardContent>
                        </Card>
                        <Card className="bg-accent/10 backdrop-blur-sm border-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="text-accent" /> Usalama wa Kipekee</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Imetengenezwa kwa mfumo salama wa pressure release, lock system, kufunga vizuri na sensa za joto ili kuhakikisha hakuna ajali jikoni. Ni salama kutumia kila siku bila hofu.
                            </CardContent>
                        </Card>
                         <Card className="bg-accent/10 backdrop-blur-sm border-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><Users className="text-accent" /> Urahisi kwa Kila Nyumba</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Iwe wewe ni mama anayetaka kuokoa muda, mwanafunzi, mfanyakazi au familia kubwa – Fuego inakupa suluhisho la Pamoja.
                            </CardContent>
                        </Card>
                        <Card className="bg-accent/10 backdrop-blur-sm border-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><LifeBuoy className="text-accent" /> Warranty na Huduma</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Fuego ina warranty wa mwaka moja hivyo uko salama kutumia fuego bila ya kujali matatizo ya kiufundi na vile vile tunakupa huduma masaa 4 ikiwemo elimu juu ya matumizi.
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </div>
            
            <div className="md:col-span-2 flex justify-center items-center order-1 md:order-2 h-[40vh] md:h-auto">
               <div className="relative w-full h-full md:h-[70vh]">
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
            
            <div className="hidden md:flex md:col-span-1 h-full flex-col items-center justify-center gap-8 order-3">
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1.5s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.5s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.5s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:col-span-1 h-full flex-col items-center justify-center gap-8 order-4">
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.8s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.2s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.3s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1.8s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.8s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        <section id="back" ref={backRef} className="screen-section px-8">
           <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-foreground tracking-tighter">Sifa za Fuego</h2>
            <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Gundua sifa za kiufundi za Fuego SmartCook.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full mx-auto items-center">
            <div className="relative w-full h-[80vh]">
              <Image
                src="/Adobe Express - file.png"
                alt="Fuego SmartCook on a counter"
                fill
                quality={100}
                className="object-contain"
                style={{
                  filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.25))',
                }}
                data-ai-hint="pressure cooker kitchen"
              />
            </div>
            <div className="hidden md:flex flex-col justify-center items-center gap-4">
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0s' }}>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Sehemu ya 1: Sufuria ya Ndani" layout="fill" className="object-cover" data-ai-hint="inner pot"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-xs">Sufuria ya Ndani</h3>
                        <p className="text-xs text-muted-foreground">Non-stick na rahisi kusafisha.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1.2s' }}>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Sehemu ya 2: Elementi ya Kupasha Joto" layout="fill" className="object-cover" data-ai-hint="heating element"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-xs">Elementi ya Joto</h3>
                        <p className="text-xs text-muted-foreground">Inasambaza joto sawasawa.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.4s' }}>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Sehemu ya 3: Mfuniko wa Ndani" layout="fill" className="object-cover" data-ai-hint="lid seal"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-xs">Mfuniko wa Ndani</h3>
                        <p className="text-xs text-muted-foreground">Huzuia mvuke kutoka.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1.6s' }}>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Sehemu ya 4: Rack ya Kustimisha" layout="fill" className="object-cover" data-ai-hint="steam rack"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-xs">Rack ya Kustimisha</h3>
                        <p className="text-xs text-muted-foreground">Kwa mboga na vyakula vingine.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.8s' }}>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Sehemu ya 5: Valve ya Pressure" layout="fill" className="object-cover" data-ai-hint="pressure valve"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-xs">Valve ya Pressure</h3>
                        <p className="text-xs text-muted-foreground">Inadhibiti pressure kwa usalama.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2s' }}>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Sehemu ya 6: Paneli ya Kudhibiti" layout="fill" className="object-cover" data-ai-hint="control panel"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-xs">Paneli ya Kudhibiti</h3>
                        <p className="text-xs text-muted-foreground">Rahisi kutumia na kuelewa.</p>
                    </div>
                </div>
            </div>
             <Card className="bg-accent/10 backdrop-blur-sm border-accent/30">
                <CardHeader>
                    <CardTitle>Sifa za Kiufundi</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 text-muted-foreground text-sm">
                        <li><strong>Voltage/Hz:</strong> 220V - 240V, 50/60Hz</li>
                        <li><strong>Power:</strong> 1000W</li>
                        <li><strong>Outer Housing:</strong> SS#410/0.3mm Thickness</li>
                        <li><strong>Color:</strong> Silver</li>
                        <li><strong>Middle Housing:</strong> Cold Board/1.0mm Thickenss</li>
                        <li><strong>Heater:</strong> 430g</li>
                        <li><strong>Lid:</strong> SS#210/0.8mm Thickness</li>
                        <li><strong>Inner Pot:</strong> 510g Non-Stick Aluminium Pot</li>
                        <li><strong>Cable:</strong> 1.0M Copper cable with 13A UK Plug</li>
                        <li><strong>Accessories:</strong> Measure Cup, Spoon, SS Steam Rack</li>
                        <li><strong>Packaging:</strong> 4Pcs/Ctn, 3-Layer Giftbox + 5-Layer Cartonbox</li>
                    </ul>
                </CardContent>
            </Card>
          </div>
        </section>

        <section id="left" ref={leftRef} className="screen-section px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-foreground tracking-tighter">Wasiliana Nasi</h2>
            <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Una maswali? Tuko hapa kukusaidia. Wasiliana nasi kupitia njia yoyote hapa chini.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <Card className="bg-accent/10 backdrop-blur-sm p-8 order-2 md:order-1 border-accent/30">
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
            <div className="space-y-4 flex flex-col justify-center order-1 md:order-2">
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

    

    