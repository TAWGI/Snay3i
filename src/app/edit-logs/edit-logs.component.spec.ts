import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogsComponent } from './edit-logs.component';

describe('EditLogsComponent', () => {
  let component: EditLogsComponent;
  let fixture: ComponentFixture<EditLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
