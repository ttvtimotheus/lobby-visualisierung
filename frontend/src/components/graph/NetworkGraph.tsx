import { useEffect, useRef, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { useTheme } from 'next-themes';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Node, Link, GraphData } from '@/types';

// Define colors for different node types
const NODE_COLORS: Record<string, string> = {
  politician: '#3b82f6', // blue
  company: '#ef4444',    // red
  association: '#10b981', // green
  thinktank: '#8b5cf6',  // purple
  ministry: '#f59e0b',   // amber
  default: '#94a3b8'     // slate
};

// Define colors for different link types
const LINK_COLORS: Record<string, string> = {
  employment: '#3b82f6',     // blue
  donation: '#ef4444',       // red
  membership: '#10b981',     // green
  cooperation: '#8b5cf6',    // purple
  ownership: '#f59e0b',      // amber
  default: '#94a3b8'         // slate
};

interface NetworkGraphProps {
  data?: GraphData;
  highlightedPath?: string[];
  onNodeClick?: (node: Node) => void;
}

export function NetworkGraph({ data, highlightedPath, onNodeClick }: NetworkGraphProps) {
  const { theme } = useTheme();
  const graphRef = useRef<any>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  
  // Fetch data if not provided as props
  useEffect(() => {
    if (data) {
      setGraphData(data);
    } else {
      fetch('http://localhost:5000/api/network')
        .then(res => res.json())
        .then(data => {
          // Convert string references to object references for the force graph
          const nodesById: Record<string, Node> = Object.fromEntries(
            data.nodes.map((node: Node) => [node.id, node])
          );
          
          const links = data.links.map((link: Link) => ({
            ...link,
            source: typeof link.source === 'string' ? nodesById[link.source] || link.source : link.source,
            target: typeof link.target === 'string' ? nodesById[link.target] || link.target : link.target
          }));
          
          setGraphData({ 
            nodes: data.nodes,
            links: links
          });
        })
        .catch(err => console.error('Error fetching network data:', err));
    }
  }, [data]);

  // Get node color based on type
  const getNodeColor = (node: Node) => {
    return NODE_COLORS[node.type] || NODE_COLORS.default;
  };

  // Get link color based on type
  const getLinkColor = (link: Link) => {
    const linkType = typeof link.type === 'string' ? link.type : 'default';
    return LINK_COLORS[linkType] || LINK_COLORS.default;
  };

  // Check if a node is in the highlighted path
  const isNodeHighlighted = (node: Node) => {
    return highlightedPath?.includes(node.id) || false;
  };

  // Check if a link is in the highlighted path
  const isLinkHighlighted = (link: Link) => {
    if (!highlightedPath || highlightedPath.length < 2) return false;
    
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    
    for (let i = 0; i < highlightedPath.length - 1; i++) {
      if (
        (highlightedPath[i] === sourceId && highlightedPath[i + 1] === targetId) ||
        (highlightedPath[i] === targetId && highlightedPath[i + 1] === sourceId)
      ) {
        return true;
      }
    }
    return false;
  };

  // Handle node hover
  const handleNodeHover = (node: Node | null) => {
    setHoveredNode(node);
    
    if (graphRef.current) {
      graphRef.current.centerAt(
        node ? node.x : 0,
        node ? node.y : 0,
        1000
      );
      if (node) {
        graphRef.current.zoom(1.5, 1000);
      }
    }
  };

  if (!graphData) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Lade Netzwerkdaten...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full">
      <TooltipProvider>
        <ForceGraph3D
          ref={graphRef}
          graphData={graphData}
          nodeLabel={(node: Node) => `${node.name} (${node.type})`}
          nodeColor={(node: Node) => isNodeHighlighted(node) ? '#ffffff' : getNodeColor(node)}
          nodeRelSize={6}
          linkWidth={(link: Link) => isLinkHighlighted(link) ? 2 : 1}
          linkColor={(link: Link) => isLinkHighlighted(link) ? '#ffffff' : getLinkColor(link)}
          backgroundColor={theme === 'dark' ? '#09090b' : '#ffffff'}
          onNodeClick={(node: Node) => onNodeClick && onNodeClick(node)}
          onNodeHover={handleNodeHover}
          linkDirectionalParticles={(link: Link) => isLinkHighlighted(link) ? 4 : 0}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={0.01}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          linkCurvature={0.25}
        />
        
        {hoveredNode && (
          <div className="absolute top-4 left-4 bg-card p-3 rounded-md shadow-md border max-w-xs">
            <h3 className="font-medium">{hoveredNode.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{hoveredNode.type}</p>
            {hoveredNode.party && (
              <p className="text-xs mt-1">Partei: {hoveredNode.party}</p>
            )}
            {hoveredNode.industry && (
              <p className="text-xs mt-1">Branche: {hoveredNode.industry}</p>
            )}
          </div>
        )}
      </TooltipProvider>
    </div>
  );
}
