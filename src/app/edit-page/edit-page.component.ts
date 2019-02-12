import { Component, OnInit, Input } from '@angular/core';
import { StatusService } from '../services/status.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces';
import { StoreService } from '../services/store.service';
import { RequestService } from '../services/request.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  constructor(
    private statusService: StatusService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private requetsSrvice: RequestService,
    private location: Location
  ) { }

  private article: Article;

  ngOnInit() {
    const articleId: number = this.route.snapshot.params.id;

    this.statusService.updateStatus.emit('EDIT');
    this.article = this.storeService.getArticleById(articleId);  
  }

  updateArticle(newArticle) {
    this.requetsSrvice.updateMyArticleById(this.article._id, newArticle)
      .subscribe(() => {
        this.location.back();
      });
  }
}
