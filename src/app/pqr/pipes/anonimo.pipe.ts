import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anonimo',
  standalone: true
})
export class AnonimoPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Si' : 'No';
  }

}
