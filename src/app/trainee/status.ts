import { Directive,ElementRef,Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatus]',
  standalone: false
})
export class Status implements OnInit {

  @Input('appStatus')  color:any=''

  constructor(private el:ElementRef) { }

  ngOnInit(): void {
      if(this.color==='pending'){
        this.el.nativeElement.style.color='red';
      }
      if(this.color==='ongoing'){
        this.el.nativeElement.style.color='orange';
      }
      if(this.color==='completed'){
        this.el.nativeElement.style.color='green'
      }
  }

 

}
