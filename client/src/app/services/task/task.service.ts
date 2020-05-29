import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { ReviewableTask, TaskResult, Task, CreatableTask } from 'src/app/interfaces/task'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  reviewTask(data: ReviewableTask): Observable<TaskResult> {
    return this.http.post<TaskResult>(`${environment.apiUrl}/task/review`, data, httpOptions)
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`, httpOptions)
  }

  getTask(param: string): Observable<CreatableTask> {
    return this.http.get<CreatableTask>(`${environment.apiUrl}/task/${param}`, httpOptions)
  }

  createTask(task: CreatableTask): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/task`, task, httpOptions)
  }
}
