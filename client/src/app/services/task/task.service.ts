import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { ReviewableTask } from 'src/app/interfaces/task'
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

  reviewTask(data: ReviewableTask): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/task/review`, data)
  }
}
