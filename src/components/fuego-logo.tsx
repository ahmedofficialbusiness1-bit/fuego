import { cn } from '@/lib/utils';
import Image from 'next/image';

export function FuegoLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logo.png"
        alt="Fuego Logo"
        width={140}
        height={40}
        className="object-contain"
      />
    </div>
  );
}
