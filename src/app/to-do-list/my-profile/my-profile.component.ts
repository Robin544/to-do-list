import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class MyProfileComponent implements OnInit {
  
  resultData: any = [];
  showPassword
  durationInSeconds: number = 3
  user_id: any;
  errorMessage: any

  constructor(private dialog: MatDialog,
    private userService: UserService, 
    private _snackBar: MatSnackBar)
    {
      this.showPassword = false
    }

  ngOnInit() {
    this.userService.getSelectedUser(this.user_id).subscribe((res) => {
      this.resultData = res
      this.resultData.data.password = ''
    })
  }

  // click event function toggle
  show_Password() {
    this.showPassword = !this.showPassword;
  }

  openSnackBar1() {
    this._snackBar.openFromComponent(UpdatedProfileSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  refresh()
  {
    window.location.reload();
  }

  onUpdate(form: NgForm) {
    this.userService.editUser(this.user_id, form.value).subscribe((res) => {
      
      var myres =  res['success']
      console.log(myres)
      if (myres == false){
        this.errorMessage =  res['message']
      }
      else{  
      this.openSnackBar1()
      this.dialog.closeAll();
      this.refresh();
      }
    })
  }

  openDeleteConfirmDialog(): void {
    const dialogRef = this.dialog.open(DeleteProfileConfirmComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
    let instance = dialogRef.componentInstance
    instance.userId = this.user_id
    dialogRef.afterClosed().subscribe(res => {
      return 1;
    })
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}

// Snack Bars --->
@Component({
  selector: 'update-profile-snack-bar',
  templateUrl: 'update-profile-snack-bar.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class UpdatedProfileSnackBarComponent {}

@Component({
  selector: 'delete-profile-snack-bar',
  templateUrl: 'delete-profile-snack-bar.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class DeleteProfileSnackBarComponent {}
// --->

// Confirm Dialog box --->
@Component({
  selector: 'delete-profile-confirm',
  templateUrl: 'delete-profile-confirm.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class DeleteProfileConfirmComponent {

  durationInSeconds: number = 3
  userId: any;
  
  constructor(private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private userService: UserService, 
    private router: Router,
    private dialogRef:MatDialogRef<DeleteProfileConfirmComponent>) { }

  onDelete() {
    this.userService.deleteUser(this.userId).subscribe(res => {
      this.openSnackBar2()
      localStorage.removeItem('userToken')
      this.dialog.closeAll()
      this.router.navigateByUrl('/')
    })
  }

  openSnackBar2() {
    this._snackBar.openFromComponent(DeleteProfileSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}