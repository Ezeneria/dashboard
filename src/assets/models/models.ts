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
export enum eStatusTask {
  progress = 'progress',
  done = 'done',
}
