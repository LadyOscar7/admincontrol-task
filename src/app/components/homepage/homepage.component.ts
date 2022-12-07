import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { FormControl, Validators } from '@angular/forms';
import { ScrollService } from 'src/app/services/infinite-scroll.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, AfterContentChecked {
  public results: any[] = [];
  public searchValue: string = 'Asterix';
  public searchType: string = '';
  public loading: boolean = false;
  public error: boolean = false;
  public errorMsg: string | null = null;
  public searchFormControl: FormControl = new FormControl('', [
    Validators.minLength(3),
    Validators.required,
  ]);

  public page: number = 1;
  public totalResults!: number;

  constructor(
    private browseService: BrowseService,
    private scrollService: ScrollService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (
      this.route.snapshot.queryParams['s'] &&
      this.route.snapshot.queryParams['t']
    ) {
      this.searchValue = this.route.snapshot.queryParams['s'];
      this.searchType = this.route.snapshot.queryParams['t'];
    }
    this.search();

    this.scrollService.getObservable().subscribe((status) => {
      if (status && this.page < Math.ceil(this.totalResults / 10)) {
        ++this.page;
        this.search();
      }
    });
  }

  ngAfterContentChecked(): void {
    let oldTarget = document.querySelector(`#target${this.getOldCardTarget()}`);
    let newTarget = document.querySelector(`#target${this.getNewCardTarget()}`);
    if (newTarget) {
      if (oldTarget) {
        this.scrollService.setObserver().unobserve(oldTarget);
      }
      this.scrollService.setObserver().observe(newTarget);
    } else {
      console.log('failed to find ', `#target${this.page * 10 - 10 + 1}`);
    }
  }

  public getOldCardTarget() {
    return this.page * 10 - 20 + 1;
  }

  public getNewCardTarget() {
    return this.page * 10 - 10 + 1;
  }

  public detectSearchOnKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.performSearch();
    }
  }

  public performSearch() {
    if (!this.searchValue || this.searchValue.length < 3) {
      this.searchFormControl.markAsTouched();
    } else {
      location.href = `./dashboard?s=${this.searchValue}&t=${this.searchType}`;
    }
  }

  public search() {
    this.browseService
      .getAll(this.searchValue, this.searchType, this.page)
      .subscribe({
        next: (data: any) => {
          if (data.Response == 'True') {
            this.error = false;
            this.totalResults = parseInt(data.totalResults);
            this.results.push(...data.Search);
          } else if (data.Response == 'False') {
            this.results = [];
            this.error = true;
            this.errorMsg = data.Error;
          }
        },
        error: (err: any) => {
          this.error = true;
          this.errorMsg = 'Something went wrong with your search.';
        },
      });
  }
}
