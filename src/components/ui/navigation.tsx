"use client";

import { Button } from "@/components/ui/button";
import { HomeIcon, Lightbulb, UserCheck, PhoneCall } from "lucide-react";

type Face = 'front' | 'right' | 'back' | 'left';

interface NavigationProps {
  activeFace: Face;
  setActiveFace: (face: Face) => void;
}

export function Navigation({ activeFace, setActiveFace }: NavigationProps) {
  const navItems: { face: Face; label: string; icon: React.ElementType }[] = [
    { face: 'front', label: 'Home', icon: HomeIcon },
    { face: 'right', label: 'AI Assistant', icon: Lightbulb },
    { face: 'back', label: 'Features', icon: UserCheck },
    { face: 'left', label: 'Contact', icon: PhoneCall },
  ];

  return (
    <nav className="flex items-center gap-2 p-2 rounded-full bg-background/20 backdrop-blur-sm border border-white/10">
      {navItems.map((item) => (
        <Button
          key={item.face}
          variant={activeFace === item.face ? "default" : "ghost"}
          size="icon"
          onClick={() => setActiveFace(item.face)}
          className={`rounded-full transition-all duration-300 ${activeFace === item.face ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-accent'}`}
          aria-label={item.label}
        >
          <item.icon className="h-5 w-5" />
        </Button>
      ))}
    </nav>
  );
}
