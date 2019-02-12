import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trancate'
})
export class TrancatePipe implements PipeTransform {

  transform(text: string, limit: number): string {
    if (text && limit) {
      const words = text.split(' ');
      
      if (words.length <= limit) {
        return text;
      }

      return words.slice(0, limit).join(' ') + '...  Read more'
    }
    return text;
  }
}
