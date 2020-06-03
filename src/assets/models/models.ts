export interface User {
  id?: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}
export interface Task {
  id: number;
  status: string;
  priority: string;
  title: string;
  description: string;
}
export interface Tasks {
  items: Task[];
  total: number;
}

export interface Pagination {
  limit: number;
  offset: number;
}
export enum eStatusTask {
  progress = 'progress',
  done = 'done',
}
export enum ePriorityTask {
  mid = 'mid',
  low = 'low',
  high = 'high'
}
