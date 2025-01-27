import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategGeneralComponent } from './add-categgeneral.component';

describe('AddCateggeneralComponent', () => {
  let component: AddCategGeneralComponent;
  let fixture: ComponentFixture<AddCategGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
