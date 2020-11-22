import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormProject {
  private isValidNumber = '^(0|[1-9][0-9]*)$';//'^(0|[1-9][0-9]*)$'
  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    selectedLevel: ['', [Validators.required]],
    factor: ['',[Validators.pattern(this.isValidNumber)],],
    percentageRequiredForClosing: ['',[Validators.pattern(this.isValidNumber), Validators.min(50), Validators.max(100)],],
    fantasyName: ['', [Validators.required]],
  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'You must enter a value', //'Debe ingresar un valor',
        pattern: 'Not a valid number', //'No es un email valido', 
        minlength: `This field must be longer than ${minlenght} characters`, //`Este campo debe tener más de  ${minlenght} caracteres`, //`This field must be longer than ${minlenght} characters`
        min: 'Required Percentage: greater than 50%',
        max: 'Required Percentage: less than 100%'
    };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}