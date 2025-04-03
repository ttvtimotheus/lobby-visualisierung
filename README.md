# 🔍 Lobby-Netzwerkkarte

[![CI/CD Pipeline](https://github.com/lobby-netzwerkkarte/lobby-visualisierung/actions/workflows/ci.yml/badge.svg)](https://github.com/lobby-netzwerkkarte/lobby-visualisierung/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Eine interaktive Visualisierung politischer Verflechtungen zwischen Politiker*innen, Unternehmen, Verbänden und staatlichen Stellen für mehr Transparenz im Lobbyismus.

![Lobby-Netzwerkkarte Preview](https://via.placeholder.com/1200x630/1e293b/FFFFFF?text=Lobby-Netzwerkkarte)

## 🎯 Über das Projekt

Die Lobby-Netzwerkkarte ist eine Web-Anwendung, die Verbindungen zwischen verschiedenen Akteuren in der Politik und Wirtschaft visualisiert. Das Ziel ist es, Transparenz im Lobbyismus zu schaffen und aufzuzeigen, wer mit wem vernetzt ist.

### Hauptfunktionen

- **Interaktive Netzwerk-Grafik**: Visualisierung von Personen, Firmen und Organisationen als Knoten und deren Verbindungen
- **Farbkodierung**: Verschiedene Akteure werden durch unterschiedliche Farben dargestellt (Politiker: blau, Firmen: rot, Verbände: grün, Ministerien: orange, Think Tanks: lila)
- **Such- und Filterfunktion**: Suche nach Namen, Parteizugehörigkeit, Unternehmen etc.
- **Profilansicht**: Detaillierte Informationen zu Akteuren und deren Verbindungen
- **Zeitleistenfunktion**: Analyse der Netzwerke über verschiedene Zeiträume
- **Lobby-Pfad-Analyse**: Finden von Verbindungswegen zwischen zwei Akteuren

## 🛠️ Technologie-Stack

### Frontend
- **React** mit **TypeScript** - Für eine robuste, typsichere Komponentenarchitektur
- **Next.js** - Framework für serverseitiges Rendering und optimierte Performance
- **TailwindCSS** - Utility-first CSS-Framework für schnelles, konsistentes Styling
- **shadcn/ui** - Hochwertige, zugängliche UI-Komponenten
- **D3.js / react-force-graph** - Für leistungsstarke Netzwerk-Visualisierungen
- **next-themes** - Für Dark/Light Mode Unterstützung

### Backend
- **Node.js** mit **Express** - Für eine schnelle, skalierbare API
- **TypeScript** - Für typsicheren Code und bessere Entwicklererfahrung
- **RESTful API** - Für standardisierte Kommunikation zwischen Frontend und Backend

### Datenbank & Datenverarbeitung
- Aktuell: **Statische JSON-Daten** für Entwicklungs- und Demozwecke
- Vorbereitet für: **PostgreSQL** oder **MongoDB** für Produktivumgebungen
- Geplant: **Datenimport-Tools** für verschiedene öffentliche Quellen

## 🚀 Installation und Start

### Voraussetzungen

- Node.js (v16 oder höher)
- npm (v7 oder höher)

### Installation

1. Repository klonen:
   ```bash
   git clone https://github.com/lobby-netzwerkkarte/lobby-visualisierung.git
   cd lobby-visualisierung
   ```

2. Alle Abhängigkeiten installieren:
   ```bash
   npm run install:all
   ```

3. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

4. Browser öffnen und zu [http://localhost:3000](http://localhost:3000) navigieren

## 📁 Projektstruktur

```
lobby-visualisierung/
├── .github/                # GitHub-Workflows und Konfiguration
├── backend/                # Backend-Server
│   ├── src/
│   │   ├── data/           # Beispieldaten
│   │   ├── routes/         # API-Routen
│   │   ├── types/          # TypeScript-Typdefinitionen
│   │   └── index.ts        # Server-Einstiegspunkt
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Next.js Frontend
│   ├── public/             # Statische Assets
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   ├── components/     # React-Komponenten
│   │   │   ├── graph/      # Netzwerk-Visualisierungskomponenten
│   │   │   ├── layout/     # Layout-Komponenten
│   │   │   └── ui/         # UI-Komponenten (shadcn/ui)
│   │   ├── types/          # TypeScript-Typdefinitionen
│   │   └── styles/         # Globale Styles
│   ├── package.json
│   └── tsconfig.json
├── package.json            # Root-Konfiguration
└── README.md
```

## 🌐 Deployment

Die Anwendung ist für verschiedene Deployment-Optionen vorbereitet:

### Frontend
- **Vercel**: Optimiert für Next.js mit automatischem Deployment
- **Netlify**: Einfache Integration mit GitHub
- **Docker**: Container-basiertes Deployment für eigene Infrastruktur

### Backend
- **Render**: Einfaches Deployment für Node.js-Anwendungen
- **Heroku**: Skalierbare Cloud-Plattform
- **Docker**: Containerisierung für Kubernetes oder andere Container-Orchestrierungssysteme

## 🤝 Mitwirken

Wir freuen uns über Beiträge! Bitte lies unsere [Beitragsrichtlinien](CONTRIBUTING.md) für weitere Informationen.

## 📊 Datenquellen

Die in der Lobby-Netzwerkkarte dargestellten Daten basieren auf öffentlich zugänglichen Quellen:

- Lobbyregister des Deutschen Bundestags
- Abgeordnetenwatch.de
- Transparenzregister der EU
- OpenCorporates
- Offizielle Webseiten von Unternehmen und Organisationen

Aktuell verwenden wir für Demonstrationszwecke Beispieldaten. In zukünftigen Versionen werden echte Daten aus den genannten Quellen integriert.

## 📜 Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.

## 📧 Kontakt

Bei Fragen oder Anregungen kontaktieren Sie uns bitte unter:
- E-Mail: kontakt@lobby-netzwerkkarte.de
- GitHub Issues: [Neues Issue erstellen](https://github.com/lobby-netzwerkkarte/lobby-visualisierung/issues/new)
