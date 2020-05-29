import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomepageComponent } from './pages/homepage/homepage.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { EditorComponent } from './pages/editor/editor.component'
import { AuthGuard } from './services/authguard/auth-guard.service'


const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'task', component: EditorComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
