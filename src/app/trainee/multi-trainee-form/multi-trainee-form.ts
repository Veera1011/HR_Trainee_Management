import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TraineeService } from '../traineeservice';
import { EmployeeService, Employee } from '../employee-service';
import { TrainingService, Training } from '../training-service';
import Swal from 'sweetalert2';

interface TraineeRow {
  form: FormGroup;
  selectedStack: string;
  filteredTrainings: Training[];
}

@Component({
  selector: 'app-multi-traineeform',
  standalone: false,
  templateUrl: './multi-trainee-form.html',
  styleUrl: './multi-trainee-form.scss'
})
export class MultiTraineeForm implements OnInit {
  traineeRows: TraineeRow[] = [];
  employees: Employee[] = [];
  allTrainings: Training[] = [];

  constructor(
    private fb: FormBuilder,
    private traineeService: TraineeService,
    private employeeService: EmployeeService,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadTrainings();
    this.addTraineeRow(); // Add initial row
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
      error: (error) => console.error('Error loading employees:', error)
    });
  }

  loadTrainings(): void {
    this.trainingService.getAllTrainings().subscribe({
      next: (response) => {
        this.allTrainings = response.data;
      },
      error: (error) => console.error('Error loading trainings:', error)
    });
  }

  createTraineeForm(): FormGroup {
    return this.fb.group({
      employeeId: ['', Validators.required],
      trainingCode: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      status: ['Pending', Validators.required],
      completionPercentage: [0],
      remarks: ['']
    });
  }

  addTraineeRow(): void {
    this.traineeRows.push({
      form: this.createTraineeForm(),
      selectedStack: '',
      filteredTrainings: []
    });
  }

  removeTraineeRow(index: number): void {
    if (this.traineeRows.length === 1) {
      Swal.fire({
        title: 'Cannot Remove',
        text: 'At least one row is required',
        icon: 'warning',
        theme: 'material-ui-light'
      });
      return;
    }
    this.traineeRows.splice(index, 1);
  }

  onStackChange(index: number, event: any): void {
    const stack = event.target.value;
    this.traineeRows[index].selectedStack = stack;
    
    if (stack) {
      this.traineeRows[index].filteredTrainings = this.allTrainings.filter(
        t => t.stack === stack
      );
    } else {
      this.traineeRows[index].filteredTrainings = [];
    }
    
    // Reset training selection when stack changes
    this.traineeRows[index].form.patchValue({ trainingCode: '' });
  }

  submitAll(): void {
    // Validate all forms
    let hasErrors = false;
    this.traineeRows.forEach(row => {
      if (row.form.invalid) {
        row.form.markAllAsTouched();
        hasErrors = true;
      }
    });

    if (hasErrors) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill all required fields correctly',
        icon: 'error',
        theme: 'material-ui-light'
      });
      return;
    }

    const trainees = this.traineeRows.map(row => {
      const formValue = row.form.value;
      return {
        ...formValue,
        startDate: new Date(formValue.startDate),
        endDate: formValue.endDate ? new Date(formValue.endDate) : null
      };
    });

    Swal.fire({
      title: 'Submit Trainees',
      text: `Do you want to add ${trainees.length} trainee(s)?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: 'Yes, Add',
      theme: 'material-ui-light'
    }).then((result) => {
      if (result.isConfirmed) {
        this.traineeService.createMultipleTrainees(trainees).subscribe({
          next: (response) => {
            const successCount = response.data.success.length;
            const failedCount = response.data.failed.length;

            let message = `Successfully added ${successCount} trainee(s)`;
            if (failedCount > 0) {
              message += `\n${failedCount} failed due to duplicates or errors`;
            }

            Swal.fire({
              title: 'Success',
              text: message,
              icon: successCount > 0 ? 'success' : 'warning',
              theme: 'material-ui-light'
            });

            if (successCount > 0) {
              this.resetAll();
            }

            // Show failed entries if any
            if (failedCount > 0) {
              console.log('Failed entries:', response.data.failed);
            }
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Error adding trainees: ' + error.message,
              icon: 'error',
              theme: 'material-ui-light'
            });
          }
        });
      }
    });
  }

  resetAll(): void {
    this.traineeRows = [];
    this.addTraineeRow();
  }
}