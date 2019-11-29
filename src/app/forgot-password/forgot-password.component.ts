import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  errorMessage: any

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  onSendEmail(form: NgForm) {
    this.userService.forgotPassword(form.value).subscribe((res) => {
      if (res)
        this.errorMessage = "Already sent you email and password on registration.\nPlease check your email !"
    },
    (err)=>{
      this.errorMessage = "User does not exists!"
    })
  }
}