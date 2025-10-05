import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainee } from './edit-trainee';

describe('EditTrainee', () => {
  let component: EditTrainee;
  let fixture: ComponentFixture<EditTrainee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTrainee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrainee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
