import { Component, OnInit } from '@angular/core';
import { StatusService } from '../services/status.service';
import { StoreService } from '../services/store.service';
import { Article } from '../interfaces';
import { RequestService } from '../services/request.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  constructor(
    private statusService: StatusService,
    private storeService: StoreService,
    private requetsSrvice: RequestService,
    private location: Location
  ) { }

  ngOnInit() {
    this.statusService.updateStatus.emit('CREATE');
  }

  saveArticle(article: Article) {
    this.requetsSrvice.saveMyArticle(article).subscribe(() => {
      this.location.back();
    });
  }
}
