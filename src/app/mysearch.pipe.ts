import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mysearch'
})
export class MysearchPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
