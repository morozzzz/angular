import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WORD_LIMIT } from '../../app.config';
import { Router } from '@angular/router';
import { Article } from '../interfaces';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() private isFullArticle: boolean;
  @Input() private article: Article;
  @Input() private id: string;

  @Output() private onArticleDeleted: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router,
    private requetsSrvice: RequestService,
  ) {}

  private isMyArticle: boolean;
  private descriptionWordLimit = WORD_LIMIT;

  ngOnInit() {
    if (this.article) {
      this.isMyArticle = !!this.article._id;
    }    
  }

  private goToEditPage(event) {        
      this.router.navigate(['edit/' + this.id]);
  }
  
  private goToDetailPage(event) {
    if(event.target.tagName !== 'BUTTON') {
      this.router.navigate(['details/' + this.id]);      
    }
  }

  private deleteArticle() {    
    this.requetsSrvice.deleteMyArticleById(this.article._id).subscribe(() => {
      this.onArticleDeleted.emit();
    });
  }
}
