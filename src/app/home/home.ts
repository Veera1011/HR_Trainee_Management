import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../trainee/traineeservice';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  metrics: any = null;
  loading: boolean = true;

  constructor(private traineeService: TraineeService) {}

  ngOnInit(): void {
    this.loadDashboardMetrics();
  }

  loadDashboardMetrics(): void {
    this.traineeService.getDashboardMetrics().subscribe({
      next: (response) => {
        this.metrics = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard metrics:', error);
        this.loading = false;
      }
    });
  }
}