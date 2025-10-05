import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Traineeform } from './traineeform';

describe('Traineeform', () => {
  let component: Traineeform;
  let fixture: ComponentFixture<Traineeform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Traineeform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Traineeform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
