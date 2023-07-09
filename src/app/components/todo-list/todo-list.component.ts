import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { ToDoItemStatus } from "src/app/enums/todo-item-statuses.enum";
import { ToDoItem } from "src/app/interfaces/todo-item.intereface";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, AfterViewInit {
  tasks: string[] = [];
  newTaskTitle = "";
  public newToDoItem = {} as ToDoItem;
  public toDoItemStatus = ToDoItemStatus;

  displayedColumns: string[] = ['position', 'title', 'description', 'status', 'actions'];
  toDoListData: ToDoItem[] = [];
  dataSource: any;
  searchWord = "";

  constructor(
    public todoService: TodoService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatTable) toDoListTable: MatTable<ToDoItem> = {} as MatTable<ToDoItem>;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.toDoListData = this.todoService.getAllToDos();
    this.todoService.isToDoDataUpdated.subscribe({
      next: (isDialogVisible: boolean) => {
        this.toDoListData = this.todoService.getAllToDos();
        this.dataSource = new MatTableDataSource(this.toDoListData);
      },
      error: (err) => {
        console.error('Error: ' + err)
      },
    });
    this.todoService.searchFilter.subscribe({
      next: (searchWord: string) => {
        this.searchWord = searchWord.toLocaleLowerCase();
        this.dataSource = new MatTableDataSource(this.toDoListData.filter(toDoItem =>
          toDoItem.title.toLocaleLowerCase().includes(this.searchWord) ||
          toDoItem.description.toLocaleLowerCase().includes(this.searchWord) ||
          toDoItem.status.toLocaleLowerCase().includes(this.searchWord)
        ));
      },
      error: (err) => {
        console.error('Error: ' + err)
      },
    });
    this.dataSource = new MatTableDataSource(this.toDoListData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  removeToDo(toDoItemIndex: number) {
    this.todoService.deleteToDo(toDoItemIndex);
  }

  markToDoAsDone(toDoItemIndex: number) {
    this.todoService.markToDoAsDone(toDoItemIndex);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
