import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { TaskService } from 'src/app/services/task/task.service'
import { ToastService } from 'src/app/services/toast/toast.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-easteregg',
  templateUrl: './easteregg.component.html',
  styleUrls: ['./easteregg.component.scss']
})
export class EastereggComponent implements OnInit {

  editorOptions = { theme: 'vs-dark', language: 'html' }
  title: string = ''
  description: string = ''
  base_source_code: string = '<html>\n\n</html>'
  solution: string = '<html>\n\n</html>'
  duration: number = 0

  showError: boolean
  errorMessage: string

  private taskTitle: string

  constructor(
    public sanitizer: DomSanitizer,
    private taskService: TaskService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.taskTitle = params['title']
  })
  }

  ngOnInit(): void {
    if(this.taskTitle !== undefined) {
      this.fetchTaskToEdit()
    }
  }

  createTask(): void {
    this.taskService.createTask({
      title: this.title,
      description: this.description,
      max_duration: this.duration,
      base_source_code: this.base_source_code,
      solution: this.solution
    }).subscribe(() => {
      this.toastService.show('Feladat sikeresen létrehozva!', { classname: 'bg-success' })
      this.router.navigate(['/dashboard'])
    }, (error) => {
      this.showError = true
      if (error.status === 400) {
        this.errorMessage = 'Cím nélkül nem jöhet létre feladat'
      } else if (error.status === 409) {
        this.errorMessage = 'Ilyen címmel már létezik feladat. válasszon másikat!'
      } else {
        this.errorMessage = 'Valami hiba történt. Próbálkozzon újra később.'
      }
      this.toastService.show('Valami hiba történt.', { classname: 'bg-danger' })
    })
  }

  private fetchTaskToEdit(): void {
    this.taskService.getTask(this.taskTitle)
      .subscribe((task) => {
        if (!task){
          return
        }
        this.title = task.title,
        this.description = task.description,
        this.duration = task.max_duration,
        this.base_source_code = task.base_source_code
        this.solution = task.solution
      })
  }

}
