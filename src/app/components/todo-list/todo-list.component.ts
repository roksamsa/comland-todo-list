import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { ToDoItemStatus } from "src/app/enums/todo-item-statuses.enum";
import { ToDoItem } from "src/app/interfaces/todo-item.interface";
import { TodoService } from "src/app/services/todo.service";
import { TodoConfirmationDialogComponent } from "../todo-confirmation-dialog/todo-confirmation-dialog.component";
import { GlobalVariable } from '../../other/globals';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, AfterViewInit {
  public toDoItemStatus = ToDoItemStatus;
  public displayedColumns: string[] = ['position', 'title', 'description', 'status', 'actions'];
  public toDoListData: ToDoItem[] = [];
  public dataSource: any;
  public searchWord = "";

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _todoService: TodoService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatTable) toDoListTable: MatTable<ToDoItem> = {} as MatTable<ToDoItem>;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.toDoListData = this._todoService.getAllToDosFromStorage();

    this._todoService.toDoListData$.subscribe({
      next: (toDoListData: ToDoItem[]) => {
        this.toDoListData = toDoListData;
        this.dataSource = new MatTableDataSource(this.toDoListData);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error: ', err)
      },
    });

    this._todoService.searchFilter$.subscribe({
      next: (searchWord: string) => {
        this.searchWord = searchWord.toLocaleLowerCase();
        this.dataSource = new MatTableDataSource(this.toDoListData.filter(toDoItem =>
          toDoItem.title.toLocaleLowerCase().includes(this.searchWord) ||
          toDoItem.description.toLocaleLowerCase().includes(this.searchWord) ||
          toDoItem.status.toLocaleLowerCase().includes(this.searchWord)
        ));
      },
      error: (err) => {
        console.error('Error: ', err)
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  removeToDo(toDoItemIndex: number, title: string, id: string) {
    const dialogRef = this._dialog.open(TodoConfirmationDialogComponent, {
      width: GlobalVariable.BASE_DIALOG_WIDTH,
      data: {
        deletedToDoItemIndex: toDoItemIndex,
        title: 'Delete <b>' + title + '</b>',
        subTitle: 'Are you sure that you would like to delete TODO item with id <b>' + id + '</b> and title <b>' + title +'</b>?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this._snackBar.open('TODO item was deleted');
    });
  }

  markToDoAsDone(toDoItemIndex: number) {
    this._todoService.markToDoAsDone(toDoItemIndex);
    this._snackBar.open('TODO item was marked as DONE!');
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
