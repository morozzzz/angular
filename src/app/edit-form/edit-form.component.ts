import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Article } from '../interfaces';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DATE_OPTIONS } from '../../app.config';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  @Output() save: EventEmitter<Article> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  @Input() article: Article;


  constructor(
    private router: Router,
    private location: Location
  ) { }

  // private heading: FormControl = new FormControl('', [Validators.required]);
  // private description: FormControl = new FormControl('',[Validators.required]);
  // private content: FormControl = new FormControl('',[Validators.required]);
  // private imageUrl: FormControl = new FormControl();
  // private date: FormControl = new FormControl();
  // private author: FormControl = new FormControl();
  // private sourceUrl: FormControl = new FormControl();

  private editForm = new FormGroup({
    heading: new FormControl('', [Validators.required]),
    description: new FormControl('',[Validators.required]),
    content: new FormControl('',[Validators.required]),
    imageUrl: new FormControl(),
    date: new FormControl(),
    author: new FormControl(),
    sourceUrl: new FormControl(),
  })

  ngOnInit() {
    if (this.article) {
      this.editForm.controls['heading'].setValue(this.article.title);
      this.editForm.controls['description'].setValue(this.article.description);
      this.editForm.controls['content'].setValue(this.article.content);
      this.editForm.controls['imageUrl'].setValue(this.article.urlToImage);
      this.editForm.controls['date'].setValue(this.article.publishedAt);
      this.editForm.controls['author'].setValue(this.article.author);
      this.editForm.controls['sourceUrl'].setValue(this.article.url);
    } else {
      this.editForm.controls['date'].setValue(new Date(Date.now()).toLocaleString('en-US', DATE_OPTIONS));      
    }
  }

  private onSave() {
    const article = {      
      title: this.editForm.get('heading').value,
      description: this.editForm.get('description').value,
      content: this.editForm.get('content').value,
      author: this.editForm.get('author').value,
      publishedAt: this.editForm.get('date').value,
      urlToImage: this.editForm.get('imageUrl').value,
      url: this.editForm.get('sourceUrl').value,
    }

    this.save.emit(article);
  }

  private onCancel() {
    if (window.history.length > 1) {
      this.location.back();      
    } else {
      this.router.navigate(['']);
    }
  }
}
