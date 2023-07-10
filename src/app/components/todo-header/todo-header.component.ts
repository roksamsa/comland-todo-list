import { Component, OnInit } from '@angular/core';
import { TodoService } from "src/app/services/todo.service";
import { TodoConfirmationDialogComponent } from "../todo-confirmation-dialog/todo-confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ToDoItem } from "src/app/interfaces/todo-item.interface";
import { GlobalVariable } from '../../other/globals';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {
  public toDoListData: ToDoItem[] = [];
  public searchInput = '';

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this._todoService.toDoListData$.subscribe({
      next: (toDoListData: ToDoItem[]) => {
        this.toDoListData = toDoListData;
      },
      error: (err: any) => {
        console.error('Error: ' + err)
      },
    });
  }

  public deleteAllToDos() {
    const dialogRef = this._dialog.open(TodoConfirmationDialogComponent, {
      width: GlobalVariable.BASE_DIALOG_WIDTH,
      data: {
        title: 'Delete all',
        subTitle: 'Are you sure that you would like to delete all TODO items?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this._snackBar.open('All TODO items were deleted');
    });
  }

  public searchInputChange(event: any) {
    this.searchInput = event.target.value;
    this._todoService.updateSearchWord(this.searchInput);
  };

  public resetSearchInput() {
    this.searchInput = "";
    this._todoService.updateSearchWord("");
    this._snackBar.open('Search filter was restored!');
  }
}
