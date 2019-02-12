import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces';

@Pipe({
  name: 'keyWordFilter'
})
export class KeyWordPipe implements PipeTransform {

  transform(articles: Array<Article>, keyWord: string): any {    
    if (articles && keyWord) {
      return articles.filter(article => {
        const articleDescription = article.description.toLowerCase();
        return articleDescription.indexOf(keyWord.toLowerCase()) > -1;
      });
    }

    return articles;
  }
}
