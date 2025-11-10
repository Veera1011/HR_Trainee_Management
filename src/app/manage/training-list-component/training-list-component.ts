import { Component, OnInit } from '@angular/core';
import { TrainingService, Training } from '../../trainee/training-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-training-list-component',
  standalone: false,
  templateUrl: './training-list-component.html',
  styleUrl: './training-list-component.scss'
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  showAddForm = false;
  newTraining: Partial<Training> = {
    trainingCode: '',
    trainingName: '',
    stack: undefined,
    duration: undefined,
    description: '',
    isActive: true
  };

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.loadTrainings();
  }

  loadTrainings(): void {
    this.trainingService.getAllTrainings().subscribe({
      next: (response) => {
        this.trainings = response.data;
      },
      error: (error) => console.error('Error loading trainings:', error)
    });
  }

  addTraining(): void {
    if (!this.newTraining.trainingCode || !this.newTraining.trainingName || !this.newTraining.stack) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Training Code, Name, and Stack are required',
        icon: 'error',
        theme: 'material-ui-light'
      });
      return;
    }

    this.trainingService.createTraining(this.newTraining).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Training added successfully',
          icon: 'success',
          theme: 'material-ui-light'
        });
        this.loadTrainings();
        this.showAddForm = false;
        this.newTraining = {
          trainingCode: '',
          trainingName: '',
          stack: undefined,
          duration: undefined,
          description: '',
          isActive: true
        };
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to add training',
          icon: 'error',
          theme: 'material-ui-light'
        });
      }
    });
  }

  deleteTraining(code: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this training?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete',
      theme: 'material-ui-light'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trainingService.deleteTraining(code).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted',
              text: 'Training deleted successfully',
              icon: 'success',
              theme: 'material-ui-light'
            });
            this.loadTrainings();
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete training',
              icon: 'error',
              theme: 'material-ui-light'
            });
          }
        });
      }
    });
  }
}
