import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { UserService } from 'src/app/services/user/user-service.service'
import { ToastService } from 'src/app/services/toast/toast.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output()
  registerSucceed = new EventEmitter<void>()

  username: string
  password: string
  confirm_password: string

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    
  }

  register(): void {
    this.userService.register({
      username: this.username,
      password: this.password,
      confirm_password: this.confirm_password
    }).subscribe(() => {
      this.toastService.show('Sikeres regisztráció. A folytatáshoz jelentkezzen be!', {classname: 'bg-info'})
      this.registerSucceed.emit()
    })
  }

}
