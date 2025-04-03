import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-4 bg-card/80 mt-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2025 Lobby-Netzwerkkarte. Alle Daten basieren auf öffentlich zugänglichen Quellen.
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
  );
}
