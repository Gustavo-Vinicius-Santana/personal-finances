import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialMovementComponent } from './financial-movement.component';

describe('FinancialMovementComponent', () => {
  let component: FinancialMovementComponent;
  let fixture: ComponentFixture<FinancialMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialMovementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
