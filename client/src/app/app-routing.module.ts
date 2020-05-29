import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomepageComponent } from './pages/homepage/homepage.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { EditorComponent } from './pages/editor/editor.component'


const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task', component: EditorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
