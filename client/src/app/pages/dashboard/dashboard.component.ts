import { Component, OnInit } from '@angular/core'
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TaskDetailWrapperComponent } from 'src/app/components/task-detail-wrapper/task-detail-wrapper.component'
import { Task } from 'src/app/interfaces/task'
import { TaskService } from 'src/app/services/task/task.service'
import { UserService } from 'src/app/services/user/user-service.service'
import { StateService } from 'src/app/services/state/state.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faChevronDown = faChevronDown
  faCheck = faCheck

  tasks: Task[]
  selectedTask: Task
  solvedTasks: string[]

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
    private userService: UserService,
    private stateService: StateService
    ) { }

  ngOnInit(): void {
    this.fetchTasks()
    this.getUsersSolvedTasks()
  }

  showTask(task: Task): void {
    if (task === this.selectedTask) {
      this.selectedTask = null
      return
    }
    this.selectedTask = task
  }

  rotateChevronIfTaskIsSelected(task: Task): number {
    return this.isTaskSelected(task) ? 180 : 0
  }

  isTaskSelected(task: Task): boolean {
    return task === this.selectedTask
  }

  timeLimitToString(duration: number): string {
    return duration ? `${duration} perc` : 'nincs'
  }

  openTaskDetails(task: Task) {
    const modalRef = this.modalService.open(TaskDetailWrapperComponent, { centered: true, scrollable:true })
    modalRef.componentInstance.task = task
  }

  userSolvedIt(title: string): boolean {
    return _.includes(this.solvedTasks, title)
  }

  private fetchTasks(): void {
    this.taskService.getTasks()
      .subscribe((tasks) => {
        this.tasks = tasks
      })
  }

  private getUsersSolvedTasks(): void {
    this.userService.getSolvedTasks(this.stateService.username)
      .subscribe((tasks) => {
        this.solvedTasks = tasks
    })
  }
}
