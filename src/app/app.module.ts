import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, LoginSnackBarComponent } from './intro/login/login.component';
import { SignupComponent, SignUpSnackBarComponent } from './intro/signup/signup.component';
import { IntroComponent } from './intro/intro.component';
import { ToDoListComponent, LogoutSnackBarComponent, LogoutConfirmComponent, ActivateAnotherTaskConfirm } from './to-do-list/to-do-list.component';
import { AddTaskComponent, AddTaskSnackBarComponent } from './to-do-list/add-task/add-task.component';
import { EditTaskComponent, UpdatedTaskSnackBarComponent, DeleteTaskSnackBarComponent, DeleteTaskConfirmComponent } from './to-do-list/edit-task/edit-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserService } from './shared/user.service';
import { MyProfileComponent, UpdatedProfileSnackBarComponent, DeleteProfileSnackBarComponent, DeleteProfileConfirmComponent } from './to-do-list/my-profile/my-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './shared/auth.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { TodolistService } from './shared/todolist.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StatusModel } from './shared/status.model';
import { TimeModel } from './shared/time.model';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


// import { MbscModule } from '@mobiscroll/angular';
// import { CountdownModule } from 'ngx-countdown';

@NgModule({
  entryComponents: [
    SignUpSnackBarComponent, 
    LoginSnackBarComponent, 
    AddTaskSnackBarComponent, 
    UpdatedTaskSnackBarComponent, 
    DeleteTaskSnackBarComponent, 
    UpdatedProfileSnackBarComponent, 
    DeleteProfileSnackBarComponent,
    LogoutSnackBarComponent,
    LogoutConfirmComponent,
    DeleteTaskConfirmComponent,
    DeleteProfileConfirmComponent,
    ActivateAnotherTaskConfirm
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    IntroComponent,
    ToDoListComponent,
    AddTaskComponent,
    EditTaskComponent,
    MyProfileComponent,
    PageNotFoundComponent,
    SignUpSnackBarComponent,
    LoginSnackBarComponent,
    AddTaskSnackBarComponent,
    UpdatedTaskSnackBarComponent,
    DeleteTaskSnackBarComponent,
    UpdatedProfileSnackBarComponent,
    DeleteProfileSnackBarComponent,
    LogoutSnackBarComponent,
    LogoutConfirmComponent,
    DeleteTaskConfirmComponent,
    DeleteProfileConfirmComponent,
    ActivateAnotherTaskConfirm,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    MatTooltipModule, 
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [UserService, AuthService, AuthGuardService, TodolistService, StatusModel, TimeModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
