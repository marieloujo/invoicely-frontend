import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIndexComponent } from './service-index.component';

describe('ServiceIndexComponent', () => {
  let component: ServiceIndexComponent;
  let fixture: ComponentFixture<ServiceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
