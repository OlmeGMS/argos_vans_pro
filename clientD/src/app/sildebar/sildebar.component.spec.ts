import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SildebarComponent } from './sildebar.component';

describe('SildebarComponent', () => {
  let component: SildebarComponent;
  let fixture: ComponentFixture<SildebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SildebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SildebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
