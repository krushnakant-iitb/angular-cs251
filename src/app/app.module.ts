import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {UserService} from './services/user.service';
import { LogoutComponent } from './logout/logout.component';
import { AddCourseComponent } from './add-course/add-course.component'
import { CourseHomeComponent } from './course-home/course-home.component';
import { AboutComponent } from './about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule }from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {AuthenticationService,AuthGuard,AuthInterceptor} from './services/authentication.service';
import { UsersComponent } from './users/users.component';
import { ReadComponent } from './read/read.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AddCourseComponent,
    CourseHomeComponent,
    AboutComponent,
    UsersComponent,
    ReadComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent,canActivate:[AuthGuard]},
      {path: 'about', component: AboutComponent},
      {path: 'addcourse',component: AddCourseComponent,canActivate:[AuthGuard]},
      {path: 'course/list/:id', component: UsersComponent,canActivate:[AuthGuard]},
      {path: 'course/read/:id', component: ReadComponent,canActivate:[AuthGuard]},
      {path: 'course/:name/:id', component: CourseHomeComponent,canActivate:[AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'logout', component: LogoutComponent,},
      {path:'**',component:LoginComponent},
    ]),
    NgbModule,
    MatExpansionModule,
    NoopAnimationsModule,
  ],
  providers: [
    UserService,
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
