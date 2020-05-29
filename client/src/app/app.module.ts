import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MonacoEditorModule } from 'ngx-monaco-editor'
import { CountdownModule } from 'ngx-countdown'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LoginComponent } from './components/login/login.component'
import { EditorComponent } from './pages/editor/editor.component'
import { RegisterComponent } from './components/register/register.component'
import { MenuBarComponent } from './components/menu-bar/menu-bar.component'
import { TaskDetailWrapperComponent } from './components/task-detail-wrapper/task-detail-wrapper.component'
import { HomepageComponent } from './pages/homepage/homepage.component'
import { ToastComponent } from './components/toast/toast.component'
import { HttpRequestInterceptor } from './interceptor/HttpRequestInterceptor'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    EditorComponent,
    RegisterComponent,
    MenuBarComponent,
    TaskDetailWrapperComponent,
    HomepageComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    CountdownModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
