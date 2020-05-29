import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { ToastService } from '../toast/toast.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastService: ToastService
    ) { }

  canActivate(): boolean {
    if (!!localStorage.getItem('username')) {
      return true
    }
    this.toastService.show('Ehhez bejelentkezés szükséges.', {classname: 'bg-danger'})
    this.router.navigate(['/home'])
    return false
  }
}
