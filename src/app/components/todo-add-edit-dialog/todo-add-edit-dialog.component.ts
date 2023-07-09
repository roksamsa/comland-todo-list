import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToDoItemStatus } from 'src/app/enums/todo-item-statuses.enum';
import { ToDoItem } from 'src/app/interfaces/todo-item.intereface';
import { TodoService } from "src/app/services/todo.service";
import { v4 as uuidv4 } from 'uuid';

interface ToDoDropdownStatus {
  value: string;
  viewValue: ToDoItemStatus;
}

@Component({
  selector: 'app-todo-add-edit-dialog',
  templateUrl: './todo-add-edit-dialog.component.html',
  styleUrls: ['./todo-add-edit-dialog.component.scss'],
})
export class TodoAddEditDialogComponent implements OnInit {
  public toDoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  public selectedToDoStatus = ToDoItemStatus.ToDo;
  newToDoItem = {} as ToDoItem;
  displayedColumns: string[] = ['position', 'title', 'description', 'status'];
  toDoListData: ToDoItem[] = [];
  toDoStatuses: ToDoDropdownStatus[] = [
    {
      value: ToDoItemStatus.ToDo,
      viewValue: ToDoItemStatus.ToDo,
    },
    {
      value: ToDoItemStatus.InProgress,
      viewValue: ToDoItemStatus.InProgress,
    },
    {
      value: ToDoItemStatus.Done,
      viewValue: ToDoItemStatus.Done,
    },
  ];
  private _selectedToDoItem = {} as ToDoItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<TodoAddEditDialogComponent>,
    public todoService: TodoService,
  ) {}

  ngOnInit(): void {
    if (this.dialogData?.id) {
      this._selectedToDoItem = this.todoService.getAllToDos().find(toDoItem => toDoItem.id === this.dialogData.id) as ToDoItem;

      this.toDoForm.controls['title'].setValue(this._selectedToDoItem?.title as string);
      this.toDoForm.controls['description'].setValue(this._selectedToDoItem?.description as string);
      this.selectedToDoStatus = this._selectedToDoItem?.status as ToDoItemStatus;
    }
  }

  statusSelectionChange(value: ToDoItemStatus) {
    this.selectedToDoStatus = value;
  }

  addNewEditToDoItem() {
    if (this.dialogData?.id) {
      this.newToDoItem = {
        id: uuidv4(),
        title: this.toDoForm.get('title')!.value as string,
        description: this.toDoForm.get('description')!.value as string,
        status: this.selectedToDoStatus,
        position: this._selectedToDoItem.position
      };
      this.todoService.editToDoItem(this.dialogData?.index, this.newToDoItem);
    } else {
      this.newToDoItem = {
        id: uuidv4(),
        title: this.toDoForm.get('title')!.value as string,
        description: this.toDoForm.get('description')!.value as string,
        status: this.selectedToDoStatus,
      };
      this.todoService.addNewToDoItem(this.newToDoItem);
    }

    this.dialogRef.close();
  }
}
