
"use client";

import { Button } from "@/components/ui/button";

type Face = 'front' | 'right' | 'back' | 'left';

interface NavigationProps {
  activeFace: Face;
  setActiveFace: (face: Face) => void;
}

export function Navigation({ activeFace, setActiveFace }: NavigationProps) {
  const navItems: { face: Face; label: string }[] = [
    { face: 'front', label: 'Home' },
    { face: 'right', label: 'AI Assistant' },
    { face: 'back', label: 'Features' },
    { face: 'left', label: 'Contact' },
  ];

  return (
    <nav className="flex items-center gap-4">
      {navItems.map((item) => (
        <Button
          key={item.face}
          variant={activeFace === item.face ? "link" : "ghost"}
          onClick={() => setActiveFace(item.face)}
          className={`transition-all duration-300 ${activeFace === item.face ? 'text-accent underline' : 'text-foreground'}`}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
