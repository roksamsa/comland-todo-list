import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoAddEditDialogComponent } from './components/todo-add-edit-dialog/todo-add-edit-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { TodoDashboardComponent } from './components/pages/todo-dashboard/todo-dashboard.component';
import { TodoAddNewComponent } from './components/pages/todo-add-new/todo-add-new.component';
import { TodoService } from "./services/todo.service";
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoEditComponent } from "./components/pages/todo-edit/todo-edit.component";
import { TodoConfirmationDialogComponent } from './components/todo-confirmation-dialog/todo-confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoAddEditDialogComponent,
    TodoDashboardComponent,
    TodoAddNewComponent,
    TodoEditComponent,
    TodoHeaderComponent,
    TodoConfirmationDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    NgbModule,
    RouterModule.forRoot([
    {
      path: 'dashboard',
      component: TodoDashboardComponent,
      children: [
        {
          path: 'add-new',
          component: TodoAddNewComponent
        },
        {
          path: 'edit/:index/:id',
          component: TodoEditComponent
        }
      ]
    },
    { path: '**', redirectTo: 'dashboard' }
  ])
  ],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
