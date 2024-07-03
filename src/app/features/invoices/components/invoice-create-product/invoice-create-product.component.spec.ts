import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCreateProductComponent } from './invoice-create-product.component';

describe('InvoiceCreateProductComponent', () => {
  let component: InvoiceCreateProductComponent;
  let fixture: ComponentFixture<InvoiceCreateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceCreateProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
