import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User, AuthenticatableUser, RegisterableUser, MasteryLevelObject } from 'src/app/interfaces/user'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: AuthenticatableUser): Observable<User> {

    return this.http.post<User>(`${environment.apiUrl}/users/login`, user, httpOptions)
  }

  register(user: RegisterableUser): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/users/register`, user)
  }

  logout(username: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/users/logout`, {username: username})
  }

  getMasteryLevel(username: string): Observable<MasteryLevelObject> {
    return this.http.get<MasteryLevelObject>(`${environment.apiUrl}/users/mastery_level/${username}`)
  }

  getSolvedTasks(username: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/users/solved/${username}`)
  }

}
