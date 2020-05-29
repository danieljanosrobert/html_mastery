import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { UserService } from 'src/app/services/user/user-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output()
  registerClicked = new EventEmitter<void>()

  username:string
  password:string

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login({
      username: this.username,
      password: this.password
    }).subscribe(user => {
      console.log(user)
    })
  }
}
