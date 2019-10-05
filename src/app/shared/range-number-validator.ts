import { FormGroup } from '@angular/forms';

export const rangeNumberValidator = (form : FormGroup) : {[key: string] : any} | null => {
  const minDistance = form.controls['minDistance'];
  const maxDistance = form.controls['maxDistance'];

  if (minDistance > maxDistance) {
    alert('!');
  }

  return maxDistance < minDistance ? { 'rangeNumber': { value: 'Maximum distance must be greater than minimum' } } : null;
}
