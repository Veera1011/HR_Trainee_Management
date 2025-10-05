import { Component, DoCheck, signal } from '@angular/core';
import { Authservice } from './auth/authservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements DoCheck {
  protected readonly title = signal('HR_Trainee_Management');

  show:boolean=false;

  constructor(private authservice:Authservice){}

ngDoCheck(): void {

  this.show=Boolean(this.authservice.isloggedin());

    
}

  logoutuser(){
  this.authservice.logout();
}
}
