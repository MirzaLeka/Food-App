import { AbstractControl } from '@angular/forms';

export const minimumNumberValidator = (control : AbstractControl) : {[key: string] : any} | null => {
  const minNumber = control.value < 0;  
  return minNumber ? { 'minimumNumber': { value: control.value } } : null;
}
