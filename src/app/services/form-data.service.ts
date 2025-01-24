import { Injectable } from '@angular/core';
import { FormField } from './form-field.model';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formFields: FormField[] = [];

  // Add field to form
  addField(type: string, name: string, options: string[] | undefined, value: string | string[]) {
    this.formFields.push({ type, name, options, value });
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