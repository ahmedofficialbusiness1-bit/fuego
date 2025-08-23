
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: '#nyumbani', label: 'Nyumbani' },
  { href: '#faida', label: 'Faida' },
  { href: '#sifa', label: 'Sifa' },
  { href: '#mawasiliano', label: 'Mawasiliano' },
];

export function Navigation() {
  const [activeLink, setActiveLink] = useState('#nyumbani');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.href.substring(1)));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          setActiveLink(`#${section.id}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-row gap-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} passHref>
          <Button
            variant={activeLink === item.href ? "default" : "outline"}
            className={cn(
                "transition-all duration-300",
                activeLink === item.href 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-card/60 backdrop-blur-sm border-border hover:bg-accent/80'
            )}
            aria-label={item.label}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
