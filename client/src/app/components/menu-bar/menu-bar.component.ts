import { Component, OnInit, Output } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Task } from 'src/app/interfaces/task'
import { StateService } from 'src/app/services/state/state.service'
import { TaskDetailWrapperComponent } from 'src/app/components/task-detail-wrapper/task-detail-wrapper.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastService } from 'src/app/services/toast/toast.service'
import { EventEmitter } from 'protractor'

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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteChange();
    this.subscribeToStateChange();
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
    this.toastService.show('Sikeres kijelentkezés.', {classname: 'bg-info'})
    this.stateService.logout()
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

}
