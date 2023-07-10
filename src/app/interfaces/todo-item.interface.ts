import { ToDoItemStatus } from "../enums/todo-item-statuses.enum";

export interface ToDoItem {
  id: string;
  title: string;
  description: string;
  status: ToDoItemStatus;
  position?: number,
}
