import { Task } from './task'

export class Column {
  id: number;
  title: string;
  tasks: Task[];
  is_updating: boolean = false;
}
