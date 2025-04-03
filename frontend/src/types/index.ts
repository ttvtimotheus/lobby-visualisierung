// Define node and link types for the network graph
export interface Node {
  id: string;
  type: string;
  name: string;
  party?: string;
  position?: string;
  industry?: string;
  score?: number;
  image?: string;
  since?: string;
  until?: string;
  website?: string;
  minister?: string;
  budget?: string;
  revenue?: string;
  employees?: string;
  members?: string;
  founded?: string;
  political_orientation?: string;
  previous_employer?: string;
  [key: string]: any;
}

export interface Link {
  source: string | Node;
  target: string | Node;
  type: string;
  description?: string;
  since?: string;
  until?: string;
  frequency?: string;
  amount?: string;
  year?: string;
  [key: string]: any;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
