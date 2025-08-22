"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Info, Phone, Settings } from "lucide-react";

type Face = 'front' | 'right' | 'back' | 'left';

interface NavigationProps {
  activeFace: Face;
  onNavigate: (face: Face) => void;
}

const navItems: { face: Face; icon: React.ElementType; label: string }[] = [
  { face: 'front', icon: Home, label: 'Nyumbani' },
  { face: 'right', icon: Info, label: 'Faida' },
  { face: 'back', icon: Settings, label: 'Sifa' },
  { face: 'left', icon: Phone, label: 'Mawasiliano' },
];

export function Navigation({ activeFace, onNavigate }: NavigationProps) {
  const handleClick = (face: Face) => {
    onNavigate(face);
    const element = document.getElementById(face);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-4 z-20">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Button
            key={item.face}
            variant={activeFace === item.face ? "default" : "outline"}
            size="icon"
            onClick={() => handleClick(item.face)}
            className={cn(
                "rounded-full h-12 w-12 transition-all duration-300 group",
                activeFace === item.face ? 'bg-accent text-accent-foreground' : 'bg-card/60 backdrop-blur-sm'
            )}
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5" />
            <span className="absolute right-full mr-4 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
