import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterByTitle'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, title: string): any {
    if(title === '' || undefined) {
      return  value;
    }
    return value.filter((item) => item?.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
  }
}
