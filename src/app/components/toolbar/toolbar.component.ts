import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() title: string = '';

  constructor() {}
}
