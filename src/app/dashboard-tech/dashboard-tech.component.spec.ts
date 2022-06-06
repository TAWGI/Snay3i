import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTechComponent } from './dashboard-tech.component';

describe('DashboardTechComponent', () => {
  let component: DashboardTechComponent;
  let fixture: ComponentFixture<DashboardTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
