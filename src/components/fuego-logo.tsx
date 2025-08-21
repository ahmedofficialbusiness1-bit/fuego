import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

export function FuegoLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Flame className="w-8 h-8 text-accent" />
      <span className="text-3xl font-bold tracking-tight text-white font-headline">
        Fuego
      </span>
    </div>
  );
}
