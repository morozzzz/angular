import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { StatusService } from '../services/status.service';
import { Article } from '../interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private statusService: StatusService,
    private location: Location
  ) {}
  
  private articleId: number;
  private article: Article;

  ngOnInit() {

    this.articleId = this.route.snapshot.params.id;
    this.article = this.storeService.getArticleById(this.articleId);  
    
    if (!this.article) {
      this.router.navigate(['']);
    }
  }

  private onDelete() {
    this.location.back();
  }
}
