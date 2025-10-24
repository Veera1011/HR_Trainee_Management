import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

export interface User {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class Authservice {

  baseurl: string = "http://localhost:5000/auth"

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseurl}/register`, user)
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseurl}/login`, user)
  }


  loginWithGoogle() {
    window.location.href = `${this.baseurl}/google`;
  }


  handleOAuthCallback(token: string, email: string, picture: string) {
    localStorage.setItem('isloggedin', JSON.stringify(true));
    localStorage.setItem('currentuser', JSON.stringify(email));
    localStorage.setItem('authToken', token);
    localStorage.setItem('picture', JSON.stringify(picture));
    this.router.navigate(['/trainee']);
  }

  isloggedin() {
    return localStorage.getItem('isloggedin')
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('currentuser') || '');
  }


  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  logout() {
    Swal.fire({
      title: 'Logout',
      text: 'Do You Want to Logout?',
      theme: 'material-ui-light',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('isloggedin');
        localStorage.removeItem('currentuser');
        localStorage.removeItem('authToken');
        localStorage.removeItem('picture')
        this.router.navigate(['/'])
        Swal.fire({
          title: 'Logged Out',
          text: 'Logged out Successfully',
          theme:'material-ui-light',
          icon: 'success',
          timer: 2000
        })
      }

    })

  }
}
