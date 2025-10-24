import { Component, DoCheck, signal, ViewEncapsulation } from '@angular/core';
import { Authservice } from './auth/authservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',

})
export class App implements DoCheck {
  protected readonly title = signal('HR_Trainee_Management');

  show:boolean=false;
  pic:any;
  pict:any=false;
 

  constructor(private authservice:Authservice){}

ngDoCheck(): void {

  this.show=Boolean(this.authservice.isloggedin());
  this.pic= JSON.parse(localStorage.getItem('picture') || 'null');
  this.pict=true
  console.log(this.pic);
  


  

    
}



  logoutuser(){
  this.authservice.logout();
}
}
