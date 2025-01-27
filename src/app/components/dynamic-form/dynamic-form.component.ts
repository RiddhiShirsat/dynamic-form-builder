import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../../services/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() field!: FormField;
  @Output() remove = new EventEmitter<void>();
  @Output() update = new EventEmitter<{ name: string; value: any }>();

  // Getter for pattern validation
  get isPatternValid(): boolean {
    return this.field.pattern ? new RegExp(this.field.pattern).test(this.field.value) : true;
  }

  // Getter for max length validation
  get isMaxLengthValid(): boolean {
    return this.field.maxLength ? this.field.value?.length <= this.field.maxLength : true;
  }

  onFieldChange() {
    this.update.emit({ name: this.field.name, value: this.field.value });
  }

  removeField() {
    this.remove.emit();
  }
}
