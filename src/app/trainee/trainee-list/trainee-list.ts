import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TraineeService } from '../traineeservice';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainee-list',
  standalone: false,
  templateUrl: './trainee-list.html',
  styleUrl: './trainee-list.scss'
})
export class TraineeList implements OnInit, AfterViewInit {
  @ViewChild('searchname') searchInput!: ElementRef;
  @ViewChild('but1') date1!: ElementRef;
  @ViewChild('but2') date2!: ElementRef;
  
  trainees: any[] = [];
  allTrainees: any[] = []; // Store all trainees for filtering
  response: any = '';
  name: string = '';
  sd: Date | null = null;
  ed: Date | null = null;
  sdRequired = false;
  edRequired = false;

  constructor(private traineeservice: TraineeService) {}

  ngOnInit(): void {
    this.loadTrainees();
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
  }

  loadTrainees() {
    this.traineeservice.getTrainees().subscribe({
      next: (data) => {
        this.trainees = data;
        this.allTrainees = data; // Store for filtering
      },
      error: (err) => console.error(err)
    });
  }

  deleteTrainee(traineeId: string) {
    Swal.fire({
      title: "Are You sure?",
      text: 'You cannot undo this action',
      theme: 'material-ui-light',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Delete',
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        this.traineeservice.deleteTrainee(traineeId).subscribe({
          next: (response) => {
            this.response = response;
            Swal.fire({
              title: 'Deleted',
              text: response.message || 'Trainee deleted successfully',
              theme: 'material-ui-light',
              icon: 'success'
            });
            this.loadTrainees();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete trainee',
              theme: 'material-ui-light',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  filter() {
    if (this.name.trim()) {
      this.trainees = this.allTrainees.filter((trainee: any) =>
        trainee.employeeId?.employeeName?.toLowerCase().includes(this.name.toLowerCase())
      );
    } else {
      this.trainees = [...this.allTrainees];
    }
  }

  filterbydate() {
    this.sdRequired = false;
    this.edRequired = false;
    
    if (this.date1) this.date1.nativeElement.style.border = '';
    if (this.date2) this.date2.nativeElement.style.border = '';

    if (!this.sd) {
      this.sdRequired = true;
      if (this.date1) this.date1.nativeElement.style.border = '1px solid red';
      return;
    }
    
    if (!this.ed) {
      this.edRequired = true;
      if (this.date2) this.date2.nativeElement.style.border = '1px solid red';
      return;
    }

    const startDate = new Date(this.sd);
    const endDate = new Date(this.ed);

    this.trainees = this.allTrainees.filter((trainee: any) => {
      const traineeStartDate = new Date(trainee.startDate);
      return traineeStartDate >= startDate && traineeStartDate <= endDate;
    });
  }

  clear() {
    this.sd = null;
    this.ed = null;
    this.name = '';
    
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
      this.searchInput.nativeElement.focus();
    }
    
    if (this.date1) this.date1.nativeElement.style.border = '';
    if (this.date2) this.date2.nativeElement.style.border = '';
    
    this.sdRequired = false;
    this.edRequired = false;
    
    this.trainees = [...this.allTrainees];
  }
}