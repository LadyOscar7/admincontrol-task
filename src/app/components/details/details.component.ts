import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDetails } from 'src/app/interfaces/media-details.interface';
import { BrowseService } from 'src/app/services/browse.service';
import { Location } from '@angular/common';

@Component({
  selector: 'media-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  public mediaDetails!: MediaDetails;
  public genreItems: string[] = [];
  public languageItems: string[] = [];
  public loading: boolean = true;
  public hideElement: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private browseService: BrowseService,
    private location: Location
  ) {
    this.fetchMediaDetails();
  }

  public fetchMediaDetails() {
    const mediaId = this.route.snapshot.params['id'];
    this.loading = true;
    this.browseService.getById(mediaId).subscribe({
      next: (data: any) => {
        console.log('singleDetails', data);
        this.mediaDetails = data;
        this.genreItems = this.createChip(data.Genre);
        this.languageItems = this.createChip(data.Language);
        this.loading = false;
      },
    });
  }

  public goBack() {
    this.location.back();
  }

  public createChip(item: string) {
    return item.replace(/,/g, '').split(' ');
  }

  public displayPoster(poster: string) {
    return poster !== 'N/A'
      ? poster
      : 'https://www.arc.ritsumei.ac.jp/mov/view/img/notfound_portrait.jpg';
  }

  public display(item: string) {
    return item !== 'N/A' ? `• ${item}` : '';
  }

  public displayPlot(item: string) {
    if (item !== 'N/A') {
      return item;
    } else {
      this.hideElement = false;
      return (item = '');
    }
  }

  public displayDirectors(item: string) {
    return item !== 'N/A' ? `Directed by: ${item}` : '';
  }

  public displayActors(item: string) {
    return item !== 'N/A' ? `Starred by: ${item}` : '';
  }

  public displayCountry(item: string) {
    return item !== 'N/A' ? `Country: ${item}` : '';
  }

  public displayRating(item: string) {
    if (item !== 'N/A') {
      return item;
    } else {
      this.hideElement = false;
      return (item = '');
    }
  }
}
