export interface FormField {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  maxLength?: number;
  pattern?: string;
  options: string[];
  value: any;
  errorMessage?: string;
}
