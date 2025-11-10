import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../trainee/traineeservice';
import { Authservice } from '../auth/authservice';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  metrics: any = null;
  loading: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
    private traineeService: TraineeService,
    private authService: Authservice
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadDashboardMetrics();
    } else {
      this.loading = false;
    }
  }

  checkLoginStatus(): void {
    this.isLoggedIn = Boolean(this.authService.isloggedin());
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