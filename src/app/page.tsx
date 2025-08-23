
"use client";

import { FuegoLogo } from "@/components/fuego-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import type { SuggestCookingTimesOutput } from "@/ai/flows/suggest-cooking-times";
import { Bolt, Clock, Cpu, LifeBuoy, Lock, Mail, MessageSquare, Phone, Soup, User, Zap, ArrowRight, Salad, Utensils, ShieldCheck, HeartPulse, BrainCircuit, Users, Thermometer, Scaling, Wrench, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import type { MouseEvent, Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/ui/navigation";


export default function Home() {
  const [suggestion, setSuggestion] =
    useState<SuggestCookingTimesOutput | null>(null);
  const [dishImage, setDishImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState('');
  const transformTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (transformTimeoutRef.current) {
      clearTimeout(transformTimeoutRef.current);
      transformTimeoutRef.current = null;
    }
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const rotateX = (y / height - 0.5) * -15; 
    const rotateY = (x / width - 0.5) * 15;
    
    const newTransform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    setImageTransform(newTransform);
  };

  const handleMouseLeave = () => {
     transformTimeoutRef.current = setTimeout(() => {
        const resetTransform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        setImageTransform(resetTransform);
     }, 300);
  };
  
  const handleSuggestion = (newSuggestion: SuggestCookingTimesOutput) => {
    setSuggestion(newSuggestion);
  };

  const handleImageChange = (dataUrl: string) => {
    setDishImage(dataUrl);
  };
  
  useEffect(() => {
    const timeout = transformTimeoutRef.current;
    return () => {
        if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <main className="w-full relative flex flex-col">
        <header className="sticky top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm">
            <FuegoLogo className="h-8 w-auto" />
            <Navigation />
        </header>
        
        <section id="nyumbani" className="min-h-screen flex items-center justify-center px-8 pt-16 pb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-headline font-black text-foreground tracking-tighter">
                FUEGO PRESSURE COOKER
              </h1>
              <p className="max-w-md mx-auto md:mx-0 mt-6 text-muted-foreground">
                Njia ya kisasa ya kupika.
Chakula kinapikwa kwa ubora kila wakati.
Rahisi, haraka, na chenye Ladha.
              </p>
              <h2 className="mt-8 font-headline text-3xl font-bold text-foreground text-center md:text-left">Ni Jiko Fanisi</h2>
              <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Nunua Sasa <ArrowRight />
                </Button>
                <Link href="#faida">
                  <Button size="lg" variant="outline">
                    Soma Zaidi <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
            <div
                className="relative md:w-1/2 w-full h-[60vh] md:h-[90vh]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
              <Image
                src="/Adobe Express - file.png"
                alt="Fuego SmartCook"
                fill
                quality={100}
                className="object-contain transition-transform duration-300 ease-out"
                style={{
                  filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))',
                  transform: imageTransform,
                }}
                data-ai-hint="pressure cooker"
              />
            </div>
          </div>
        </section>

        <section id="faida" className="min-h-screen flex items-center justify-center px-8 pt-16 pb-16 bg-secondary/30">
          <div className="flex flex-col md:grid md:grid-cols-6 items-center justify-center w-full max-w-full h-full gap-4">
            <div className="md:col-span-2 order-2 md:order-1">
                <h2 className="text-3xl font-headline font-bold tracking-tighter mb-6 text-center">Faida za Fuego</h2>
                <ScrollArea className="h-[60vh] md:h-[70vh] w-full pr-4">
                    <div className="space-y-4">
                        {[
                            { icon: Bolt, title: 'Punguza Gharama', text: 'Sahau gharama za mkaa na gesi zinazopanda kila siku! Fuego SmartCook inatumia umeme mdogo sana, ikikupunguzia bili na kukuwekea akiba. Ni uwekezaji bora kwa jiko la kisasa na familia yako.' },
                            { icon: Clock, title: 'Hifadhi Muda Wako', text: 'Fuego imeundwa kwa teknolojia ya kisasa inayopika haraka na salama. Haijalishi unapika wali, ugali, makande, maharage,keki, maandazi, supu au nyama ngumu kila kitu kinakamilika kwa muda mfupi bila kupoteza ladha fuego inapika zaidi ya vyakula 44.' },
                            { icon: HeartPulse, title: 'Pika Chakula Chenye Afya', text: 'Kwa kutumia Fuego Pressure Cooker utaboresha afya yako kwani huhifadhi virutubisho na vitamini kwenye chakula chako. Hakuna haja ya mafuta mengi au kupika kwa muda mrefu unaopoteza ladha.' },
                            { icon: Utensils, title: 'Rafiki Yako Jikoni', text: 'Kwa vitufe vya moja kwa moja (Rice, Beans, Meat, Soup, Chicken n.k.), huitaji kuwa mtaalamu wa mapishi. Bonyeza tu na acha Fuego ikufanyie kazi.' },
                            { icon: ShieldCheck, title: 'Usalama wa Kipekee', text: 'Imetengenezwa kwa mfumo salama wa pressure release, lock system, kufunga vizuri na sensa za joto ili kuhakikisha hakuna ajali jikoni. Ni salama kutumia kila siku bila hofu.' },
                            { icon: Users, title: 'Urahisi kwa Kila Nyumba', text: 'Iwe wewe ni mama anayetaka kuokoa muda, mwanafunzi, mfanyakazi au familia kubwa – Fuego inakupa suluhisho la Pamoja.' },
                            { icon: LifeBuoy, title: 'Warranty na Huduma', text: 'Fuego ina warranty wa mwaka moja hivyo uko salama kutumia fuego bila ya kujali matatizo ya kiufundi na vile vile tunakupa huduma masaa 4 ikiwemo elimu juu ya matumizi.' },
                        ].map((item, index) => (
                            <Dialog key={item.title}>
                              <DialogTrigger asChild>
                                  <Card className="cursor-pointer bg-accent/10 backdrop-blur-sm border-accent/30 shadow-2xl transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105 hover:z-20">
                                      <CardHeader>
                                          <CardTitle className="flex items-center gap-2 text-base"><item.icon className="text-accent" /> {item.title}</CardTitle>
                                      </CardHeader>
                                      <CardContent className="text-xs text-muted-foreground">
                                          {item.text}
                                      </CardContent>
                                  </Card>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[80vw] bg-card/80 backdrop-blur-lg">
                                <DialogTitle className="sr-only">{item.title}</DialogTitle>
                                <DialogDescription className="sr-only">{item.text}</DialogDescription>
                                <Card className="bg-transparent border-0 shadow-none">
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-4 text-2xl"><item.icon className="text-accent w-8 h-8" /> {item.title}</CardTitle>
                                  </CardHeader>
                                  <CardContent className="text-base text-foreground">
                                    {item.text}
                                  </CardContent>
                                </Card>
                              </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            
            <div className="md:col-span-2 flex justify-center items-center order-1 md:order-2 h-[40vh] md:h-auto">
               <div 
                  className="relative w-full h-full md:h-[60vh]"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src="/Adobe Express - file.png"
                    alt="Fuego SmartCook"
                    fill
                    quality={100}
                    className="object-contain transition-transform duration-300 ease-out"
                    style={{
                      filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))',
                       transform: imageTransform,
                    }}
                    data-ai-hint="pressure cooker"
                  />
                </div>
            </div>
            
            <div className="md:col-span-2 flex-col order-3 md:order-3">
                <h3 className="text-lg font-headline font-bold text-center mb-4">Baadhi ya vyakula unavyoweza kupika</h3>
                <div className="hidden md:grid grid-cols-2 gap-4 h-full">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="/ugali.png" alt="Ugali" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="ugali dish"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Ugali</h3>
                                <p className="text-xs text-muted-foreground">Unapika vyakula vyote jamii ya ugali.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1.5s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="/maharage2.png" alt="Maharage" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="beans dish"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Maharage</h3>
                                <p className="text-xs text-muted-foreground">Unapika vyakula vyote jamii ya maharage yakiwemo makande.</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.5s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="/wali2.png" alt="Wali" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="rice dish"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Wali</h3>
                                <p className="text-xs text-muted-foreground">Unapika wali wa aina yoyote.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.5s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="https://placehold.co/100x100.png" alt="Supu" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="soup bowl"/>
                            </div>
                             <div>
                                <h3 className="font-bold text-sm">Supu</h3>
                                <p className="text-xs text-muted-foreground">Supu ya kuku.</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="https://placehold.co/100x100.png" alt="Keki" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="cake slice"/>
                            </div>
                             <div>
                                <h3 className="font-bold text-sm">Keki</h3>
                                <p className="text-xs text-muted-foreground">Keki ya vanilla.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.8s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="/kuku.png" alt="Nyama" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="chicken dish"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Nyama</h3>
                                <p className="text-xs text-muted-foreground">Unapika nyama na kuku wa aina zote.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.2s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="https://placehold.co/100x100.png" alt="Ndizi" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="plantain dish"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Ndizi</h3>
                                <p className="text-xs text-muted-foreground">Ndizi za kukaanga.</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '0.3s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="https://placehold.co/100x100.png" alt="Makande" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="maize beans"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Makande</h3>
                                <p className="text-xs text-muted-foreground">Makande ya nazi.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '1.8s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="https://placehold.co/100x100.png" alt="Viazi" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="potato dish"/>
                            </div>
                             <div>
                                <h3 className="font-bold text-sm">Viazi</h3>
                                <p className="text-xs text-muted-foreground">Viazi vya kukaanga.</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4 w-full animate-bubble-float" style={{ animationDelay: '2.8s' }}>
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                                <Image src="https://placehold.co/100x100.png" alt="Ugali" width={100} height={100} className="object-cover w-full h-full" data-ai-hint="ugali dish"/>
                            </div>
                             <div>
                                <h3 className="font-bold text-sm">Ugali</h3>
                                <p className="text-xs text-muted-foreground">Ugali na samaki.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        <section id="sifa" className="min-h-screen flex flex-col items-center justify-center px-8 pt-16 pb-16 overflow-hidden">
          <div className="text-center mb-12 w-full max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-foreground tracking-tighter">Sifa za Ziada</h2>
              <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Sifa za kiufundi na ubora wa Fuego smartcooker</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl w-full mx-auto items-center">
              <div className="relative w-full h-[70vh]">
                  <Image
                      src="/Adobe Express - file.png"
                      alt="Fuego SmartCook Sifa"
                      fill
                      quality={100}
                      className="object-contain"
                      data-ai-hint="pressure cooker"
                  />
              </div>

              <div className="flex flex-col gap-8 justify-center h-full">
                  <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col items-center text-center gap-4 animate-bubble-float" style={{ animationDelay: '0s' }}>
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent bg-background z-10">
                              <Image src="/cup.png" alt="Kikombe" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="measuring cup"/>
                          </div>
                          <div>
                              <h3 className="font-bold text-base">Kikombe</h3>
                              <p className="text-sm text-muted-foreground">Inakuja na kikombe cha kupimia.</p>
                          </div>
                      </div>
                      <div className="flex flex-col items-center text-center gap-4 animate-bubble-float" style={{ animationDelay: '0.5s' }}>
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent bg-background z-10">
                              <Image src="/spoon.png" alt="Kijiko" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="spoon"/>
                          </div>
                          <div>
                              <h3 className="font-bold text-base">Kijiko</h3>
                              <p className="text-sm text-muted-foreground">Inakuja na kijiko.</p>
                          </div>
                      </div>
                      <div className="flex flex-col items-center text-center gap-4 animate-bubble-float" style={{ animationDelay: '1.0s' }}>
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent bg-background z-10">
                              <Image src="/rack.png" alt="Steam Rack" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="steam rack"/>
                          </div>
                          <div>
                              <h3 className="font-bold text-base">Steam Rack</h3>
                              <p className="text-sm text-muted-foreground">Inakuja na Steam Rack kwa ajili ya kuoka.</p>
                          </div>
                      </div>
                       <div className="flex flex-col items-center text-center gap-4 animate-bubble-float" style={{ animationDelay: '1.5s' }}>
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent bg-background z-10">
                              <Image src="/wire.png" alt="Waya" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="power cable"/>
                          </div>
                          <div>
                              <h3 className="font-bold text-base">Waya Imara</h3>
                              <p className="text-sm text-muted-foreground">1.0M Copper cable, yenye pini tatu.</p>
                          </div>
                      </div>
                       <div className="flex flex-col items-center text-center gap-4 animate-bubble-float" style={{ animationDelay: '2.0s' }}>
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent bg-background z-10">
                              <Image src="/pot2.png" alt="Sufuria Kubwa" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="cooking pot"/>
                          </div>
                          <div>
                              <h3 className="font-bold text-base">Sufuria Kubwa</h3>
                              <p className="text-sm text-muted-foreground">Lita 6, non-stick Aluminium.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="mt-12 w-full max-w-4xl">
              <Dialog>
                <DialogTrigger asChild>
                    <Card className="cursor-pointer bg-accent/10 backdrop-blur-sm border-accent/30 shadow-2xl transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105 hover:z-20 w-full">
                        <CardHeader>
                            <CardTitle>Sifa za Kiufundi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-muted-foreground text-xs columns-2">
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
                            </ul>
                        </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] bg-card/80 backdrop-blur-lg">
                    <DialogTitle className="sr-only">Sifa za Kiufundi</DialogTitle>
                    <DialogDescription className="sr-only">Detailed technical specifications of the Fuego SmartCook.</DialogDescription>
                    <Card className="bg-transparent border-0 shadow-none">
                      <CardHeader>
                          <CardTitle className="text-2xl">Sifa za Kiufundi</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <ul className="space-y-4 text-base text-foreground">
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
                          </ul>
                      </CardContent>
                    </Card>
                  </DialogContent>
                </Dialog>
            </div>
        </section>

        <section id="mawasiliano" className="min-h-screen flex flex-col items-center justify-center px-8 pt-16 pb-16 bg-secondary/30">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-foreground tracking-tighter">Wasiliana Nasi</h2>
            <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Una maswali? Tuko hapa kukusaidia. Wasiliana nasi kupitia njia yoyote hapa chini.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <div className="order-2 md:order-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer bg-accent/10 backdrop-blur-sm p-8 border-accent/30 shadow-2xl transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105 hover:z-20">
                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input placeholder="Jina lako" className="pl-10 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input type="email" placeholder="Barua pepe yako" className="pl-10 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <Textarea placeholder="Ujumbe wako..." rows={5} className="pointer-events-none" />
                        </div>
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground pointer-events-none">Tuma Ujumbe</Button>
                      </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw] bg-card/80 backdrop-blur-lg">
                  <DialogTitle className="sr-only">Contact Form</DialogTitle>
                  <DialogDescription className="sr-only">Fill out this form to send us a message.</DialogDescription>
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-2xl">Tuandikie Ujumbe</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>
                </DialogContent>
              </Dialog>
            </div>
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

    

    





