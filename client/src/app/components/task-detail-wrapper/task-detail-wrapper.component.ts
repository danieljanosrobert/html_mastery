import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Task } from 'src/app/interfaces/task'
import { StateService } from 'src/app/services/state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-task-detail-wrapper',
  templateUrl: './task-detail-wrapper.component.html',
  styleUrls: ['./task-detail-wrapper.component.scss']
})
export class TaskDetailWrapperComponent implements OnInit {

  @Input()
  task: Task
  buttonText: string

  constructor(
    public modal: NgbActiveModal,
    private stateService: StateService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.setupButtonText()
  }

  getTimeLimit(): string {
    return this.task.max_duration ? `${this.task.max_duration} perc` : 'nincs'
  }

  startTask(): void {
    this.modal.close('Close click')
    if (this.router.url !== '/task') {
      this.stateService.changeTask(this.task)
      this.router.navigate(['/task'])
    }
  }

  private setupButtonText(): void {
    this.buttonText = this.router.url === '/task' ? 'Feladat folytatása' : 'Feladat indítása'
  }
}
