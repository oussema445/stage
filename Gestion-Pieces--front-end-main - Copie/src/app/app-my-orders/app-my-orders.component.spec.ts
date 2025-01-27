import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMyOrdersComponent } from './app-my-orders.component';

describe('AppMyOrdersComponent', () => {
  let component: AppMyOrdersComponent;
  let fixture: ComponentFixture<AppMyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMyOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
