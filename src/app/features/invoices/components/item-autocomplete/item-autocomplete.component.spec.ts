import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAutocompleteComponent } from './item-autocomplete.component';

describe('ItemAutocompleteComponent', () => {
  let component: ItemAutocompleteComponent;
  let fixture: ComponentFixture<ItemAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
