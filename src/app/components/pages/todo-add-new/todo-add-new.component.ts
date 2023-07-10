import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TodoAddEditDialogComponent } from "../../todo-add-edit-dialog/todo-add-edit-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoService } from "src/app/services/todo.service";
import { GlobalVariable } from '../../../other/globals';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  template: '',
})
export class TodoAddNewComponent {
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _todoService: TodoService,
  ) {
    this._openAddToDoDialog();
  }

  private _openAddToDoDialog(): void {
    const dialogRef = this._dialog.open(TodoAddEditDialogComponent, {
      width: GlobalVariable.BASE_DIALOG_WIDTH
    });

    dialogRef.afterClosed().subscribe((result) => {
      this._router.navigate(['../'], {
        relativeTo: this._route
      });
      this._snackBar.open('New TODO item wes added');
    });
  }
}
