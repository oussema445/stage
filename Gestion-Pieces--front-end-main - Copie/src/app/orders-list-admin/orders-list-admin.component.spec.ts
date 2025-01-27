import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListAdminComponent } from './orders-list-admin.component';

describe('OrdersListAdminComponent', () => {
  let component: OrdersListAdminComponent;
  let fixture: ComponentFixture<OrdersListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersListAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
