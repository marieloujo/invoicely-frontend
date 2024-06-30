import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { SlugPipe } from '@app/shared/pipes/slug.pipe';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule, SlugPipe],
  templateUrl: './form-input.component.html'
})
export class FormInputComponent {
  @Input() size: string = 'col-12';
  @Input() label: string = '';
  @Input() name: string = '';
}
