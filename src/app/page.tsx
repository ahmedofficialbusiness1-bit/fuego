"use client";

import Image from 'next/image';
import Link from 'next/link';

import { FuegoLogo } from '@/components/fuego-logo';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full bg-background font-body text-foreground flex flex-col">
        <header className="w-full px-4 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <FuegoLogo className="h-10 w-auto" />
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="#" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>
            <Button variant="outline" className="md:hidden">Menu</Button>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight font-headline">
                UHODARI WA KUPIKIA
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground/90">
                FUMUA LADHA ZOTE KWA SEKUNDE
              </h2>
              <p className="max-w-lg text-muted-foreground mx-auto md:mx-0">
                Mfinyaniko wa Umeme wa Kisasa wa Fuego SmartCook hufanya upishi kuwa rahisi na wa haraka. Gundua ulimwengu wa ladha mpya kwa kugusa kitufe tu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">SOMA MAELEZO</Button>
                <Button size="lg" variant="outline">NUNUA SASA</Button>
              </div>
            </div>
            
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <Image
                src="/1000786745.png"
                alt="Fuego SmartCook"
                fill
                className="object-contain"
                data-ai-hint="pressure cooker"
              />
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}
