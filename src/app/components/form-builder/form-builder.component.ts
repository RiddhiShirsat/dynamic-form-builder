import { Component } from '@angular/core';
import { FormField } from '../../services/form-field.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
  fieldTypes: string[] = ['TextField', 'TextArea', 'Dropdown', 'Checkbox', 'RadioButton'];
  formFields: FormField[] = [];

  selectedFieldType: string = '';
  fieldLabelEnabled: boolean = true;
  fieldName: string = '';
  placeholderEnabled: boolean = true;
  placeholder: string = '';
  isRequired: boolean = false;
  maxLengthEnabled: boolean = false;
  maxLength?: number = undefined;
  patternEnabled: boolean = false;
  pattern?: string = undefined;
  fieldOptions: string[] = [];
  optionInput: string = '';

  constructor(private snackBar: MatSnackBar) { }

  //Add an option to the options list
  addOption() {
    if (this.optionInput.trim()) {
      this.fieldOptions.push(this.optionInput.trim());
      this.optionInput = '';
    } else {
      this.snackBar.open('Option text cannot be empty!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }

  // Remove an option from the options list
  removeOption(index: number) {
    this.fieldOptions.splice(index, 1);
  }

  // Save the field and add it to the form
  saveField() {
    // Validate field label if enabled
    if (this.fieldLabelEnabled && !this.fieldName.trim()) {
      this.snackBar.open('Please provide a field label!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    // Validate placeholder if enabled
    if (this.placeholderEnabled && !this.placeholder.trim()) {
      this.snackBar.open('Please provide a placeholder!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    // Validate max length if enabled
    if (this.maxLengthEnabled && !this.maxLength) {
      this.snackBar.open('Please provide a value for max length!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    // Validate validation pattern if enabled
    if (this.patternEnabled && !this.pattern) {
      this.snackBar.open('Please provide a validation pattern!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    const newField: FormField = {
      type: this.selectedFieldType,
      name: this.fieldLabelEnabled ? this.fieldName.trim() : '',
      placeholder: this.placeholderEnabled ? this.placeholder.trim() : '',
      required: this.isRequired,
      maxLength: this.maxLengthEnabled ? this.maxLength : undefined,
      pattern: this.patternEnabled ? this.pattern : undefined,
      options: [...this.fieldOptions],
      value: this.getDefaultValue(),
    };

    this.formFields.push(newField);
    this.resetForm();

    this.snackBar.open('Field saved successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  // Remove a saved field
  removeField(index: number) {
    this.formFields.splice(index, 1);
    this.snackBar.open('Field removed successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  // Submit the entire form
  submitForm() {
    if (!this.formFields.length) {
      this.snackBar.open('No fields to submit!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    console.log('Form Submitted:');
    this.formFields.forEach((field, index) => {
      console.log(` ${field.name}:`, field.value);
    });

    this.snackBar.open('Form submitted successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });

    this.formFields = [];
    this.resetForm();
  }

  // Reset customization form
  resetForm() {
    this.selectedFieldType = '';
    this.fieldLabelEnabled = true;
    this.fieldName = '';
    this.placeholderEnabled = true;
    this.placeholder = '';
    this.isRequired = false;
    this.maxLengthEnabled = false;
    this.maxLength = undefined;
    this.patternEnabled = false;
    this.pattern = undefined;
    this.fieldOptions = [];
    this.optionInput = '';
  }

  // Get the default value for a field based on its type
  private getDefaultValue(): any {
    switch (this.selectedFieldType) {
      case 'Checkbox':
        return this.fieldOptions.map(() => false);
      case 'Dropdown':
      case 'RadioButton':
        return '';
      default:
        return '';
    }
  }

  // Update the field with new data
  updateField(index: number, updatedField: FormField) {
    console.log(`Updated Field at index ${index}:`, updatedField);
    this.formFields[index] = updatedField;
  }
}
