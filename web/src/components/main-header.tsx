'use client';

import Link from 'next/link';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">DO</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              Demand-OS
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <MainNav />

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
