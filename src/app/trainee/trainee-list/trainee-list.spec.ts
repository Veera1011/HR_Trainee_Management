import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeList } from './trainee-list';

describe('TraineeList', () => {
  let component: TraineeList;
  let fixture: ComponentFixture<TraineeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraineeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
