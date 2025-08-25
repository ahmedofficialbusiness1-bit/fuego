
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

  const handleSuggestion = (newSuggestion: SuggestCookingTimesOutput) => {
    setSuggestion(newSuggestion);
  };

  const handleImageChange = (dataUrl: string) => {
    setDishImage(dataUrl);
  };

  const foodItems = [
    { name: 'Ugali', description: 'Unapika vyakula vyote jamii ya ugali.', image: '/ugali.png', hint: 'ugali dish' },
    { name: 'Maharage', description: 'Unapika vyakula vyote jamii ya maharage yakiwemo makande.', image: '/maharage2.png', hint: 'beans dish' },
    { name: 'Wali', description: 'Unapika wali wa aina yoyote.', image: '/wali2.png', hint: 'rice dish' },
    { name: 'Supu', description: 'Unapika supu aina zote.', image: '/supu.png', hint: 'soup bowl' },
    { name: 'Keki', description: 'Unapika keki aina zote.', image: '/keki.png', hint: 'cake slice' },
    { name: 'Nyama', description: 'Unapika nyama na kuku wa aina zote.', image: '/kuku.png', hint: 'chicken dish' },
    { name: 'Ndizi', description: 'Unapika vyakula vyote jamii ya ndizi.', image: '/ndizi.png', hint: 'plantain dish' },
    { name: 'Mchuzi', description: 'Unapika mchuzi wa aina yoyote.', image: '/mchuzi.png', hint: 'maize beans' },
    { name: 'Mboga', description: 'inapika mboga za aina zote.', image: '/mboga.png', hint: 'vegetable dish' },
    { name: 'Maandazi', description: 'ina bake kila kitu.', image: '/maandazi.png', hint: 'maandazi pastry' },
  ];

  return (
    
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
                <Link href="/nunua">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Nunua Sasa <ArrowRight />
                  </Button>
                </Link>
                <Link href="#faida">
                  <Button size="lg" variant="outline">
                    Soma Zaidi <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
            <div
                className="relative md:w-1/2 w-full h-[60vh] md:h-[90vh]"
              >
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

        <section id="faida" className="min-h-screen flex flex-col items-center justify-center px-8 pt-16 pb-16 bg-white text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center w-full max-w-7xl mx-auto h-full gap-12">
            <div 
              className="relative w-full h-[70vh] order-1 md:order-1"
            >
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

            <div className="flex flex-col gap-8 order-2 md:order-2">
              <div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter mb-6 text-center">Faida za Fuego</h2>
                <ScrollArea className="h-[70vh] pr-4">
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
                                <Card className="cursor-pointer bg-card shadow-2xl transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105 hover:z-20 text-black">
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
            </div>
          </div>
          <div className="mt-12 w-full max-w-4xl flex flex-col items-center">
            <h3 className="text-lg font-headline font-bold text-center mb-4">Baadhi ya vyakula unavyoweza kupika</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {foodItems.map((food, index) => (
                <Card key={index} className="flex flex-col items-center text-center gap-2 p-4 bg-card shadow-lg transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105 text-black">
                  <CardHeader className="p-0">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent bg-background z-10 mx-auto">
                          <Image src={food.image} alt={food.name} width={100} height={100} className="object-cover w-full h-full" data-ai-hint={food.hint}/>
                      </div>
                  </CardHeader>
                  <CardContent className="p-0 mt-2">
                      <CardTitle className="font-bold text-sm">{food.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{food.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section id="sifa" className="min-h-screen flex flex-col items-center justify-center px-8 pt-16 pb-16 overflow-hidden">
          <div className="text-center mb-12 w-full max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-foreground tracking-tighter">Sifa za Ziada</h2>
              <p className="max-w-xl text-muted-foreground mx-auto text-sm mt-4">Sifa za kiufundi na ubora wa Fuego smartcooker</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl w-full mx-auto items-center">
              <div className="flex flex-col gap-8 justify-center h-full">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Card className="flex flex-col items-center text-center gap-2 p-4 bg-white text-black shadow-lg transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105">
                          <CardHeader className="p-0">
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent bg-black z-10 mx-auto">
                                  <Image src="/cup.png" alt="Kikombe" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="measuring cup"/>
                              </div>
                          </CardHeader>
                          <CardContent className="p-0 mt-2">
                              <CardTitle className="font-bold text-sm">Kikombe</CardTitle>
                              <CardDescription className="text-xs mt-1">Inakuja na kikombe cha kupimia.</CardDescription>
                          </CardContent>
                      </Card>
                      <Card className="flex flex-col items-center text-center gap-2 p-4 bg-white text-black shadow-lg transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105">
                          <CardHeader className="p-0">
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent bg-black z-10 mx-auto">
                                  <Image src="/spoon.png" alt="Kijiko" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="spoon"/>
                              </div>
                          </CardHeader>
                          <CardContent className="p-0 mt-2">
                              <CardTitle className="font-bold text-sm">Kijiko</CardTitle>
                              <CardDescription className="text-xs mt-1">Inakuja na kijiko.</CardDescription>
                          </CardContent>
                      </Card>
                      <Card className="flex flex-col items-center text-center gap-2 p-4 bg-white text-black shadow-lg transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105">
                           <CardHeader className="p-0">
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent bg-black z-10 mx-auto">
                                  <Image src="/rack.png" alt="Steam Rack" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="steam rack"/>
                              </div>
                          </CardHeader>
                          <CardContent className="p-0 mt-2">
                              <CardTitle className="font-bold text-sm">Steam Rack</CardTitle>
                              <CardDescription className="text-xs mt-1">Inakuja na Steam Rack kwa ajili ya kuoka.</CardDescription>
                          </CardContent>
                      </Card>
                       <Card className="flex flex-col items-center text-center gap-2 p-4 bg-white text-black shadow-lg transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105">
                           <CardHeader className="p-0">
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent bg-black z-10 mx-auto">
                                  <Image src="/wire.png" alt="Waya" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="power cable"/>
                              </div>
                          </CardHeader>
                          <CardContent className="p-0 mt-2">
                              <CardTitle className="font-bold text-sm">Waya Imara</CardTitle>
                              <CardDescription className="text-xs mt-1">1.0M Copper cable, yenye pini tatu.</CardDescription>
                          </CardContent>
                      </Card>
                       <Card className="flex flex-col items-center text-center gap-2 p-4 bg-white text-black shadow-lg transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105">
                           <CardHeader className="p-0">
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent bg-black z-10 mx-auto">
                                  <Image src="/pot2.png" alt="Sufuria Kubwa" width={100} height={100} className="object-contain w-full h-full p-2" data-ai-hint="cooking pot"/>
                              </div>
                          </CardHeader>
                          <CardContent className="p-0 mt-2">
                              <CardTitle className="font-bold text-sm">Sufuria Kubwa</CardTitle>
                              <CardDescription className="text-xs mt-1">Lita 6, non-stick Aluminium.</CardDescription>
                          </CardContent>
                      </Card>
                       <Card className="flex flex-col items-center text-center gap-2 p-4 bg-white text-black shadow-lg transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105">
                           <CardHeader className="p-0">
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent bg-black z-10 mx-auto flex items-center justify-center">
                                <Award className="w-8 h-8 text-white" />
                              </div>
                          </CardHeader>
                          <CardContent className="p-0 mt-2">
                              <CardTitle className="font-bold text-sm">Warranty Mwaka 1</CardTitle>
                              <CardDescription className="text-xs mt-1">Inakuja na warranty wa mwaka mmoja na huduma za services buree</CardDescription>
                          </CardContent>
                      </Card>
                  </div>
              </div>
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
          </div>
          <div className="mt-12 w-full max-w-4xl">
              <Dialog>
                <DialogTrigger asChild>
                    <Card className="cursor-pointer bg-white text-black shadow-2xl transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105 hover:z-20 w-full">
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

        <footer id="mawasiliano" className="min-h-screen flex flex-col items-center justify-center px-8 pt-16 pb-16 bg-[#322d29] text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter">Wasiliana Nasi</h2>
            <p className="max-w-xl text-gray-300 mx-auto text-sm mt-4">Una maswali? Tuko hapa kukusaidia. Wasiliana nasi kupitia njia yoyote hapa chini.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <div className="order-2 md:order-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer bg-accent/10 backdrop-blur-sm p-8 border-accent/30 shadow-2xl transition-all duration-300 transform hover:shadow-accent/50 hover:scale-105 hover:z-20">
                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input placeholder="Jina lako" className="pl-10 pointer-events-none bg-white text-black" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input type="email" placeholder="Barua pepe yako" className="pl-10 pointer-events-none bg-white text-black" />
                        </div>
                        <div className="relative">
                          <Textarea placeholder="Ujumbe wako..." rows={5} className="pointer-events-none bg-white text-black" />
                        </div>
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground pointer-events-none">Tuma Ujumbe</Button>
                      </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw] bg-card/80 backdrop-blur-lg">
                  <DialogTitle>Tuandikie Ujumbe</DialogTitle>
                  <DialogDescription className="sr-only">Fill out this form to send us a message.</DialogDescription>
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-2xl">Tuandikie Ujumbe</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <form className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input placeholder="Jina lako" className="pl-10 bg-white text-black" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input type="email" placeholder="Barua pepe yako" className="pl-10 bg-white text-black" />
                        </div>
                        <div className="relative">
                          <Textarea placeholder="Ujumbe wako..." rows={5} className="bg-white text-black" />
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
                <Phone className="w-6 h-6 text-white" />
                <span className="text-gray-300">+255 712 345 678</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-white" />
                <span className="text-gray-300">msaada@fuego.co.tz</span>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquare className="w-6 h-6 text-white" />
                <span className="text-gray-300">Chat na sisi moja kwa moja</span>
              </div>
              <div className="flex items-center gap-4">
                <LifeBuoy className="w-6 h-6 text-white" />
                <span className="text-gray-300">Tembelea kituo chetu cha usaidizi</span>
              </div>
               <div className="flex items-center gap-4 pt-4">
                  <Link href="https://www.tiktok.com/@fuego_smartcooker?_t=ZM-8zAdCjrRy80&_r=1" target="_blank" rel="noopener noreferrer" aria-label="Fuego SmartCooker on TikTok" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.98-1.59-2.01-2.18-4.71-1.84-7.06.35-2.36 1.72-4.49 3.48-5.97 1.75-1.48 3.8-2.31 5.9-2.28.23.01.47.01.7.02z"/></svg>
                      <span>Tiktok</span>
                  </Link>
                  <Link href="https://www.instagram.com/fuego_smartcooker?utm_source=qr&igsh=dXhheWw3NjFoeHJ6" target="_blank" rel="noopener noreferrer" aria-label="Fuego SmartCooker on Instagram" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>
                      <span>Instagram</span>
                  </Link>
                  <Link href="https://www.facebook.com/profile.php?id=61577259601606" target="_blank" rel="noopener noreferrer" aria-label="Fuego SmartCooker on Facebook" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.52 4.5 10.02 10 10.02 5.5 0 10-4.5 10-10.02C22 6.53 17.5 2.04 12 2.04zM16.5 8.25h-2.25c-.34 0-.62.28-.62.62v1.63h2.87l-.37 2.25h-2.5v6.75h-2.5V12.75H9V10.5h1.75V9.1c0-1.74 1.06-2.69 2.62-2.69h2.13v1.84z"/></svg>
                      <span>Facebook</span>
                  </Link>
              </div>
            </div>
          </div>
           <div className="border-t border-gray-700 mt-12 pt-8 w-full max-w-4xl text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Fuego SmartCooker. All Rights Reserved.</p>
            </div>
        </footer>

         <a
            href="https://wa.me/255658257493"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 p-3 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300"
            aria-label="Chat on WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
        </a>
      </main>
    
  );
}

    


