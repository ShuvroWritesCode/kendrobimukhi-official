"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/events", label: "Events" },
  { href: "/missions", label: "Our Mission" },
  { href: "/blogs", label: "Blog" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/official-logo.jpg"
            alt="Kendrobimukhi Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold text-foreground hidden sm:inline">
            Kendrobimukhi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild>
            <Link href="/donate">Donate</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0">
            <div className="flex flex-col h-full">
              {/* Header with logo */}
              <div className="flex items-center gap-3 p-6 border-b">
                <Image
                  src="/official-logo.jpg"
                  alt="Kendrobimukhi Logo"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
                <span className="text-lg font-semibold text-foreground">
                  Kendrobimukhi
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col flex-1 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 text-base font-medium text-foreground/80 transition-colors hover:text-primary hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Donate Button */}
              <div className="p-6 border-t">
                <Button asChild className="w-full">
                  <Link href="/donate" onClick={() => setIsOpen(false)}>
                    Donate
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
