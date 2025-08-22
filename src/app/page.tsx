
"use client";

import { FuegoLogo } from "@/components/fuego-logo";
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
import { Navigation } from "@/components/ui/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";


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
        <section id="front" ref={sectionRefs.front} className="screen-section px-8">
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

        <section id="right" ref={sectionRefs.right} className="screen-section px-8">
          <div className="flex flex-col md:grid md:grid-cols-6 items-center justify-center w-full max-w-full h-full">
            <div className="md:col-span-2 order-2 md:order-1">
                <h2 className="text-3xl font-headline font-bold tracking-tighter mb-6 text-center">Faida za Fuego</h2>
                <ScrollArea className="h-[60vh] md:h-[70vh] w-full pr-4">
                    <div className="space-y-4">
                        <Card className="bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><Bolt className="text-accent" /> Punguza Gharama</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Sahau gharama za mkaa na gesi zinazopanda kila siku! Fuego SmartCook inatumia umeme mdogo sana, ikikupunguzia bili na kukuwekea akiba. Ni uwekezaji bora kwa jiko la kisasa na familia yako.
                            </CardContent>
                        </Card>
                        <Card className="bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><Clock className="text-accent" /> Hifadhi Muda Wako</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Fuego imeundwa kwa teknolojia ya kisasa inayopika haraka na salama. Haijalishi unapika wali, ugali, makande, maharage,keki, maandazi, supu au nyama ngumu kila kitu kinakamilika kwa muda mfupi bila kupoteza ladha fuego inapika zaidi ya vyakula 44.
                            </CardContent>
                        </Card>
                         <Card className="bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><HeartPulse className="text-accent" /> Pika Chakula Chenye Afya </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Kwa kutumia Fuego Pressure Cooker utaboresha afya yako kwani huhifadhi virutubisho na vitamini kwenye chakula chako. Hakuna haja ya mafuta mengi au kupika kwa muda mrefu unaopoteza ladha.
                            </CardContent>
                        </Card>
                         <Card className="bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><Utensils className="text-accent" /> Rafiki Yako Jikoni</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Kwa vitufe vya moja kwa moja (Rice, Beans, Meat, Soup, Chicken n.k.), huitaji kuwa mtaalamu wa mapishi. Bonyeza tu na acha Fuego ikufanyie kazi.
                            </CardContent>
                        </Card>
                        <Card className="bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="text-accent" /> Usalama wa Kipekee</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Imetengenezwa kwa mfumo salama wa pressure release, lock system, kufunga vizuri na sensa za joto ili kuhakikisha hakuna ajali jikoni. Ni salama kutumia kila siku bila hofu.
                            </CardContent>
                        </Card>
                         <Card className="bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base"><Users className="text-accent" /> Urahisi kwa Kila Nyumba</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                                Iwe wewe ni mama anayetaka kuokoa muda, mwanafunzi, mfanyakazi au familia kubwa – Fuego inakupa suluhisho la Pamoja.
                            </CardContent>
                        </Card>
                        <Card className="bg-card/60 backdrop-blur-sm">
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
               <div className="relative w-full h-full md:h-[90vh]">
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
                        <Image src="https://placehold.co/100x100.png" alt="Picha 1: Chakula cha Wali" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="rice dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 1: Wali</h3>
                        <p className="text-xs text-muted-foreground">Wali mtamu na wa kuchambuka.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1.5s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 2: Chakula cha Nyama" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="meat stew"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 2: Nyama</h3>
                        <p className="text-xs text-muted-foreground">Rosti laini na lenye ladha.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.5s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 3: Chakula cha Supu" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="soup"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 3: Supu</h3>
                        <p className="text-xs text-muted-foreground">Supu ya moto na yenye virutubisho.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.5s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 4: Chakula cha Maharage" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="bean stew"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Picha 4: Maharage</h3>
                        <p className="text-xs text-muted-foreground">Maharage laini na ya kuvutia.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 5: Keki" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="cake"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Picha 5: Keki</h3>
                        <p className="text-xs text-muted-foreground">Keki laini iliyopikwa kwa urahisi.</p>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:col-span-1 h-full flex-col items-center justify-center gap-8 order-4">
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.8s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 6: Samaki" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="fish dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 6: Samaki</h3>
                        <p className="text-xs text-muted-foreground">Samaki wa kukaanga.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.2s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 7: Kuku" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 7: Kuku</h3>
                        <p className="text-xs text-muted-foreground">Kuku wa kuchoma.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.3s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 8: Mboga za Majani" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="vegetable stir-fry"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Picha 8: Mboga</h3>
                        <p className="text-xs text-muted-foreground">Mboga za majani za kukaanga.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1.8s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 9: Viazi" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="roast potatoes"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Picha 9: Viazi</h3>
                        <p className="text-xs text-muted-foreground">Viazi vya kukaanga.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.8s' }}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <Image src="https://placehold.co/100x100.png" alt="Picha 10: Ugali" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="ugali"/>
                    </div>
                     <div>
                        <h3 className="font-bold text-sm">Picha 10: Ugali</h3>
                        <p className="text-xs text-muted-foreground">Ugali mlaini na wa moto.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        <section id="back" ref={sectionRefs.back} className="screen-section px-8">
           <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-foreground tracking-tighter">Sifa za Fuego</h2>
            <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Gundua sifa za kiufundi za Fuego SmartCook.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl w-full mx-auto items-center">
            <div className="relative w-full h-[60vh] md:col-span-2">
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
             <Card className="bg-card/60 backdrop-blur-sm md:col-span-1">
                <CardHeader>
                    <CardTitle>Sifa za Kiufundi</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 text-muted-foreground text-sm">
                        <li><strong>Voltage/Hz:</strong> 220V - 240V, 50/60Hz</li>
                        <li><strong>Power:</strong> 1000W</li>
                        <li><strong>Outer Housing:</strong> SS#410/0.3mm Thickness</li>
                        <li><strong>Color:</strong> Silver</li>
                        <li><strong>Middle Housing:</strong> Cold Board/1.0mm Thickness</li>
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

        <section id="left" ref={sectionRefs.left} className="screen-section px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-foreground tracking-tighter">Wasiliana Nasi</h2>
            <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Una maswali? Tuko hapa kukusaidia. Wasiliana nasi kupitia njia yoyote hapa chini.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <Card className="bg-card/60 backdrop-blur-sm p-8 order-2 md:order-1">
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

    

    

