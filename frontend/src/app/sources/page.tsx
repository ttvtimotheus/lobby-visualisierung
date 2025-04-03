import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SourcesPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Datenquellen</h1>
          <p className="text-muted-foreground">
            Informationen zu den verwendeten Datenquellen und Methodik
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Unsere Datenquellen</CardTitle>
            <CardDescription>Woher stammen die Informationen in der Lobby-Netzwerkkarte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Für die Lobby-Netzwerkkarte nutzen wir ausschließlich öffentlich zugängliche Daten.
              Unser Ziel ist es, eine möglichst umfassende und akkurate Darstellung der Verbindungen
              zwischen Politik, Wirtschaft und Interessenverbänden zu bieten.
            </p>
            <p>
              Aktuell verwenden wir für Demonstrationszwecke Beispieldaten. In zukünftigen Versionen
              werden echte Daten aus den unten genannten Quellen integriert.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Lobbyregister des Bundestags</CardTitle>
              <CardDescription>Offizielle Registrierung von Lobbyist*innen</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Das Lobbyregister des Deutschen Bundestags ist seit Januar 2022 verpflichtend und
                enthält Informationen zu Interessenvertreter*innen, die Kontakt zu Bundestag oder
                Bundesregierung aufnehmen.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Namen und Kontaktdaten der Lobbyist*innen</li>
                <li>Tätigkeitsbereiche und Interessengebiete</li>
                <li>Finanzielle Aufwendungen für Lobbytätigkeiten</li>
                <li>Anzahl der beschäftigten Interessenvertreter*innen</li>
              </ul>
              <div className="mt-4">
                <a 
                  href="https://www.lobbyregister.bundestag.de/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Zum Lobbyregister →
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abgeordnetenwatch.de</CardTitle>
              <CardDescription>Transparenzplattform für parlamentarische Arbeit</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Abgeordnetenwatch.de dokumentiert das Abstimmungsverhalten und die Nebentätigkeiten
                von Abgeordneten und ermöglicht Bürger*innen, direkte Fragen an Politiker*innen zu stellen.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Profile aller Bundestagsabgeordneten</li>
                <li>Dokumentation von Nebentätigkeiten und Einkünften</li>
                <li>Abstimmungsverhalten bei namentlichen Abstimmungen</li>
                <li>Öffentliche Fragen und Antworten</li>
              </ul>
              <div className="mt-4">
                <a 
                  href="https://www.abgeordnetenwatch.de/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Zu Abgeordnetenwatch →
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transparenzregister der EU</CardTitle>
              <CardDescription>Informationen zu Lobbyarbeit auf EU-Ebene</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Das Transparenzregister der Europäischen Union enthält Informationen zu
                Organisationen und Einzelpersonen, die Einfluss auf die EU-Politik nehmen.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Daten zu über 12.000 Organisationen</li>
                <li>Angaben zu Lobbying-Budgets</li>
                <li>Informationen zu Mitgliedschaften in Expertengruppen</li>
                <li>Teilnahme an Konsultationen der EU-Kommission</li>
              </ul>
              <div className="mt-4">
                <a 
                  href="https://ec.europa.eu/transparencyregister/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Zum EU-Transparenzregister →
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OpenCorporates</CardTitle>
              <CardDescription>Weltweite Unternehmensdatenbank</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                OpenCorporates ist die größte öffentliche Datenbank für Unternehmensinformationen
                weltweit und bietet Zugang zu Daten über mehr als 200 Millionen Unternehmen.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Unternehmensstrukturen und Eigentumsverhältnisse</li>
                <li>Informationen zu Vorständen und Geschäftsführungen</li>
                <li>Verbindungen zwischen Unternehmen</li>
                <li>Historische Daten zu Unternehmensveränderungen</li>
              </ul>
              <div className="mt-4">
                <a 
                  href="https://opencorporates.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Zu OpenCorporates →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Methodik & Datenverarbeitung</CardTitle>
            <CardDescription>Wie wir die Daten sammeln, verarbeiten und visualisieren</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Die Daten aus den verschiedenen Quellen werden in mehreren Schritten verarbeitet:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Datensammlung:</strong> Automatisierte Sammlung von Daten aus öffentlichen Quellen
                über APIs oder strukturiertes Web-Scraping, wo erlaubt.
              </li>
              <li>
                <strong>Datenbereinigung:</strong> Entfernung von Duplikaten, Korrektur von Fehlern und
                Standardisierung von Formaten.
              </li>
              <li>
                <strong>Datenintegration:</strong> Zusammenführung der Daten aus verschiedenen Quellen
                und Erstellung von Verbindungen zwischen Entitäten.
              </li>
              <li>
                <strong>Netzwerkanalyse:</strong> Berechnung von Metriken wie dem "Lobby-Score", der
                die Vernetzung eines Akteurs im Netzwerk quantifiziert.
              </li>
              <li>
                <strong>Visualisierung:</strong> Aufbereitung der Daten für die interaktive Darstellung
                in der Netzwerkgrafik.
              </li>
            </ol>
            <p className="text-sm text-muted-foreground mt-4">
              Alle Daten werden regelmäßig aktualisiert, um ein möglichst aktuelles Bild zu bieten.
              Bei Fragen zur Methodik oder Hinweisen auf Fehler kontaktieren Sie uns bitte.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-8">
          <Link href="/dashboard">
            <Button size="lg">
              Zum Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
