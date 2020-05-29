import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { UserService } from 'src/app/services/user/user-service.service'
import { StateService } from 'src/app/services/state/state.service'
import { ToastService } from 'src/app/services/toast/toast.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output()
  registerClicked = new EventEmitter<void>()

  username: string
  password: string

  showError: boolean
  errorMessage: string

  constructor(
    private userService: UserService,
    private stateService: StateService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login({
      username: this.username,
      password: this.password
    }).subscribe(user => {
      this.toastService.show('Sikeres bejelentkezés.', { classname: 'bg-success' })
      this.stateService.username = user.username
      this.stateService.masteryLevel = `${user.mastery_level}`
    }, (error) => {
      this.showError = true
      if (error.status === 400) {
        this.errorMessage = 'Nem megfelelő felhasználónév, vagy jelszó.'
      } else {
        this.errorMessage = 'Valami hiba történt. Próbálkozzon újra később.'
      }
    })
  }
}
