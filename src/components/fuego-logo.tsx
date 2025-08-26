import { cn } from '@/lib/utils';
import Image from 'next/image';

export function FuegoLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logo.png"
        alt="Fuego Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
