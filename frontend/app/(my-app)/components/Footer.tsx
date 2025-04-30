import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background mt-auto">
      <div className="w-full h-2 bg-secondary"></div>
      <div className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Scouts Sint-Johannes. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
} 