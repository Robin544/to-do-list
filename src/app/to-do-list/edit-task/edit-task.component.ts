import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodolistService } from 'src/app/shared/todolist.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task_id: any;
  selectedTask: any
  selected_task: any = []
  durationInSeconds: number = 3
  completion_Time: any
  time_Type:any
  

  constructor(private dialog: MatDialog,
    private todolistService: TodolistService,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.todolistService.getSelectedTask(this.task_id).subscribe((res) => {
      this.selectedTask = res
      this.selected_task = this.selectedTask.data
      console.log(this.selected_task.hours)
      if(this.selected_task.hours != 0){
        this.time_Type = "hours"
        if( this.selected_task.minutes >= 30){
          this.completion_Time = this.selected_task.hours + 1
        }
        else{
          this.completion_Time = this.selected_task.hours
        }
      }
      else{
        this.time_Type = "minutes"
        this.completion_Time = this.selected_task.minutes
      }
    })
  }
  
  openSnackBar1() {
    this._snackBar.openFromComponent(UpdatedTaskSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  openDeleteConfirmDialog(): void {
    const dialogRef = this.dialog.open(DeleteTaskConfirmComponent, {panelClass: 'myapp-no-padding-dialog', disableClose: true})
    let instance = dialogRef.componentInstance
    instance.taskId = this.task_id
    dialogRef.afterClosed().subscribe(res => {
      return 1;
    })
  }

  onUpdate(form: NgForm) {
    this.todolistService.editTask(this.task_id, form.value).subscribe((res) => {
      this.dialog.closeAll()
      window.location.reload()
      this.openSnackBar1()
    })
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}

@Component({
  selector: 'update-task-snack-bar',
  templateUrl: 'update-task-snack-bar.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class UpdatedTaskSnackBarComponent {}

@Component({
  selector: 'delete-task-snack-bar',
  templateUrl: 'delete-task-snack-bar.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class DeleteTaskSnackBarComponent {}

@Component({
  selector: 'delete-task-confirm',
  templateUrl: 'delete-task-confirm.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class DeleteTaskConfirmComponent {

  durationInSeconds: number = 3
  taskId: any;

  constructor(private dialog: MatDialog,
    private todolistService: TodolistService,
    private _snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<DeleteTaskConfirmComponent>) { }


  deleteTask() {
    this.todolistService.deleteTask(this.taskId).subscribe((res) => {
      this.dialog.closeAll()
      window.location.reload()
      this.openSnackBar2()
    })
  }

  openSnackBar2() {
    this._snackBar.openFromComponent(DeleteTaskSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
