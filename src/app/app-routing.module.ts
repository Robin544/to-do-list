import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { SignupComponent } from './intro/signup/signup.component';
import { LoginComponent } from './intro/login/login.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { MyProfileComponent } from './to-do-list/my-profile/my-profile.component';
import { AddTaskComponent } from './to-do-list/add-task/add-task.component';
import { EditTaskComponent } from './to-do-list/edit-task/edit-task.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    children: [
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: 'to-do-list',
    component: ToDoListComponent,
    canActivate: [AuthGuardService],
    pathMatch: 'full',
    children: [
      {
        path: 'to-do-list/my-profile',
        component: MyProfileComponent,
      },
      {
        path: 'to-do-list/add-task',
        component: AddTaskComponent,
      },
      {
        path: 'to-do-list/edit-task',
        component: EditTaskComponent,
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
