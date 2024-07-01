import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvoiceIndexComponent } from './create-invoice-index.component';

describe('CreateInvoiceIndexComponent', () => {
  let component: CreateInvoiceIndexComponent;
  let fixture: ComponentFixture<CreateInvoiceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInvoiceIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInvoiceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
