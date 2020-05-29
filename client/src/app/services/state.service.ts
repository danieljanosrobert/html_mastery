import { Injectable } from '@angular/core'
import { Task } from '../interfaces/task'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private activeTask: Task

  constructor() { }

  changeTask(task: Task): void {
    this.activeTask = task
  }

  clearTask(): void {
    this.activeTask = undefined
  }

  getTask(): Observable<Task> {
    return of(this.activeTask)
  }

}
