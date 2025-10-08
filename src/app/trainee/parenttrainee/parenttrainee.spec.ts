import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parenttrainee } from './parenttrainee';

describe('Parenttrainee', () => {
  let component: Parenttrainee;
  let fixture: ComponentFixture<Parenttrainee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Parenttrainee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Parenttrainee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
