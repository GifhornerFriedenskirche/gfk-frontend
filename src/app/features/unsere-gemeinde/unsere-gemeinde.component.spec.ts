import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsereGemeindeComponent } from './unsere-gemeinde.component';

describe('UnsereGemeindeComponent', () => {
  let component: UnsereGemeindeComponent;
  let fixture: ComponentFixture<UnsereGemeindeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsereGemeindeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsereGemeindeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
