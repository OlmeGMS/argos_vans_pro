import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesProductsComponent } from './datatables-products.component';

describe('DatatablesProductsComponent', () => {
  let component: DatatablesProductsComponent;
  let fixture: ComponentFixture<DatatablesProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatablesProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
