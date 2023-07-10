import { BehaviorSubject, Subject } from 'rxjs';
import { ToDoItem } from '../interfaces/todo-item.interface';
import { ToDoItemStatus } from '../enums/todo-item-statuses.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

export class TodoService {
  private _toDoListData: ToDoItem[] = [];

  private _searchFilterSubject$$: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  public searchFilter$ = this._searchFilterSubject$$.asObservable();

  private _toDoListDataSubject$$: Subject<ToDoItem[]> = new Subject();
  public toDoListData$ = this._toDoListDataSubject$$.asObservable();

  public updateSearchWord(value: string) {
    this._searchFilterSubject$$.next(value);
  }

  public setLocalStorage(toDoListData: ToDoItem[]) {
    this._toDoListData = toDoListData;

    localStorage.setItem('toDoListData', JSON.stringify(this._toDoListData));
    this._toDoListDataSubject$$.next(this._toDoListData);
  }

  public getAllToDosFromStorage(): ToDoItem[] {
    const savedTasks = localStorage.getItem('toDoListData');

    if (savedTasks) {
      this._toDoListData = JSON.parse(savedTasks);
      this.setLocalStorage(this._toDoListData);
      return this._toDoListData;
    }

    return [];
  }

  public deleteAllToDos() {
    localStorage.clear();
    this.setLocalStorage([]);
  }

  public addNewToDoItem(todoItem: ToDoItem) {
    this._toDoListData.push({
      ...todoItem,
      position: this._toDoListData.length + 1,
    });
    this.setLocalStorage(this._toDoListData);
  }

  public markToDoAsDone(toDoItemIndex: number) {
    this._toDoListData[toDoItemIndex].status = ToDoItemStatus.Done;
    this.setLocalStorage(this._toDoListData);
  }

  public editToDoItem(toDoItemIndex: number, toDoItem: ToDoItem) {
    this._toDoListData[toDoItemIndex] = toDoItem;
    this.setLocalStorage(this._toDoListData);
  }

  public deleteToDo(toDoItemIndex: number) {
    if (toDoItemIndex > -1) {
      this._toDoListData.splice(toDoItemIndex, 1);
      this._toDoListData
        .slice(toDoItemIndex)
        .forEach((item, index) => (item.position = toDoItemIndex + index + 1));
    }

    this.setLocalStorage(this._toDoListData);
  }
}
