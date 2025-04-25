export interface Interaction {
  id: string;
  date: string;
  type: string;
  notes: string;
  client?: {
    id: string;
    name: string;
  };
  project?: {
    id: string;
    title: string;
  };
}

export interface Client {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
}

export interface ErrorResponse {
  message: string;
}
