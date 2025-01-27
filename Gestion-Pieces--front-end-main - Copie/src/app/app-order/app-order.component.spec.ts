import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOrderComponent } from './app-order.component';

describe('AppOrderComponent', () => {
  let component: AppOrderComponent;
  let fixture: ComponentFixture<AppOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
