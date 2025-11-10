import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTraineeForm } from './multi-trainee-form';

describe('MultiTraineeForm', () => {
  let component: MultiTraineeForm;
  let fixture: ComponentFixture<MultiTraineeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiTraineeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiTraineeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
