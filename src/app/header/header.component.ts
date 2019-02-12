import { Component, OnInit, Input } from '@angular/core';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private statusService: StatusService) { }

  private status: string = ''
  ngOnInit() {    
    this.statusService.updateStatus.subscribe((status) => {
      this.status = status;
    });
  }
}
