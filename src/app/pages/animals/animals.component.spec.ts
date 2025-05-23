import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnimalsComponent } from './animals.component';

describe('AnimalsComponent', () => {
  let component: AnimalsComponent;
  let fixture: ComponentFixture<AnimalsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AnimalsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
