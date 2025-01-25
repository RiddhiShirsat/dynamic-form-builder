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

  // Dynamic placeholders
  getPlaceholder(type: 'label' | 'options'): string {
    if (type === 'label') {
      switch (this.selectedFieldType) {
        case 'TextField':
          return 'Please enter text field label you want to display';
        case 'TextArea':
          return 'Please enter the text area label';
        case 'Dropdown':
          return 'Please enter the dropdown label';
        case 'Checkbox':
          return 'Please enter the checkbox label';
        case 'RadioButton':
          return 'Please enter the radio button label';
      }
    } else if (type === 'options') {
      switch (this.selectedFieldType) {
        case 'Dropdown':
          return 'Please enter dropdown options';
        case 'Checkbox':
          return 'Please enter checkbox options';
        case 'RadioButton':
          return 'Please enter radio button options';
      }
    }
    return '';
  }

  // Dynamic validation rules
  getMaxLength(type: 'label' | 'options'): number {
    if (type === 'label') {
      switch (this.selectedFieldType) {
        case 'TextField':
        case 'TextArea':
          return 100;
        default:
          return 1000;
      }
    } else if (type === 'options') {
      return 100;
    }
    return 0;
  }

  getPattern(type: 'label'): string | RegExp {
    if (type === 'label') {
      switch (this.selectedFieldType) {
        case 'TextField':
        case 'TextArea':
          return '^[a-zA-Z ]*$';
        default:
          return '';
      }
    }
    return '';
  }

  clearOptionInputError(optionInputCtrl: any) {
    if (optionInputCtrl.valid) {
      optionInputCtrl.control.markAsTouched();
    }
  }

  addOption() {
    // Check if selected field type is valid and if the field name is filled
    if (!this.selectedFieldType || !this.fieldName.trim()) {
      this.snackBar.open('Please select a field type and provide a field name before adding options!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    // Check if the field type is one of those that require options
    if (!['Dropdown', 'Checkbox', 'RadioButton'].includes(this.selectedFieldType)) {
      this.snackBar.open('Options can only be added for Dropdown, Checkbox, or RadioButton fields!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    // Proceed to add the option if all validations pass
    if (this.optionInput.trim()) {
      this.fieldOptions.push(this.optionInput.trim());

      // Initialize the checkboxValues object for new checkbox options
      if (this.selectedFieldType === 'Checkbox') {
        this.checkboxValues[this.optionInput.trim()] = false;
      }

      // Clear the option input field
      this.optionInput = '';
    } else {
      this.snackBar.open('Please enter a valid option before adding!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
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

    if (!this.selectedFieldType || !this.fieldName) {
      this.snackBar.open('Please provide a field type and field name!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    // Proceed with saving the field if everything is valid
    const newField = {
      type: this.selectedFieldType,
      name: this.fieldName,
      value:
        this.selectedFieldType === 'Checkbox'
          ? Object.keys(this.checkboxValues).filter(option => this.checkboxValues[option])
          : this.fieldValue,
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
  }

  saveFormData() {
    // Check if required fields are filled
    if (!this.formDataService.formFields.length) {
      this.snackBar.open('Please add fields to the form before saving!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    // Check if any added field is missing a name or options (if applicable)
    const invalidFields = this.formDataService.formFields.filter(field =>
      !field.name || (['Dropdown', 'Checkbox', 'RadioButton'].includes(field.type) && (!field.options || field.options.length === 0))
    );

    if (invalidFields.length > 0) {
      this.snackBar.open('Please provide a valid field name and options for all fields before saving!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    // If all validations pass, save the form data
    console.log('Form Data:', this.formDataService.formFields);

    this.snackBar.open('Form saved successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    // Clear the form preview data
    this.formDataService.clearFormFields();
    this.selectedFieldType = '';
    this.fieldName = '';
    this.fieldValue = '';
    this.checkboxValues = {};
    this.fieldOptions = [];
  }

  // Remove a field with confirmation
  confirmRemoveField(index: number) {
    const confirmed = window.confirm('Are you sure you want to remove this field?');
    if (confirmed) {
      this.formDataService.removeField(index);
    }
  }
}
