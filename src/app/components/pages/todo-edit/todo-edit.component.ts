import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TodoAddEditDialogComponent } from "../../todo-add-edit-dialog/todo-add-edit-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoService } from "src/app/services/todo.service";

@Component({
  template: '',
})
export class TodoEditComponent {
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
    private _todoService: TodoService,
  ) {
    this._openAddToDoDialog(this._route.snapshot.paramMap.get('index')?.toString(), this._route.snapshot.paramMap.get('id')?.toString());
  }

  private _openAddToDoDialog(index?: string, toDoId?: string): void {
    const dialogRef = this._dialog.open(TodoAddEditDialogComponent, {
      width: '500px',
      data: {
        id: toDoId,
        index: index,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this._router.navigate(['../'], {
        relativeTo: this._route
      });
      this._todoService.updateToDoData(true);
    });
  }
}
