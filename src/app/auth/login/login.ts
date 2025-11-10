import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authservice } from '../authservice';
import { Router } from '@angular/router';
import formConfig from './loginform.json';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  formConfig: any;
  response: any = '';

  constructor(
    private fb: FormBuilder,
    private authservice: Authservice,
    private router: Router
  ) { }

  ngOnInit(): void {

    

    this.formConfig = formConfig;

    const formGroup: any = {};
    this.formConfig.controls.forEach((field: any) => {
      const valid = [];

      if (field.validators?.includes('required')) {
        valid.push(Validators.required);
      }
      if (field.validators?.includes('email')) {
        valid.push(Validators.email);
      }

      formGroup[field.formControlName] = ['', valid];
      console.log('before assigniing', formGroup);

    });
      console.log('after assigniing', formGroup);


    this.loginForm = this.fb.group(formGroup);
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm);

      const { email, password } = this.loginForm.value;
      console.log(email, password);

      this.authservice.loginUser({ email, password }).subscribe({
        next: (response) => {
          this.response = response;
          localStorage.setItem('currentuser', JSON.stringify(this.response.data.email));
          localStorage.setItem('isloggedin', JSON.stringify(true));
          localStorage.setItem('authToken',JSON.stringify(this.response.data.token))
          if (this.response.success) {
            this.router.navigate(['/traineem']);
          }
        },
        error: (error) => this.response = error
      });
    }
  }

   loginWithGoogle() {
    this.authservice.loginWithGoogle();
  }
}