import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenquellen | Lobby-Netzwerkkarte",
  description: "Informationen zu den verwendeten Datenquellen und Methodik der Lobby-Netzwerkkarte",
};

export default function SourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
            <a href="/" className="text-xl font-bold tracking-tight">Lobby-Netzwerkkarte</a>
          </div>
          <nav className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Startseite
            </a>
            <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </a>
            <a href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              Über das Projekt
            </a>
            <a href="/sources" className="text-sm font-medium">
              Datenquellen
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t py-4 bg-card/80 mt-auto">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Lobby-Netzwerkkarte. Alle Daten basieren auf öffentlich zugänglichen Quellen.
          </p>
          <div className="flex items-center gap-4">
            <a href="/about" className="text-sm text-muted-foreground hover:underline">
              Über das Projekt
            </a>
            <a href="/sources" className="text-sm text-muted-foreground hover:underline">
              Datenquellen
            </a>
            <a href="/imprint" className="text-sm text-muted-foreground hover:underline">
              Impressum
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
