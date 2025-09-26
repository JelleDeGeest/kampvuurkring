import React from "react";
import TransitionLink from "../../../components/TransitionLink";
import Mail from 'lucide-react/dist/esm/icons/mail'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-green-50 mt-auto">
      <div className="w-full h-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
      <div className="container px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Contact
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/10 rounded-full">
                  <MapPin size={14} className="text-primary" />
                </div>
                <span>Scouts Sint-Johannes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/10 rounded-full">
                  <Mail size={14} className="text-primary" />
                </div>
                <a href="mailto:groeps@scoutssintjohannes.be" className="hover:text-primary transition-colors">
                  groeps@scoutssintjohannes.be
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Snelle Links
            </h3>
            <div className="space-y-2 text-sm">
              <TransitionLink href="/inschrijven" className="block hover:text-primary transition-colors py-1 hover:pl-2 hover:border-l-2 hover:border-primary/30">
                Inschrijven
              </TransitionLink>
              <TransitionLink href="/leiding" className="block hover:text-primary transition-colors py-1 hover:pl-2 hover:border-l-2 hover:border-primary/30">
                Leiding
              </TransitionLink>
              <TransitionLink href="/fotos" className="block hover:text-primary transition-colors py-1 hover:pl-2 hover:border-l-2 hover:border-primary/30">
                Foto's
              </TransitionLink>
              <TransitionLink href="/verhuur-lokaal" className="block hover:text-primary transition-colors py-1 hover:pl-2 hover:border-l-2 hover:border-primary/30">
                Verhuur Lokaal
              </TransitionLink>
              <TransitionLink href="/contact" className="block hover:text-primary transition-colors py-1 hover:pl-2 hover:border-l-2 hover:border-primary/30">
                Contact
              </TransitionLink>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Over Ons
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Scouts Sint-Johannes is een leuke en actieve scoutsgroep waar kinderen 
              en jongeren kunnen groeien in een warme gemeenschap vol avontuur en vriendschap.
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-primary/80">Kapoenen:</span>{' '}
                <span className="text-muted-foreground">6-8 jaar</span>
              </div>
              <div>
                <span className="font-medium text-primary/80">Wouters:</span>{' '}
                <span className="text-muted-foreground">8-11 jaar</span>
              </div>
              <div>
                <span className="font-medium text-primary/80">Jonggivers:</span>{' '}
                <span className="text-muted-foreground">11-14 jaar</span>
              </div>
              <div>
                <span className="font-medium text-primary/80">Givers:</span>{' '}
                <span className="text-muted-foreground">14-17 jaar</span>
              </div>
              <div>
                <span className="font-medium text-primary/80">Jin:</span>{' '}
                <span className="text-muted-foreground">17-18 jaar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 mt-8 pt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span className="font-semibold text-primary">Scouts Sint-Johannes</span>. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
