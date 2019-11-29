import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodolistService } from 'src/app/shared/todolist.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent implements OnInit {

  id: any
  durationInSeconds: number = 3

  constructor(private dialog: MatDialog,
    private todolistService: TodolistService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id']
    })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(AddTaskSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit(form: NgForm) {
    this.todolistService.addTask(this.id, form.value).subscribe((res) => {
      window.location.reload();
      this.openSnackBar()
      this.dialog.closeAll();
    })
  }

  closeDialog() {
    this.dialog.closeAll()
  }

}

@Component({
  selector: 'add-task-snack-bar',
  templateUrl: 'add-task-snack-bar.html',
  styles: [`
    .snackBar {
      color: white;
    }
  `],
})
export class AddTaskSnackBarComponent {}