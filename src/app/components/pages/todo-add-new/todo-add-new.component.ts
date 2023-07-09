import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TodoAddEditDialogComponent } from "../../todo-add-edit-dialog/todo-add-edit-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoService } from "src/app/services/todo.service";

@Component({
  template: '',
})
export class TodoAddNewComponent {
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
    private _todoService: TodoService,
  ) {
    this._openAddToDoDialog();
  }

  private _openAddToDoDialog(): void {
    const dialogRef = this._dialog.open(TodoAddEditDialogComponent, {
      width: '500px',
      data: {
        name: '',
        animal: '',
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
