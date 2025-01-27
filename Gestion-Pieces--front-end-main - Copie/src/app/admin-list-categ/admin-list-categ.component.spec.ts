import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListCategComponent } from './admin-list-categ.component';

describe('AdminListCategComponent', () => {
  let component: AdminListCategComponent;
  let fixture: ComponentFixture<AdminListCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListCategComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
