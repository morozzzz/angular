import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source } from '../interfaces';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  @Input()  sources: Array<Source> = [];
  @Input()  isMyServer: boolean;

  @Output() updateSource: EventEmitter<string> = new EventEmitter();
  @Output() switchNewsServer: EventEmitter<string> = new EventEmitter();
  @Output() filter: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) { }


  ngOnInit() {
  }

  private keyWord:FormControl = new FormControl('');

  private hangleFilterButton() {
    this.filter.emit(this.keyWord.value);
  }

  private handleSourceSelect(event) {
    const sourceId = event.target.value;
    this.updateSource.emit(sourceId);    
  }

  private onCheckChange(event) {
    this.switchNewsServer.emit(event.target.checked);
  }

  private goToCreatePage() {
    this.router.navigate(['create']);
  }
}
