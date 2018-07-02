import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'replaceStockName'})
export class ReplaceStockName implements PipeTransform {
  transform(value: string): string {
    return value.replace(/_/g, '/');
  }
}