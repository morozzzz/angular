import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  API_KEY,
  BASE_URL,
  END_POINT,
  DEFAULT_LANGUAGE,
  MY_SERVER_BASE_URL
}  from '../../app.config';
import { map } from 'rxjs/operators';
import { Article, NewsAPIResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}
  
  public getNews(source: string, pageSize: number, page: number) {
    return this.http.get<NewsAPIResponse>(`${BASE_URL}/${END_POINT}?sources=${source}&language=${DEFAULT_LANGUAGE}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`)
      .pipe(
        map((response: any) => {
          return response.articles;
        })
      );      
  }

  public getSources() {
    return this.http.get<any>(`${BASE_URL}/sources?apiKey=${API_KEY}`)
      .pipe(
        map((response: any) => {
          return response.sources;
        })
      );      
  }

  public getMyNews() {
    return this.http.get<any>(`${MY_SERVER_BASE_URL}/news`);
  }

  public saveMyArticle(article: Article) {
    return this.http.post<any>(`${MY_SERVER_BASE_URL}/news`, article);
  }

  public updateMyArticleById(id: string, newArticle: Article) {
    return this.http.put<any>(`${MY_SERVER_BASE_URL}/news/${id}`, newArticle);
  }

  public deleteMyArticleById(id: string) {
    return this.http.delete<any>(`${MY_SERVER_BASE_URL}/news/${id}`);
  }
}
