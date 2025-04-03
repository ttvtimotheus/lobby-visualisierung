import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { ParsedQs } from 'qs';

// Define types for our data
interface Node {
  id: string;
  type: string;
  name: string;
  [key: string]: any; // For additional properties
}

interface Link {
  source: string;
  target: string;
  type: string;
  [key: string]: any; // For additional properties
}

interface NetworkData {
  nodes: Node[];
  links: Link[];
}

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Read sample data
const sampleDataPath = path.join(__dirname, './data/sample-data.json');
const sampleData: NetworkData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));

// Routes
app.get('/api/network', (req: Request, res: Response) => {
  res.json(sampleData);
});

// Filter nodes by type
app.get('/api/nodes/:type', (req: Request<{ type: string }>, res: Response) => {
  const { type } = req.params;
  const filteredNodes = sampleData.nodes.filter(node => node.type === type);
  res.json(filteredNodes);
});

// Get node by id
app.get('/api/node/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const node = sampleData.nodes.find(node => node.id === id);
  
  if (!node) {
    return res.status(404).json({ message: 'Node not found' });
  }
  
  // Get all connections for this node
  const connections = sampleData.links.filter(
    link => link.source === id || link.target === id
  );
  
  res.json({ node, connections });
});

// Search nodes by name or other properties
app.get('/api/search', (req: Request, res: Response) => {
  const { query } = req.query as ParsedQs;
  
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Search query is required' });
  }
  
  const searchTerm = query.toLowerCase();
  
  const results = sampleData.nodes.filter(node => 
    node.name.toLowerCase().includes(searchTerm) || 
    (node.party && node.party.toLowerCase().includes(searchTerm)) ||
    (node.industry && node.industry.toLowerCase().includes(searchTerm))
  );
  
  res.json(results);
});

// Find path between two nodes
app.get('/api/path', (req: Request, res: Response) => {
  const { source, target } = req.query as ParsedQs;
  
  if (!source || !target || typeof source !== 'string' || typeof target !== 'string') {
    return res.status(400).json({ message: 'Source and target IDs are required' });
  }
  
  // Simple BFS algorithm to find path
  const findPath = (start: string, end: string) => {
    const queue: { node: string; path: string[] }[] = [{ node: start, path: [start] }];
    const visited = new Set<string>([start]);
    
    while (queue.length > 0) {
      const { node, path } = queue.shift()!;
      
      // Find all links connected to this node
      const connections = sampleData.links.filter(
        link => link.source === node || link.target === node
      );
      
      for (const connection of connections) {
        const nextNode = connection.source === node ? connection.target : connection.source;
        
        if (nextNode === end) {
          return [...path, nextNode];
        }
        
        if (!visited.has(nextNode)) {
          visited.add(nextNode);
          queue.push({ node: nextNode, path: [...path, nextNode] });
        }
      }
    }
    
    return null; // No path found
  };
  
  const path = findPath(source, target);
  
  if (!path) {
    return res.json({ path: null, message: 'No path found between these nodes' });
  }
  
  // Get the full details of nodes and links in the path
  const pathNodes = path.map(nodeId => 
    sampleData.nodes.find(node => node.id === nodeId)
  );
  
  const pathLinks = [];
  for (let i = 0; i < path.length - 1; i++) {
    const link = sampleData.links.find(
      l => (l.source === path[i] && l.target === path[i+1]) || 
           (l.source === path[i+1] && l.target === path[i])
    );
    if (link) pathLinks.push(link);
  }
  
  res.json({ 
    path,
    pathDetails: {
      nodes: pathNodes,
      links: pathLinks
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
