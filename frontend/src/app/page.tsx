import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
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
            <h1 className="text-xl font-bold tracking-tight">Lobby-Netzwerkkarte</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium">
              Startseite
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              Über das Projekt
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Politische Verflechtungen <span className="text-primary">visualisiert</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Eine interaktive Netzwerkvisualisierung, die Verbindungen zwischen Politiker*innen, 
            Unternehmen, Verbänden und staatlichen Stellen transparent macht.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Dashboard öffnen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Mehr erfahren
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Hauptfunktionen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interaktive Netzwerkgrafik</CardTitle>
                <CardDescription>
                  Visualisierung von Verbindungen in einem interaktiven Graphen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Erkunde das Netzwerk durch Zoomen und Verschieben. Verschiedene Akteure werden 
                  farblich unterschiedlich dargestellt: Politiker in Blau, Unternehmen in Rot, 
                  Verbände in Grün und Ministerien in Grau.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Such- und Filterfunktion</CardTitle>
                <CardDescription>
                  Finde relevante Akteure und Verbindungen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Suche nach Namen, Parteizugehörigkeit oder Unternehmen. Filtere nach Knotentypen, 
                  Verbindungsarten oder Zeiträumen, um genau die Informationen zu finden, die dich 
                  interessieren.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Lobby-Pfad Analyse</CardTitle>
                <CardDescription>
                  Entdecke Verbindungswege zwischen Akteuren
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gib zwei Namen ein und die Anwendung zeigt dir den kürzesten Verbindungsweg 
                  zwischen diesen Akteuren im Netzwerk. So werden auch indirekte Beziehungen 
                  sichtbar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary/20">
        <div className="container flex flex-col items-center text-center gap-8">
          <h2 className="text-3xl font-bold">Bereit für mehr Transparenz?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Erkunde die Verflechtungen zwischen Politik und Wirtschaft und trage zu mehr 
            Transparenz im demokratischen Prozess bei.
          </p>
          <Link href="/dashboard">
            <Button size="lg">
              Jetzt Dashboard öffnen
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card/80 mt-auto">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2025 Lobby-Netzwerkkarte. Alle Daten basieren auf öffentlich zugänglichen Quellen.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:underline">
              Über das Projekt
            </Link>
            <Link href="/sources" className="text-sm text-muted-foreground hover:underline">
              Datenquellen
            </Link>
            <Link href="/imprint" className="text-sm text-muted-foreground hover:underline">
              Impressum
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
