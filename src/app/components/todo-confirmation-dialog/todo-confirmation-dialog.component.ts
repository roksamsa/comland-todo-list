import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: 'app-todo-confirmation-dialog',
  templateUrl: './todo-confirmation-dialog.component.html',
  styleUrls: ['./todo-confirmation-dialog.component.scss']
})
export class TodoConfirmationDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _dialogRef: MatDialogRef<TodoConfirmationDialogComponent>,
    private _todoService: TodoService
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    if (this.dialogData?.deletedToDoItemIndex) {
      this._todoService.deleteToDo(this.dialogData?.deletedToDoItemIndex);
    } else {
      this._todoService.deleteAllToDos();
    }
    this._dialogRef.close();
  }
}
