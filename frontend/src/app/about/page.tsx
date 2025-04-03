import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Über das Projekt</h1>
          <p className="text-muted-foreground">
            Hintergrund, Ziele und Informationen zur Lobby-Netzwerkkarte
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Unsere Mission</CardTitle>
            <CardDescription>Transparenz im Lobbyismus fördern</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Die Lobby-Netzwerkkarte ist ein unabhängiges Projekt, das sich zum Ziel gesetzt hat, 
              die Verflechtungen zwischen Politik, Wirtschaft und Interessenverbänden transparent 
              darzustellen. Wir glauben, dass eine funktionierende Demokratie von informierten 
              Bürger*innen lebt, die Zugang zu relevanten Informationen haben.
            </p>
            <p>
              Lobbyismus ist ein wichtiger Teil des demokratischen Prozesses, aber er sollte 
              transparent und nachvollziehbar sein. Unsere interaktive Visualisierung soll dazu 
              beitragen, Verbindungen sichtbar zu machen und ein besseres Verständnis für 
              politische Entscheidungsprozesse zu schaffen.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Datenquellen</CardTitle>
            <CardDescription>Woher stammen unsere Informationen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Alle in der Lobby-Netzwerkkarte dargestellten Daten basieren auf öffentlich 
              zugänglichen Quellen. Dazu gehören:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lobbyregister des Deutschen Bundestags</li>
              <li>Abgeordnetenwatch.de</li>
              <li>Transparenzregister der EU</li>
              <li>OpenCorporates</li>
              <li>Offizielle Webseiten von Unternehmen und Organisationen</li>
              <li>Pressemitteilungen und journalistische Recherchen</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Hinweis: Aktuell verwenden wir für Demonstrationszwecke Beispieldaten. In zukünftigen 
              Versionen werden echte Daten aus den genannten Quellen integriert.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologie</CardTitle>
            <CardDescription>Die technische Umsetzung</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Die Lobby-Netzwerkkarte ist eine moderne Webanwendung, die mit folgenden 
              Technologien umgesetzt wurde:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Frontend</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>React mit TypeScript</li>
                  <li>Next.js als Framework</li>
                  <li>TailwindCSS für Styling</li>
                  <li>shadcn/ui für UI-Komponenten</li>
                  <li>D3.js / react-force-graph für Visualisierung</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Backend</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Node.js mit Express</li>
                  <li>TypeScript</li>
                  <li>RESTful API</li>
                  <li>Vorbereitet für PostgreSQL/MongoDB</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Das Projekt ist Open Source und der Code ist auf GitHub verfügbar.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team & Kontakt</CardTitle>
            <CardDescription>Wer wir sind und wie Sie uns erreichen können</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Die Lobby-Netzwerkkarte ist ein unabhängiges Projekt, das von einem Team aus 
              Entwickler*innen, Datenjournalist*innen und Demokratie-Enthusiast*innen 
              umgesetzt wird. Wir sind nicht mit politischen Parteien oder wirtschaftlichen 
              Interessen verbunden.
            </p>
            <p>
              Haben Sie Fragen, Anregungen oder möchten Sie zum Projekt beitragen? 
              Kontaktieren Sie uns gerne:
            </p>
            <div className="bg-secondary/30 p-4 rounded-md">
              <p className="text-sm">
                E-Mail: kontakt@lobby-netzwerkkarte.de<br />
                Twitter: @LobbyNetzwerk<br />
                GitHub: github.com/lobby-netzwerkkarte
              </p>
            </div>
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
