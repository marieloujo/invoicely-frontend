import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCreateServiceComponent } from './invoice-create-service.component';

describe('InvoiceCreateServiceComponent', () => {
  let component: InvoiceCreateServiceComponent;
  let fixture: ComponentFixture<InvoiceCreateServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceCreateServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceCreateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
