import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  resultData: any
  id: any
  resData: any
  alreadyExistRes: any
  alreadyExistMessage: any;
  showPassword: boolean;
  durationInSeconds: number = 3;

  constructor(public dialog: MatDialog, 
    private userService: UserService, 
    private router: Router,
    private _snackBar: MatSnackBar)
    {
      this.showPassword = false;
    }

  ngOnInit() {
  
  }

  // click event function toggle
  show_Password() {
      this.showPassword = !this.showPassword;
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SignUpSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  openLoginDialog(email, password) {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(LoginComponent, {panelClass: 'myapp-no-padding-dialog'})
    let instance = dialogRef.componentInstance
    instance.email = email
    instance.password = password
    dialogRef.afterClosed().subscribe(res => {
      console.log("The dialog box is closed!!!")
    })
  }

  onSignUp(form: NgForm) {
    this.userService.signUp(form.value).subscribe(res => {
      this.alreadyExistRes = res;
      if(!this.alreadyExistRes.success){
        this.alreadyExistMessage = "User already exists!"
      }
      else{
        const email = form.value.email
        const password = form.value.password
        this.openSnackBar()
        this.openLoginDialog(email, password)
      }
    })
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}

@Component({
  selector: 'signup-snack-bar',
  templateUrl: 'signup-snack-bar.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class SignUpSnackBarComponent {}
