import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraineeService } from '../traineeservice';
import { EmployeeService } from '../employee-service';
import { TrainingService } from '../training-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-trainee',
  standalone: false,
  templateUrl: './edit-trainee.html',
  styleUrl: './edit-trainee.scss'
})
export class EditTrainee implements OnInit {
  traineeForm!: FormGroup;
  traineeId!: string;
  employees: any[] = [];
  trainings: any[] = [];
  filteredTrainings: any[] = [];

  constructor(
    private fb: FormBuilder,
    private traineeService: TraineeService,
    private employeeService: EmployeeService,
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.traineeId = this.route.snapshot.paramMap.get('id')!;
    
    this.traineeForm = this.fb.group({
      employeeId: ['', Validators.required],
      trainingCode: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      status: ['', Validators.required],
      completionPercentage: [0],
      remarks: ['']
    });

    this.loadEmployees();
    this.loadTrainings();
    this.loadTrainee();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
      error: (error) => console.error('Error loading employees:', error)
    });
  }

  loadTrainings() {
    this.trainingService.getAllTrainings().subscribe({
      next: (response) => {
        this.trainings = response.data;
        this.filteredTrainings = response.data;
      },
      error: (error) => console.error('Error loading trainings:', error)
    });
  }

  loadTrainee() {
    this.traineeService.getTraineeById(this.traineeId).subscribe({
      next: (response) => {
        const trainee = response.data;
        
        // Format dates for input fields
        const formattedTrainee = {
          employeeId: trainee.employeeId?.employeeId || trainee.employeeId,
          trainingCode: trainee.trainingCode?.trainingCode || trainee.trainingCode,
          startDate: trainee.startDate ? new Date(trainee.startDate).toISOString().split('T')[0] : '',
          endDate: trainee.endDate ? new Date(trainee.endDate).toISOString().split('T')[0] : '',
          status: trainee.status,
          completionPercentage: trainee.completionPercentage || 0,
          remarks: trainee.remarks || ''
        };

        this.traineeForm.patchValue(formattedTrainee);
      },
      error: (error) => {
        console.error('Error loading trainee:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load trainee data',
          icon: 'error',
          theme: 'material-ui-light'
        });
      }
    });
  }

  onStackChange(event: any) {
    const stack = event.target.value;
    if (stack) {
      this.filteredTrainings = this.trainings.filter(t => t.stack === stack);
    } else {
      this.filteredTrainings = this.trainings;
    }
    this.traineeForm.patchValue({ trainingCode: '' });
  }

  updateTrainee() {
    if (this.traineeForm.invalid) {
      this.traineeForm.markAllAsTouched();
      return;
    }

    const updatedTrainee = {
      ...this.traineeForm.value,
      startDate: new Date(this.traineeForm.value.startDate),
      endDate: this.traineeForm.value.endDate ? new Date(this.traineeForm.value.endDate) : null
    };

    this.traineeService.updateTrainee(this.traineeId, updatedTrainee).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Updated',
          text: "Trainee Updated Successfully",
          theme: 'material-ui-light',
          icon: 'success'
        });
        this.router.navigate(['/traineem/traineelist']);
      },
      error: (error) => {
        console.error('Error updating trainee:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update trainee',
          icon: 'error',
          theme: 'material-ui-light'
        });
      }
    });
  }
}