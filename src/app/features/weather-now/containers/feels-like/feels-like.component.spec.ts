import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeelsLikeComponent } from './feels-like.component';

describe('FeelsLikeComponent', () => {
  let component: FeelsLikeComponent;
  let fixture: ComponentFixture<FeelsLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeelsLikeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeelsLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
