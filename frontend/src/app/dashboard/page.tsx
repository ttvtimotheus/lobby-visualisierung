'use client';

import { useState, useEffect } from 'react';
import { NetworkGraph } from '@/components/graph/NetworkGraph';
import NodeDetails from '@/components/graph/NodeDetails';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Node, Link, GraphData } from '@/types';

export default function Dashboard() {
  const [networkData, setNetworkData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Node[]>([]);
  const [pathSource, setPathSource] = useState<string>('');
  const [pathTarget, setPathTarget] = useState<string>('');
  const [pathResults, setPathResults] = useState<string[] | null>(null);
  const [year, setYear] = useState<number>(2023);
  
  // Fetch network data
  useEffect(() => {
    fetch('http://localhost:5000/api/network')
      .then(res => res.json())
      .then(data => {
        setNetworkData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching network data:', err);
        setError('Fehler beim Laden der Netzwerkdaten. Bitte versuchen Sie es später erneut.');
        setLoading(false);
      });
  }, []);

  // Handle node click
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(err => {
        console.error('Error searching:', err);
        setError('Fehler bei der Suche. Bitte versuchen Sie es später erneut.');
      });
  };

  // Handle path finding
  const handleFindPath = () => {
    if (!pathSource.trim() || !pathTarget.trim()) {
      return;
    }
    
    fetch(`http://localhost:5000/api/path?source=${encodeURIComponent(pathSource)}&target=${encodeURIComponent(pathTarget)}`)
      .then(res => res.json())
      .then(data => {
        if (data.path) {
          setPathResults(data.path);
        } else {
          setPathResults([]);
        }
      })
      .catch(err => {
        console.error('Error finding path:', err);
        setError('Fehler beim Finden des Pfades. Bitte versuchen Sie es später erneut.');
      });
  };

  // Filter data by year
  const filterDataByYear = (data: GraphData, selectedYear: number): GraphData => {
    if (!data) return { nodes: [], links: [] };
    
    // Filter links based on the year
    const filteredLinks = data.links.filter(link => {
      const linkYear = parseInt(link.since?.split('-')[0] || '0', 10);
      const endYear = parseInt(link.until?.split('-')[0] || '9999', 10);
      
      return linkYear <= selectedYear && endYear >= selectedYear;
    });
    
    // Get unique node IDs from the filtered links
    const nodeIds = new Set<string>();
    filteredLinks.forEach(link => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      
      nodeIds.add(sourceId);
      nodeIds.add(targetId);
    });
    
    // Filter nodes based on the IDs
    const filteredNodes = data.nodes.filter(node => nodeIds.has(node.id));
    
    return {
      nodes: filteredNodes,
      links: filteredLinks
    };
  };

  // Handle year change
  const handleYearChange = (value: number[]) => {
    setYear(value[0]);
  };

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Search and Filter Card */}
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="filter" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="filter">Filter</TabsTrigger>
                  <TabsTrigger value="search">Suche</TabsTrigger>
                </TabsList>
                
                <TabsContent value="filter" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Knotentypen</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        Politiker
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Unternehmen
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Verbände
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                        Ministerien
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Verbindungstypen</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                        Beschäftigung
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                        Parteispende
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <span className="h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
                        Treffen
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Zeitraum: {year}</h3>
                    <Slider 
                      defaultValue={[2023]} 
                      min={2010} 
                      max={2025} 
                      step={1}
                      onValueChange={handleYearChange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2010</span>
                      <span>2025</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="search" className="pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="search" className="text-sm font-medium">
                        Suche nach Namen, Partei, etc.
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="search"
                          placeholder="Suchen..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button onClick={handleSearch}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    
                    {searchResults.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Ergebnisse</h3>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {searchResults.map((result) => (
                            <Button
                              key={result.id}
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => setSelectedNode(result)}
                            >
                              <span className="truncate">{result.name}</span>
                              <span className="ml-auto text-xs text-muted-foreground">
                                {result.type}
                              </span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Path Analysis Card */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="text-sm font-medium">Lobby-Pfad Analyse</h3>
              <div className="space-y-2">
                <label htmlFor="source" className="text-xs">
                  Startpunkt (ID)
                </label>
                <Input
                  id="source"
                  placeholder="z.B. person_001"
                  value={pathSource}
                  onChange={(e) => setPathSource(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="target" className="text-xs">
                  Zielpunkt (ID)
                </label>
                <Input
                  id="target"
                  placeholder="z.B. org_001"
                  value={pathTarget}
                  onChange={(e) => setPathTarget(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleFindPath}>
                Pfad finden
              </Button>
              
              {pathResults && (
                <div className="space-y-2">
                  <h4 className="text-xs font-medium">Gefundener Pfad:</h4>
                  {pathResults.length > 0 ? (
                    <div className="text-xs bg-secondary/50 p-2 rounded">
                      {pathResults.join(' → ')}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Kein Pfad zwischen diesen Knoten gefunden.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Node Details */}
          {selectedNode && (
            <NodeDetails
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </aside>

        {/* Main Network Graph */}
        <div className="relative h-[calc(100vh-8rem)] border rounded-lg bg-card/50">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Erneut versuchen
                </Button>
              </div>
            </div>
          ) : (
            <NetworkGraph
              data={networkData ? filterDataByYear(networkData, year) : undefined}
              highlightedPath={pathResults || undefined}
              onNodeClick={handleNodeClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
