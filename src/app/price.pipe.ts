import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'replaceStockPrice'})
export class ReplaceStockPrice implements PipeTransform {
  transform(priceValue: number): string {
      let componentValue = "";
      let stringValue = "";
      if (Number.isNaN(priceValue))
        stringValue = "0.000000";
        else
        stringValue = Number(priceValue).toPrecision(6);
      let decimalIndex = stringValue.indexOf('.');
      let wholeValue : string;
      let decimalValue : string;
      if (decimalIndex > 3){
          wholeValue = stringValue.slice(0, decimalIndex - 1);
          decimalValue = stringValue.slice(decimalIndex + 1, stringValue.length);
      }else{
          wholeValue = stringValue.slice(0, 4);
          decimalValue = stringValue.slice(4, 7);
      }
      componentValue = wholeValue + "<span class=\"stock-price\">" + decimalValue + "</span>";
    return componentValue;
  }
}