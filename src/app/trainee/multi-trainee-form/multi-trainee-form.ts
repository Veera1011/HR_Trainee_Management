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
    this.addTraineeRow();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response.data;
        console.log('Employees loaded:', this.employees);
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load employees',
          icon: 'error',
          theme: 'material-ui-light'
        });
      }
    });
  }

  loadTrainings(): void {
    this.trainingService.getAllTrainings().subscribe({
      next: (response) => {
        this.allTrainings = response.data;
        console.log('Trainings loaded:', this.allTrainings);
      },
      error: (error) => {
        console.error('Error loading trainings:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load trainings',
          icon: 'error',
          theme: 'material-ui-light'
        });
      }
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

    // Format the data properly
    const trainees = this.traineeRows.map(row => {
      const formValue = row.form.value;
      
      // Format dates properly - just use the date string as-is
      const traineeData: any = {
        employeeId: formValue.employeeId,
        trainingCode: formValue.trainingCode,
        startDate: formValue.startDate,
        status: formValue.status,
        completionPercentage: formValue.completionPercentage || 0,
        remarks: formValue.remarks || ''
      };

      // Only add endDate if it has a value
      if (formValue.endDate) {
        traineeData.endDate = formValue.endDate;
      }

      return traineeData;
    });

    console.log('Submitting trainees:', trainees);

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
            console.log('Backend response:', response);
            
            const successCount = response.data.success.length;
            const failedCount = response.data.failed.length;

            let message = `Successfully added ${successCount} trainee(s)`;
            if (failedCount > 0) {
              message += `\n${failedCount} failed due to duplicates or errors`;
              
              // Show details of failed entries
              const failedDetails = response.data.failed
                .map((f: any) => `- ${f.reason}`)
                .join('\n');
              message += '\n\nFailed entries:\n' + failedDetails;
            }

            Swal.fire({
              title: successCount > 0 ? 'Success' : 'Warning',
              text: message,
              icon: successCount > 0 ? 'success' : 'warning',
              theme: 'material-ui-light'
            });

            if (successCount > 0) {
              this.resetAll();
            }
          },
          error: (error) => {
            console.error('Error response:', error);
            Swal.fire({
              title: 'Error',
              text: error.error?.message || 'Error adding trainees: ' + error.message,
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