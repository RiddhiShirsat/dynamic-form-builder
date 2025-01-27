import { Injectable } from '@angular/core';
import { FormField } from './form-field.model';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formFields: FormField[] = [];

  // Add field to form
  addField(type: string,
    name: string,
    options: string[] | undefined,
    value: string | string[],
    placeholder: string = '',
    required: boolean = false) {
    const fieldOptions = options || [];

    const newField: FormField = {
      type,
      name,
      options: fieldOptions,
      value,
      placeholder,
      required,
      errorMessage: ''
    };

    this.formFields.push(newField);
  }

  // Remove field from form
  removeField(index: number) {
    this.formFields.splice(index, 1);
  }

  // Clear all form fields
  clearFormFields() {
    this.formFields = [];
  }
}
