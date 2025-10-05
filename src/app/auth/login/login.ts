import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authservice } from '../authservice';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  loginForm!:FormGroup;
  response:any='';

  constructor(private authservice:Authservice,private fb:FormBuilder,private router:Router){}

ngOnInit(): void {
     this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
})}

login(){

if(this.loginForm.valid){
  const {email,password}=this.loginForm.value;
  this.authservice.loginUser({email,password}).subscribe({
    next:(response)=>{
      let loggedin=true;
      this.response=response;
      localStorage.setItem('currentuser',JSON.stringify(this.response.data.email));
      localStorage.setItem('isloggedin',JSON.stringify(loggedin))
      if(this.response.success){
        this.router.navigate(['/trainee'])
      }
    },
    error:(error)=>{this.response=error}
  })

}
}



}
