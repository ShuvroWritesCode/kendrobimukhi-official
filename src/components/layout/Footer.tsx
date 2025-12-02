import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/official-logo.jpg"
                alt="Kendrobimukhi Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-foreground">Kendrobimukhi - কেন্দ্রবিমুখী</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Driving social change through social research.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated - Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Subscribe to our newsletter.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-background"
              />
              <Button type="submit" size="sm">
                Go
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kendrobimukhi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
