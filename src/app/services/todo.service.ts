import { BehaviorSubject } from "rxjs";
import { ToDoItem } from "../interfaces/todo-item.intereface";
import { ToDoItemStatus } from "../enums/todo-item-statuses.enum";

export class TodoService {
  private toDoListData: ToDoItem[] = [];

  private isToDoDataUpdatedSubject$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isToDoDataUpdated = this.isToDoDataUpdatedSubject$$.asObservable();

  private searchFilterSubject$$: BehaviorSubject<string> = new BehaviorSubject("");
  public searchFilter = this.searchFilterSubject$$.asObservable();

  constructor() { }

  public getAllToDos(): ToDoItem[] {
    const savedTasks = localStorage.getItem('toDoListData');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  }

  public deleteAllToDos() {
    localStorage.setItem('toDoListData', JSON.stringify([]));
    this.updateToDoData(true);
  }

  public addNewToDoItem(todoItem: ToDoItem) {
    this.toDoListData = this.getAllToDos();
    this.toDoListData.push({
      ...todoItem,
      position: this.toDoListData.length + 1
    });
    localStorage.setItem('toDoListData', JSON.stringify(this.toDoListData));
  }

  public markToDoAsDone(toDoItemIndex: number) {
    this.toDoListData = this.getAllToDos();
    this.toDoListData[toDoItemIndex].status = ToDoItemStatus.Done;
    localStorage.setItem('toDoListData', JSON.stringify(this.toDoListData));
    this.updateToDoData(true);
  }

  public editToDoItem(toDoItemIndex: number, toDoItem: ToDoItem) {
    this.toDoListData = this.getAllToDos();
    this.toDoListData[toDoItemIndex] = toDoItem;
    localStorage.setItem('toDoListData', JSON.stringify(this.toDoListData));
    this.updateToDoData(true);
  }

  public deleteToDo(toDoItemIndex: number) {
    this.toDoListData = this.getAllToDos();

    if (toDoItemIndex > -1) {
      this.toDoListData.splice(toDoItemIndex, 1);
      this.toDoListData.slice(toDoItemIndex).forEach((item, index) => item.position = toDoItemIndex + index + 1);
    }
    localStorage.setItem('toDoListData', JSON.stringify(this.toDoListData));
    this.updateToDoData(true);
  }

  updateToDoData(value: boolean) {
     this.isToDoDataUpdatedSubject$$.next(value);
  }

  updateSearchWord(value: string) {
     this.searchFilterSubject$$.next(value);
  }
}
