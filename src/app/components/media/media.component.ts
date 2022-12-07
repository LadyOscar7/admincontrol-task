import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'media-card',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaCardComponent {
  @Input() result: any;
  @Input() i!: number;

  constructor(private router: Router) {}

  public openDetailsComponent(id: string) {
    this.router.navigateByUrl(`/details/${id}`);
  }

  public displayTrimmedTitle(title: string) {
    if (title && title.length > 20) {
      return title.substring(0, 20) + '...';
    } else {
      return title;
    }
  }
  public displayPoster(poster: string) {
    return poster !== 'N/A'
      ? poster
      : 'https://www.arc.ritsumei.ac.jp/mov/view/img/notfound_portrait.jpg';
  }
}
