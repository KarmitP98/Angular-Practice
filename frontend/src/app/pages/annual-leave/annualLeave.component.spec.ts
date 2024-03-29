import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AnnualLeaveComponent} from "./annualLeave.component";

describe("AnnualleaveComponent", () => {
  let component: AnnualLeaveComponent;
  let fixture: ComponentFixture<AnnualLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualLeaveComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
