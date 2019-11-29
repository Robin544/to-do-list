import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private router: Router) {}
  
  public isAuthenticated(): boolean {
    // Check whether the token is expired and return
    // true or false
    return localStorage.getItem('userToken') != null && !this.isTokenExpired();
  }

  public isTokenExpired(): boolean {
    return false
  }
}
