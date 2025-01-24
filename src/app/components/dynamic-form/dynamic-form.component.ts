import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormField } from '../../services/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() field!: FormField;
  @Output() remove = new EventEmitter<void>();

  isChecked(option: string): boolean {
    if (Array.isArray(this.field.value)) {
      return this.field.value.includes(option);
    }

    if (typeof this.field.value === 'boolean') {
      return this.field.value === true;
    }

    return this.field.value === option;
  }

  removeField() {
    this.remove.emit();
  }
}
