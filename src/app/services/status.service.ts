import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }

  public updateStatus: EventEmitter<string> = new EventEmitter;
}
