import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekDayDropdownComponent } from './week-day-dropdown.component';

describe('WeekDayDropdownComponent', () => {
  let component: WeekDayDropdownComponent;
  let fixture: ComponentFixture<WeekDayDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekDayDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekDayDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
