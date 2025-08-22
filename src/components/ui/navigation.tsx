
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Face = 'front' | 'right' | 'back' | 'left';

interface NavigationProps {
  activeFace: Face;
  onNavigate: (face: Face) => void;
}

const navItems: { face: Face; label: string }[] = [
  { face: 'front', label: 'Nyumbani' },
  { face: 'right', label: 'Faida' },
  { face: 'back', label: 'Sifa' },
  { face: 'left', label: 'Mawasiliano' },
];

export function Navigation({ activeFace, onNavigate }: NavigationProps) {
  
  const handleClick = (face: Face) => {
    onNavigate(face);
  };

  return (
    <div className="flex flex-row gap-4">
      {navItems.map((item) => (
        <Button
          key={item.face}
          onClick={() => handleClick(item.face)}
          variant={activeFace === item.face ? "default" : "outline"}
          className={cn(
              "transition-all duration-300",
              activeFace === item.face 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-card/60 backdrop-blur-sm border-border hover:bg-accent/80'
          )}
          aria-label={item.label}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
