import { Component, OnInit } from '@angular/core';
import { Authservice } from '../authservice';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {

  registerForm!: FormGroup;
  response: any = '';

  constructor(private authservice: Authservice, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator } 
    );
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmpassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authservice.registerUser({ email, password }).subscribe({
        next: (response) => { this.response = response; },
        error: (error) => { this.response = error; }
      });
    }
  }
}