import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Traineeservice, Trainee } from '../traineeservice';
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

  constructor(
    private fb: FormBuilder,
    private traineeService: Traineeservice,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.traineeId = this.route.snapshot.paramMap.get('id')!;
    this.traineeForm = this.fb.group({
      EmployeeName: ['', Validators.required],
      TrainingName: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: [''],
      Status: ['', Validators.required]
    });

    this.loadTrainee();
  }

  loadTrainee() {
    this.traineeService.getTrainees().subscribe((trainees) => {
      const trainee = trainees.find((t: any) => t._id === this.traineeId);
      if (trainee) {

        const fTrainee = {
          ...trainee,
          StartDate: trainee.StartDate ? new Date(trainee.StartDate).toISOString().split('T')[0] : '',
          EndDate: trainee.EndDate ? new Date(trainee.EndDate).toISOString().split('T')[0] : ''
        };
        this.traineeForm.patchValue(fTrainee);

      }
    });
  }


  updateTrainee() {
    if (this.traineeForm.invalid) return;

    const updatedTrainee = {
      ...this.traineeForm.value,
      StartDate: new Date(this.traineeForm.value.StartDate),
      EndDate: this.traineeForm.value.EndDate ? new Date(this.traineeForm.value.EndDate) : null
    };

    console.log(updatedTrainee);

    this.traineeService.updateTrainee(this.traineeId, updatedTrainee)
      .subscribe(() => {
        Swal.fire({
          title: 'Updated',
          text: "Trainee Updated Successfully",
          theme: 'material-ui-light',
          icon: 'success'
        })
        this.router.navigate(['/traineem/traineelist']);
      });
  }

}
