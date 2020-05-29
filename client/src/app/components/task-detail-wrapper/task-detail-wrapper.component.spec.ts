import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailWrapperComponent } from './task-detail-wrapper.component';

describe('TaskDetailWrapperComponent', () => {
  let component: TaskDetailWrapperComponent;
  let fixture: ComponentFixture<TaskDetailWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
