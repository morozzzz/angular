import { Injectable } from '@angular/core';
import { Source, Article, Store, State } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor() { }

  private store: Store = {
    webArticles: [],
    myArticles: [],
    sources: [],
    sourcesMap: {},
    state: null
  };

  private isMyServer: boolean = false;

  private formatSources(sources) {
    return sources.map((item) => {
      this.store.sourcesMap[item.id] = item.name;

      return {
        id: item.id,
        name: item.name
      }
    });
  } 

  public saveSources(sources: Array<any>) {
    this.store.sources = this.formatSources(sources);
  }

  public saveWebArticles(articles: Array<any>) {
    this.store.webArticles = articles;
  }

  public addWebArticles(articles: Array<any>) {
    this.store.webArticles.push(...articles);
  }

  public getWebArticles(): Array<any> {
    return this.store.webArticles;
  }

  public getArticleById(id: number): Article {
    console.log(this.isMyServer);
    
    if (this.isMyServer) {
      return this.store.myArticles[id];
    }    
    return this.store.webArticles[id];
  }

  public getSources() {    
    return this.store.sources;
  }

  public getSourceNameById(id: string): string {
    return this.store.sourcesMap[id] || '';
  }

  public saveMyArticles(articles: Array<any>) {
    this.store.myArticles = articles;
  }

  public getMyArticles() {
    return this.store.myArticles;
  }

  public switchServer() {    
    this.isMyServer = !this.isMyServer;
  }

  public saveState(state: State) {
    this.store.state = state;
  }

  public getState(): State {
    return this.store.state;
  }
}
