import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { StoreService } from '../services/store.service';
import { StatusService } from '../services/status.service';
import { Source, Article, State } from '../interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private articles: Array<Article> = [];
  private sources: Array<Source> = [];
  private keyWord: string = '';
  private state: State;

  get emptyState(): State {
    const source = this.getRandomSource();
    return {
      page: 1,
      articleLimit: 5,
      isMyServer: false,
      currentSource: source,
      status: source.name,
    }
  }

  constructor(
    private requestService: RequestService,
    public storeService: StoreService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.requestService.getSources().subscribe((sources) => {
      this.storeService.saveSources(sources);
      this.updateSources();

      this.state = this.storeService.getState() || this.emptyState;

      if (this.state.isMyServer) {
        this.getMyNews();
      } else {
        this.getNewsBySource(this.state.currentSource.id);
      }

      this.updateStatusBar(this.state.status);
      });
  }

  ngOnDestroy() {
    this.storeService.saveState(this.state);
  }

  private getRandomSource() {
    const randomIndex = Math.floor(Math.random()*this.sources.length);
    return this.sources[randomIndex];
  }

  private onSourceUpdate(sourceId: string) {
    this.resetPageNumber();
    this.getNewsBySource(sourceId);
    this.updateStatusBar(this.storeService.getSourceNameById(sourceId));
  }

  private onServerChange(isMyServer: boolean) {    
    if(this.state.isMyServer !== isMyServer) {
      this.storeService.switchServer();
    }

    this.state.isMyServer = isMyServer;

    if (isMyServer) {
      this.state.status = 'MY NEWS';
      this.getMyNews();
    } else {
      this.state.status = this.state.currentSource.name;
      this.updateArticles();
    }
    this.updateStatusBar(this.state.status);
  }

  private resetPageNumber() {
    this.state.page = 1;
  }

  private getNewsBySource(source: string) {
    this.requestService.getNews(source, this.state.articleLimit, this.state.page)
      .subscribe((articles) => {
        this.storeService.saveWebArticles(articles);
        this.updateArticles();
      });
  }

  private getMyNews() {
    this.requestService.getMyNews()
      .subscribe((articles) => {
        this.storeService.saveMyArticles(articles);
        this.updateArticles();        
      });
  }

  private updateSources() {
    this.sources = this.storeService.getSources();
  }

  private updateArticles() {   
    this.articles = this.state.isMyServer ? this.storeService.getMyArticles() : this.storeService.getWebArticles();
  }

  private updateStatusBar(status: string) {
    this.statusService.updateStatus.emit(status);
  }

  private getMoreNews() {
    this.state.page++;
    this.requestService.getNews(this.state.currentSource.id, this.state.articleLimit, this.state.page)
      .subscribe((articles) => {
        this.storeService.addWebArticles(articles);
        this.updateArticles();
      });
  }

  private updateFilter(keyWord: string) {
    this.keyWord = keyWord;
  }
}
