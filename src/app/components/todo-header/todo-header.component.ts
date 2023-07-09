import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {
  @ViewChild('nameInput') searchInput!: ElementRef;

  constructor(
    public todoService: TodoService
  ) { }

  ngOnInit(): void {
  }

  public deleteAllToDos() {
    this.todoService.deleteAllToDos();
  }

  public searchInputChange(event: any) {
    this.todoService.updateSearchWord(event.target.value);
  };
}
