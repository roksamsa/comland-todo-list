import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoConfirmationDialogComponent } from './todo-confirmation-dialog.component';

describe('TodoConfirmationDialogComponent', () => {
  let component: TodoConfirmationDialogComponent;
  let fixture: ComponentFixture<TodoConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
