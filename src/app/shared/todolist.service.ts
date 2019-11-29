import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Todolist } from './todolist.model';
import { StatusModel } from './status.model';
import { TimeModel } from './time.model';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  
  constructor(private http: HttpClient) { }

  newTask: Todolist = {
    taskName: '',
    taskNote: '',
    priority: 'Not Important',
    completionTime: '',
    timeType: '',
    status: 'Not Activated'
  }

  status: StatusModel = {
    taskStatus: ''
  }

  // Todo List -->
  addTask(id: any, newTask: Todolist) {
    return this.http.post(environment.url + 'post-todoList/' + id, newTask)
  }

  getSelectedTask(id: any) {
    return this.http.get(environment.url + 'selectedTask/' + id)
  }

  editTask(id: any, value) {
    return this.http.post(environment.url + 'postUpdatedTask/' + id, value)
  }

  deleteTask(id: any) {
    return this.http.post(environment.url + 'deleteTask/' + id, id)
  }

  getAllTodolist(user_id: any) {
    return this.http.get(environment.url + 'getAllTodolist/' + user_id)
  }

  updateStatus(status: StatusModel, id: any) {
    return this.http.post(environment.url + 'updateStatus/' + id, status)
  }

  updateTime(time:TimeModel, id: any) {
    return this.http.post(environment.url + 'updateTime/' + id, time)
  }

  localStorageRemove(){
    localStorage.removeItem('hour')
    localStorage.removeItem('minute')
    localStorage.removeItem('second')
  }
}
