import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface User{
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class Authservice {

   baseurl:string="http://localhost:5000/auth"

  constructor(private http:HttpClient,private router:Router){}

  registerUser(user:User):Observable<User>{
   return this.http.post<User>(`${this.baseurl}/register`,user)
  }

  loginUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.baseurl}/login`,user)
  }
  
  isloggedin(){
    return localStorage.getItem('isloggedin')
  }

  logout(){
    localStorage.removeItem('isloggedin');
    localStorage.removeItem('currentuser');
    this.router.navigate(['/'])

  }
}
