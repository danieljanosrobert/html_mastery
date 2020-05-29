import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User, AuthenticatableUser } from 'src/app/interfaces/user'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(user: AuthenticatableUser): Observable<User>{
    console.log(JSON.stringify(user))
    return this.http.post<User>(`${environment.apiUrl}/users/login`, user)
  }

  register(user: AuthenticatableUser): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/users/register`, user)
  }

  logout(user: User): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/users/logout`, user)
  }
}
