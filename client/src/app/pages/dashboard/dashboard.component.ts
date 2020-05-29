import { Component, OnInit } from '@angular/core'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TaskDetailWrapperComponent } from 'src/app/components/task-detail-wrapper/task-detail-wrapper.component'
import { Task } from 'src/app/interfaces/task'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faChevronDown = faChevronDown

  tasks = [{
    title: "első feladat",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque libero nisi, nec blandit quam venenatis at. Maecenas eu molestie urna. Quisque eget tempor sem. Fusce feugiat mi sed ante placerat, vitae ultricies arcu sollicitudin. Nunc consectetur et felis eu eleifend. Fusce molestie ligula in malesuada placerat. Sed consequat sed sapien quis vulputate. Curabitur nec nunc diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    max_duration: 0,
    base_source_code: '<html>\n\n</html>'
  },{
    title: "első feladat",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque libero nisi, nec blandit quam venenatis at. Maecenas eu molestie urna. Quisque eget tempor sem. Fusce feugiat mi sed ante placerat, vitae ultricies arcu sollicitudin. Nunc consectetur et felis eu eleifend. Fusce molestie ligula in malesuada placerat. Sed consequat sed sapien quis vulputate. Curabitur nec nunc diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    max_duration: 20,
    base_source_code: '<html>\n\n</html>'
  }]
  selectedTask: Task

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
}
