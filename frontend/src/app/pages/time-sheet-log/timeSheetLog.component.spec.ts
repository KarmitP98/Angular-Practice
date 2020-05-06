import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {TimeSheetLogComponent} from "./timeSheetLog.component";

describe("TimeSheetLogComponent", () => {
  let component: TimeSheetLogComponent;
  let fixture: ComponentFixture<TimeSheetLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSheetLogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
