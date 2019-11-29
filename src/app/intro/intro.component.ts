import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { style } from '@angular/animations';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class IntroComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openSignUpDialog(): void {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(SignupComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
    dialogRef.afterClosed().subscribe(res => {
      return 1;
    })
  }

  openLoginDialog(): void {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(LoginComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
    dialogRef.afterClosed().subscribe(res => {
      return 1;
    })
  }
}
