import { Injectable } from '@angular/core'
import { Task } from '../../interfaces/task'
import { Observable, of, Subject, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private activeTask: Task

  masteryLevelValue = new BehaviorSubject(this.masteryLevel)
  usernameValue = new BehaviorSubject(this.username)

  set masteryLevel(value: string) {
    this.masteryLevelValue.next(value)
    localStorage.setItem('mastery_level', value)
  }
 
  get masteryLevel() {
    return localStorage.getItem('mastery_level')
  }
  
  set username(value: string) {
    this.usernameValue.next(value)
    localStorage.setItem('username', value)
  }

  get username() {
    return localStorage.getItem('username')
  }

  constructor() { }

  logout() {
    this.masteryLevelValue.next(undefined)
    this.usernameValue.next(undefined)
    localStorage.clear()
  }

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
