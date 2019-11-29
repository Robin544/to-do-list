import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodolistService } from '../shared/todolist.service';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusModel } from '../shared/status.model';
import { TimeModel } from '../shared/time.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ToDoListComponent implements OnInit {

  id: any
  getSelectedUser: any
  get_selected_user: any
  getAllTodoList: any
  all_todolist: any = [];
  activatedId:Array<String> = [];
  notActivatedId:Array<String> = [];
  pausedId:Array<String> = [];
  endedId:Array<string> = [];

  pageOfItems: Array<any>;
  p:number;
  timer: number;

  completion_time: number
  time_type: any
  hours: number
  secondtimeLeft: number
  minutetimeLeft: number
  hourtimeLeft: number
  intervalSecond
  intervalMinute
  intervalHour

  constructor(public dialog: MatDialog,
    public router: Router, 
    public userService: UserService, 
    public activatedRoute: ActivatedRoute,
    public todolistService: TodolistService,
    public statusModel: StatusModel,
    public timeModel: TimeModel) { }

  ngOnInit() {

    // ------------ Pagination controls --------->
    var test=localStorage.getItem('page');
    if(JSON.parse(localStorage.getItem('page'))) {
      this.p = JSON.parse(localStorage.getItem('page'))
      console.log(this.p);
    }
    else {
      this.p = 1
     localStorage.setItem('page', JSON.stringify(this.p));
    }
    // ---------------->

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id']
    })

    // --------- Check user token ---------->
    if(!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/')
    }
    else{
      this.todolistService.getAllTodolist(this.id).subscribe(result => {
        this.getAllTodoList = result
        this.all_todolist = this.getAllTodoList.data
          
        this.all_todolist.forEach(element => {
          if(element.status == 'Activated'){
            this.activatedId.push(element._id);
            if(localStorage.getItem('hour')== null  && localStorage.getItem('second')== null && localStorage.getItem('minutes')== null){
              this.startTimer(element.hours, element.minutes, element.seconds)
            }
            else{
              this.secondtimeLeft = JSON.parse(localStorage.getItem("second"));
              this.minutetimeLeft = JSON.parse(localStorage.getItem("minute"));
              this.hourtimeLeft = JSON.parse(localStorage.getItem( "hour"));
              this.startTimer(this.hourtimeLeft, this.minutetimeLeft, this.secondtimeLeft)
            }   
          }
          else if(element.status == 'Not Activated'){
            this.notActivatedId.push(element._id); 
          }
          else if(element.status == 'Paused'){
            this.pausedId.push(element._id); 
          }
          else if(element.status == 'Ended'){
            this.endedId.push(element._id);
          }
        });
      })
      this.userService.getSelectedUser(this.id).subscribe(result => {
        this.getSelectedUser = result
        this.get_selected_user = this.getSelectedUser.data 
      },
      err => {
        console.log(err)
      })
    }
    // --------------------------->
  }

// ------------- Timer Controls ---------------->
  startTimer(hours:any, minutes:any, seconds:any)
  {
    this.hourtimeLeft = hours
    this.minutetimeLeft = minutes
    this.secondtimeLeft = seconds

    this.intervalSecond = setInterval(() => {
      if(this.secondtimeLeft > 0) {
        this.secondtimeLeft--;
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      } else if(this.minutetimeLeft > 0) {
        this.secondtimeLeft = 59;
        this.minutetimeLeft--;
        this.intervalMinute;
        this.intervalHour;
        
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      }
      else if (this.hourtimeLeft > 0 && this.minutetimeLeft == 0) {
        this.secondtimeLeft = 59;
        this.minutetimeLeft = 59;
        this.hourtimeLeft--;
        this.intervalMinute;
        this.intervalHour;
        
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      }
      else {
        this.secondtimeLeft = 0;
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      }
    },1000)
    this.intervalMinute = setInterval(() => {
      if(this.minutetimeLeft > 0) {
        this.minutetimeLeft--;
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      }else if(this.minutetimeLeft == 0 && this.hourtimeLeft>0){
        this.hourtimeLeft--; 
        this.minutetimeLeft = 59;        
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      }
      else if(this.hourtimeLeft >0) {
        this.minutetimeLeft = 59;
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      }
    },60000)
    this.intervalHour = setInterval(() => {
      if(this.hourtimeLeft > 0) {
        this.hourtimeLeft--;
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      } else {
        this.hourtimeLeft = 0;
        localStorage.setItem("second", JSON.stringify(this.secondtimeLeft));
        localStorage.setItem("minute", JSON.stringify(this.minutetimeLeft));
        localStorage.setItem("hour", JSON.stringify(this.hourtimeLeft));
      }
    },3600000)
  }
// --------------------------------->

  addTask(): void {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(AddTaskComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
  }

  // -------------- Open edit task dialog box ---------->
  openEditTaskDialog(id: any) {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(EditTaskComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
    let instance = dialogRef.componentInstance
    instance.task_id = id
  }
  // ------------------------------>

  // ---------------- Open my profile dialog box ----------->
  openMyProfileDialog(): void {
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(MyProfileComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
    let instance = dialogRef.componentInstance
    instance.user_id = this.id
  }
  // ------------------------------>

  // --------------- Function to open confirmation dialog box to logout ------->
  openConfirmLogout(): void {
    const dialogRef = this.dialog.open(LogoutConfirmComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
  }
  // ----------------------------------------------------->

  // ------------- Open dialog box for confirmation to activate another task ------->
  openActivateAnotherTaskConfirm(id: any) {
    var dialogRef = this.dialog.open(ActivateAnotherTaskConfirm, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
    let instance = dialogRef.componentInstance
    instance.task_id = id
  }
  // ------------------------------------>
  
  // -------------- function to check whether to activate or resume a task ------->
  taskInfo(id: any, status) {
    if(this.activatedId[0] != null){
      this.openActivateAnotherTaskConfirm(id)
    }
    else if(status == 'Not Activated' || status == 'Paused'){
      this.startTask(id);
      window.location.reload()
    }
  }
  // ------------------------->

  // ------------ Function to activate or resume a task ----->
  startTask(id: any){
    this.statusModel.taskStatus = "Activated"
    this.todolistService.localStorageRemove()
    this.todolistService.updateStatus(this.statusModel, id).subscribe(res=>{
      this.todolistService.localStorageRemove()
      window.location.reload()
    })
  }
  // ------------------------->

  // -------------- Function to pause a task ----------->
  pauseTask(id: any){
    this.statusModel.taskStatus = "Paused"
    this.timeModel.hours = JSON.parse(localStorage.getItem('hour'))
    this.timeModel.minutes = JSON.parse(localStorage.getItem('minute'))
    this.timeModel.seconds = JSON.parse(localStorage.getItem('second'))
    this.todolistService.updateStatus(this.statusModel, id).subscribe(res=>{
      this.todolistService.updateTime(this.timeModel, id).subscribe(res=>{
        this.todolistService.localStorageRemove()
      })
      window.location.reload()
    })
  }
  // ----------------------------->

  // ------------- Function to end a task --------------->
  endTask(id: any){
    this.statusModel.taskStatus = "Ended"
    this.todolistService.updateStatus(this.statusModel, id).subscribe(res=>{
      window.location.reload()
    })
  }
  // ------------------------------->

  // Function to delete a task ------------------->
  deleteTask(id:any){
    this.todolistService.deleteTask(id).subscribe(res=>{
      window.location.reload()
      alert("Task deleted!")
    })
  }
  // ----------------------->
}


// Confirmation Dialog box for logout --------->
@Component({
  selector: 'logout-confirm',
  templateUrl: 'logout-confirm.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class LogoutConfirmComponent {

  durationInSeconds: number = 3
  
  constructor(public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    public userService: UserService, 
    public todolistService: TodolistService,
    public router: Router,
    public dialogRef:MatDialogRef<LogoutConfirmComponent>) { }

    // Function to signout from website ------------->
    onSignOut() {
      localStorage.removeItem('userToken')
      this.todolistService.localStorageRemove()
      localStorage.removeItem('page')
      this.router.navigateByUrl('/')
      this.dialog.closeAll()
      this.openSnackBar2();
    }
    // ----------------------------->

  openSnackBar2() {
    this._snackBar.openFromComponent(LogoutSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
// ------------------------->

// Confirm on activate another task -->
@Component({
  selector: 'activate-another-task-confirm',
  templateUrl: 'activate-another-task-confirm.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class ActivateAnotherTaskConfirm extends ToDoListComponent {

  result:any;
  task_id: any;
  constructor(
    public dialog: MatDialog,
    public router: Router, 
    public userService: UserService, 
    public activatedRoute: ActivatedRoute,
    public todolistService: TodolistService,
    public statusModel: StatusModel,
    public timeModel: TimeModel) { super(
      dialog,
      router, 
      userService, 
      activatedRoute,
      todolistService,
      statusModel,
      timeModel
    ) }

  // -------------- Function to activate a task forcefully after confirmation ---------->
  startNewTask() {
    this.timeModel.hours = JSON.parse(localStorage.getItem('hour'))
    this.timeModel.minutes = JSON.parse(localStorage.getItem('minute'))
    this.timeModel.seconds = JSON.parse(localStorage.getItem('second'))
     

    this.activatedId.forEach(element => {
      this.statusModel.taskStatus = "Paused"
      this.todolistService.localStorageRemove()
      this.todolistService.updateStatus(this.statusModel, element).subscribe(res=>{
        this.todolistService.updateTime(this.timeModel, element).subscribe(res=>{
          this.todolistService.localStorageRemove()
          return 1;
        })
      });
    })
    this.todolistService.localStorageRemove()

    this.statusModel.taskStatus = "Activated"
    this.todolistService.localStorageRemove()
    this.todolistService.updateStatus(this.statusModel, this.task_id).subscribe(res=>{
      this.result = res;
      this.todolistService.localStorageRemove()
      this.dialog.closeAll();
      window.location.reload()
     
    })
  }
  // ------------------------------->

  closeDialog() {
    this.dialog.closeAll();
  }  
}

// Component to use SnackBar --------->
@Component({
  selector: 'logout-snackbar',
  templateUrl: 'logout-snackbar.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class LogoutSnackBarComponent {}
// ----------------->
