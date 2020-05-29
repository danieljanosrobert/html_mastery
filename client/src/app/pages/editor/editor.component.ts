import { Component, OnInit } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'

import { Task } from 'src/app/interfaces/task'
import { StateService } from 'src/app/services/state/state.service'
import { ToastService } from 'src/app/services/toast/toast.service'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  task: Task
  private routerSubscription: any

  editorOptions = {theme: 'vs-dark', language: 'html'}

  result: any

  constructor(
    private stateService: StateService,
    private router: Router,
    private toastService: ToastService,
    public sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.initTaskOrLeavePage()
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url !== '/task') {
        this.stateService.clearTask()
      }
    })
  }

  ngOnDestory(): void {
    this.routerSubscription.unsubscribe()
  }

  private initTaskOrLeavePage(): void {
    this.stateService.getTask()
      .subscribe(task => {
        if (!task) {
          this.toastService.show('El lett navigálva az oldalról. A feladat nem folytatható.', {classname: 'bg-danger'})
          this.router.navigate(['/dashboard'])
          return
        }
        this.task = task
      })
  }
}
