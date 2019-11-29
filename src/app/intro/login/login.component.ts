import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from 'src/app/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  resData: any
  id: any
  getSelectedUser: any
  get_selected_user: any = {}
  errorMessage: any
  showPassword: boolean
  durationInSeconds: number = 3;

  constructor(private userService: UserService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar)
    {
      this.showPassword = false;
    }

  ngOnInit() {
    this.get_selected_user[0] = this.email
    this.get_selected_user[1] = this.password
  }

  // click event function toggle
  show_Password() {
    this.showPassword = !this.showPassword;
  }

  openSnackBar() {
    this._snackBar.openFromComponent(LoginSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onLogin(form: NgForm) {
    this.userService.login(form.value).subscribe(res => {
      this.resData = res
      this.id = this.resData.userData._id
      if(res) {
        this.openSnackBar()
        this.userService.setToken(res['token'])
        this.dialog.closeAll();
        this.router.navigate(['/to-do-list'], {
          "queryParams": { id: this.id }
        })
      }
    },
    err => {
      this.errorMessage = err.error.message
      console.log('Error in login: ' + this.errorMessage)
    })
  }

  onLoginFacebook() {
    this.userService.loginFacebook().subscribe((res) => {
      console.log(res);
        alert('Login successfully!')
        this.userService.setToken(res['token'])
        this.router.navigate(['/to-do-list'], {
          "queryParams": { id: this.id }
        })
      },(err)=>{
        console.log('Error in login!')
      }
    )
  }

  onLoginTwitter() {
    this.userService.loginTwitter().subscribe(res => {
      if(res) {
        alert('Login successfully!')
        var userid = res['user_id.id'];
        console.log(userid)
        this.userService.setToken(res['token'])
        this.router.navigate(['/to-do-list'], {
          "queryParams": { id: userid }
        })
      }
    },(err)=>{
      console.log('Error in login!')
    }
  )}

  onLoginGoogle() {
    this.userService.loginGoogle().subscribe((res) => {
      if(res) {
        alert('Login successfully!')
        var userid = res['user_id.id'];
        console.log(userid)
        this.userService.setToken(res['token'])
        this.router.navigate(['/to-do-list'], {
          "queryParams": { id: userid }
        })
      }
    }, (err)=>{
        console.log('Error in login!')
    })
  }
  
  onLoginLinkedin() {
    this.userService.loginLinkedin().subscribe(res => {
      if(res) {
        alert('Login successfully!')
        var userid = res['user_id.id'];
        console.log(userid)
        this.userService.setToken(res['token'])
        this.router.navigate(['/to-do-list'], {
          "queryParams": { id: userid }
        })
      }
    }, (err)=>{
      console.log('Error in login!')
    })
  }

  openForgotPasswordDialog(): void {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
    dialogRef.afterClosed().subscribe(res => {
      return 1;
    })
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}

@Component({
  selector: 'login-snack-bar',
  templateUrl: 'login-snack-bar.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class LoginSnackBarComponent {}