import { Component, OnInit, Output } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Task } from 'src/app/interfaces/task'
import { StateService } from 'src/app/services/state/state.service'
import { TaskDetailWrapperComponent } from 'src/app/components/task-detail-wrapper/task-detail-wrapper.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastService } from 'src/app/services/toast/toast.service'
import { EventEmitter } from 'protractor'
import { UserService } from 'src/app/services/user/user-service.service'
import { TaskService } from 'src/app/services/task/task.service'

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  task: Task
  faQuestionCircle = faQuestionCircle
  activeRouteIsTask: boolean
  mastery_level: string
  username: string

  constructor(
    private router: Router,
    private stateService: StateService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private userService: UserService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteChange()
    this.subscribeToStateChange()
  }

  currentActive(path: string): boolean {
    return this.router.url === path
  }

  fetchTask(): void {
    this.stateService.getTask()
      .subscribe(task => this.task = task)
  }

  openTaskDetails(): void {
    if (this.task) {
      const modalRef = this.modalService.open(TaskDetailWrapperComponent, { centered: true, scrollable: true })
      modalRef.componentInstance.task = this.task
    }
  }

  taskFailed(e: any): void {
    if (e.action === 'done') {
      this.toastService.show('Lejárt az idő. A feladat nem lett teljesítve.', { classname: 'bg-danger' })
      this.modalService.dismissAll()
      this.router.navigate(['/home'])
    }
  }

  logout(): void {
    this.userService.logout(this.username)
      .subscribe(() => {
        this.toastService.show('Sikeres kijelentkezés.', { classname: 'bg-info' })
        this.stateService.logout()
        this.router.navigate(['/home'])
      })
  }

  fireSendTaskRequest(): void {
    const modified_source_code = this.task.base_source_code
    let tempIfFailed = this.task.max_duration
    this.task.max_duration = 300
    this.taskService.reviewTask({
      username: this.username,
      task_title: this.task.title,
      source_code: modified_source_code
    }).subscribe(data => {
      if (data.result === "success") {
        this.toastService.show('Sikerült megoldani a feladatot! Ha ez elsőre történt, akkor mastery_level-je szintet nőtt!', { classname: 'bg-success' })
        this.refreshMasteryLevel()
        this.router.navigate(['/dashboard'])
      } else if (data.result === "fail") {
        this.toastService.show('Nem sikerült megoldani a feladatot. Próbálkozzon tovább!', { classname: 'bg-info' })
        this.task.max_duration = tempIfFailed
      }
    }, (error) => {
      if (error.status === 403) {
        this.toastService.show('A megadott forráskód hibás. Javítsa ki a hibát, majd próbálkozzon újra', { classname: 'bg-danger' })
      } else {
        this.toastService.show('Sajnáljuk, hiba történt ellenőrzés során. Próbálkozzon újra később', { classname: 'bg-danger' })
      }
    })
  }

  private subscribeToRouteChange(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url) {
        this.activeRouteIsTask = event.url === '/task'
        if (this.activeRouteIsTask) {
          this.fetchTask()
        }
      }
    })
  }

  private subscribeToStateChange(): void {
    this.stateService.masteryLevelValue
      .subscribe(mastery_level => this.mastery_level = mastery_level)
    this.stateService.usernameValue
      .subscribe(username => this.username = username)
  }

  private refreshMasteryLevel(): void {
    this.userService.getMasteryLevel(this.username).subscribe((response) => {
      this.stateService.masteryLevel = `${response.mastery_level}`
    })
  }

}
