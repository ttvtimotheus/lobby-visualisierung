import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Node, Link } from '@/types';

// Define constants
const CONNECTION_TYPES = {
  employment: 'Beschäftigung',
  former_employment: 'Ehemalige Beschäftigung',
  meeting: 'Treffen',
  membership: 'Mitgliedschaft',
  committee: 'Ausschuss',
  support: 'Unterstützung',
};

const NODE_TYPES = {
  politician: 'Politiker*in',
  company: 'Unternehmen',
  association: 'Verband',
  government: 'Ministerium/Behörde',
  thinktank: 'Think Tank',
  lobbyist: 'Lobbyist*in',
};

export default function NodeDetails({ node, connections = [], onClose }: { node: Node | null; connections?: Link[]; onClose?: () => void }) {
  const [nodeConnections, setNodeConnections] = useState<Link[]>([]);
  
  // Fetch connections if not provided
  useEffect(() => {
    if (node && connections.length === 0) {
      fetch(`http://localhost:5000/api/node/${node.id}`)
        .then(res => res.json())
        .then(data => {
          setNodeConnections(data.connections);
        })
        .catch(err => console.error('Error fetching node connections:', err));
    } else {
      setNodeConnections(connections);
    }
  }, [node, connections]);

  if (!node) return null;

  // Format node type for display
  const getNodeTypeDisplay = (type: string) => {
    return NODE_TYPES[type as keyof typeof NODE_TYPES] || type;
  };

  // Format connection type for display
  const getConnectionTypeDisplay = (type: string) => {
    return CONNECTION_TYPES[type as keyof typeof CONNECTION_TYPES] || type;
  };

  // Get the name of a connected node
  const getConnectedNodeName = (connection: Link, nodeId: string) => {
    const sourceId = typeof connection.source === 'string' ? connection.source : connection.source.id;
    const targetId = typeof connection.target === 'string' ? connection.target : connection.target.id;
    
    if (sourceId === nodeId) {
      return typeof connection.target === 'string' ? connection.target : connection.target.name;
    } else {
      return typeof connection.source === 'string' ? connection.source : connection.source.name;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Schließen</span>
          </Button>
        </div>
        <CardTitle className="text-xl">{node.name}</CardTitle>
        <CardDescription>
          {getNodeTypeDisplay(node.type)}
          {node.party && ` | ${node.party}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Informationen</TabsTrigger>
            <TabsTrigger value="connections">Verbindungen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4 pt-4">
            {/* Display node information based on type */}
            <div className="space-y-2">
              {node.position && (
                <div className="flex justify-between">
                  <span className="font-medium">Position:</span>
                  <span>{node.position}</span>
                </div>
              )}
              
              {node.since && (
                <div className="flex justify-between">
                  <span className="font-medium">Seit:</span>
                  <span>{node.since}</span>
                </div>
              )}
              
              {node.previous_employer && (
                <div className="flex justify-between">
                  <span className="font-medium">Vorheriger Arbeitgeber:</span>
                  <span>{node.previous_employer}</span>
                </div>
              )}
              
              {node.industry && (
                <div className="flex justify-between">
                  <span className="font-medium">Branche:</span>
                  <span>{node.industry}</span>
                </div>
              )}
              
              {node.website && (
                <div className="flex justify-between">
                  <span className="font-medium">Website:</span>
                  <a href={node.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {node.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              
              {node.revenue && (
                <div className="flex justify-between">
                  <span className="font-medium">Umsatz:</span>
                  <span>{node.revenue}</span>
                </div>
              )}
              
              {node.employees && (
                <div className="flex justify-between">
                  <span className="font-medium">Mitarbeiter:</span>
                  <span>{node.employees}</span>
                </div>
              )}
              
              {node.members && (
                <div className="flex justify-between">
                  <span className="font-medium">Mitglieder:</span>
                  <span>{node.members}</span>
                </div>
              )}
              
              {node.minister && (
                <div className="flex justify-between">
                  <span className="font-medium">Minister:</span>
                  <span>{node.minister}</span>
                </div>
              )}
              
              {node.budget && (
                <div className="flex justify-between">
                  <span className="font-medium">Budget:</span>
                  <span>{node.budget}</span>
                </div>
              )}
              
              {node.founded && (
                <div className="flex justify-between">
                  <span className="font-medium">Gegründet:</span>
                  <span>{node.founded}</span>
                </div>
              )}
              
              {node.political_orientation && (
                <div className="flex justify-between">
                  <span className="font-medium">Politische Ausrichtung:</span>
                  <span>{node.political_orientation}</span>
                </div>
              )}
            </div>
            
            {/* Lobby Score */}
            {node.score !== undefined && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Lobby-Score</h3>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${node.score}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0</span>
                  <span>{node.score}/100</span>
                  <span>100</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Der Lobby-Score zeigt, wie stark diese Person/Organisation im Netzwerk vernetzt ist.
                </p>
              </div>
            )}
            
            {/* Source Information */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Quellen</h3>
              <p className="text-xs text-muted-foreground">
                Die Informationen basieren auf öffentlich zugänglichen Daten aus dem Lobbyregister, 
                abgeordnetenwatch.de und anderen offiziellen Quellen.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="connections" className="pt-4">
            {nodeConnections.length > 0 ? (
              <div className="space-y-3">
                {nodeConnections.map((connection, index) => {
                  const connectedNodeName = getConnectedNodeName(connection, node.id);
                  return (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <span className="font-medium">{connectedNodeName}</span>
                        <span className="text-sm text-muted-foreground">
                          {getConnectionTypeDisplay(connection.type)}
                        </span>
                      </div>
                      {connection.description && (
                        <p className="text-sm mt-1">{connection.description}</p>
                      )}
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        {connection.since && <span>Seit: {connection.since}</span>}
                        {connection.until && <span>Bis: {connection.until}</span>}
                        {connection.frequency && <span>Häufigkeit: {connection.frequency}</span>}
                        {connection.amount && <span>Betrag: {connection.amount}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground">Keine Verbindungen gefunden.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
