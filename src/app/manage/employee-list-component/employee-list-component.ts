import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Employee, EmployeeService} from '../../trainee/employee-service'

@Component({
  selector: 'app-employee-list-component',
  standalone: false,
  templateUrl: './employee-list-component.html',
  styleUrl: './employee-list-component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  showAddForm = false;
  newEmployee: Partial<Employee> = {
    employeeName: '',
    email: '',
    department: '',
    designation: '',
    isActive: true
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
      error: (error) => console.error('Error loading employees:', error)
    });
  }

  addEmployee(): void {
    if (!this.newEmployee.employeeName || !this.newEmployee.email) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Name and Email are required',
        icon: 'error',
        theme: 'material-ui-light'
      });
      return;
    }

    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Employee added successfully',
          icon: 'success',
          theme: 'material-ui-light'
        });
        this.loadEmployees();
        this.showAddForm = false;
        this.newEmployee = {
          employeeName: '',
          email: '',
          department: '',
          designation: '',
          isActive: true
        };
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to add employee',
          icon: 'error',
          theme: 'material-ui-light'
        });
      }
    });
  }

  deleteEmployee(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete',
      theme: 'material-ui-light'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted',
              text: 'Employee deleted successfully',
              icon: 'success',
              theme: 'material-ui-light'
            });
            this.loadEmployees();
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete employee',
              icon: 'error',
              theme: 'material-ui-light'
            });
          }
        });
      }
    });
  }
}
