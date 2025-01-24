import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {
  fieldTypes: string[] = ['TextField', 'TextArea', 'Dropdown', 'Checkbox', 'RadioButton'];
  selectedFieldType: string = '';
  fieldName: string = '';
  fieldValue: string = '';
  fieldOptions: string[] = [];
  optionInput: string = '';
  checkboxValues: Record<string, boolean> = {};
  formSaved: boolean = false;

  constructor(public formDataService: FormDataService, private snackBar: MatSnackBar) { }

  addOption() {
    if (this.optionInput.trim()) {
      this.fieldOptions.push(this.optionInput.trim());
      this.checkboxValues[this.optionInput.trim()] = false;
      this.optionInput = '';
    }
  }

  // Remove an option
  removeOption(index: number) {
    const option = this.fieldOptions[index];
    this.fieldOptions.splice(index, 1);
    delete this.checkboxValues[option];
  }

  // Save the customized field
  saveField() {
    this.formSaved = true;
    if (this.selectedFieldType && this.fieldName) {
      const newField = {
        type: this.selectedFieldType,
        name: this.fieldName,
        value:
          this.selectedFieldType === 'Checkbox'
            ? Object.keys(this.checkboxValues).filter(option => this.checkboxValues[option]) // Get selected checkboxes
            : this.fieldValue, // Save radio/other values
        options: this.fieldOptions.length > 0 ? [...this.fieldOptions] : undefined
      };
      this.formDataService.addField(newField.type, newField.name, newField.options, newField.value);

      // Show success snackbar
      this.snackBar.open('Field saved successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });

      // Reset after saving
      this.selectedFieldType = '';
      this.fieldName = '';
      this.fieldValue = '';
      this.checkboxValues = {};
      this.fieldOptions = [];
    } else {
      alert('Please provide a field name!');
    }
  }

  saveFormData() {
    console.log('Form Data:', this.formDataService.formFields);

    // Show success snackbar
    this.snackBar.open('Form saved successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    // Clear the form preview fields
    this.selectedFieldType = '';
    this.fieldName = '';
    this.fieldValue = '';
    this.fieldOptions = [];
    this.checkboxValues = {};

    // Clear the form preview data from formDataService
    this.formDataService.clearFormFields();
  }

  // Remove a field with confirmation
  confirmRemoveField(index: number) {
    const confirmed = window.confirm('Are you sure you want to remove this field?');
    if (confirmed) {
      this.formDataService.removeField(index);
    }
  }
}
