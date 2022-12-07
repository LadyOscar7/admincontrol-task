import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private intersectionSubject = new BehaviorSubject<boolean>(false);

  public intersectionOptions = {
    root: null, //implies the root is the document viewport
    rootMargin: '0px',
    threshold: [0, 0.5, 1],
  };

  private observer: IntersectionObserver = new IntersectionObserver(
    this.intersectionCallback.bind(this),
    this.intersectionOptions
  );

  getObservable() {
    return this.intersectionSubject.asObservable();
  }

  intersectionCallback(entries: any, observer: any) {
    entries.forEach((entry: any) => {
      console.log(entries, entry.intersectionRatio);
      entry.intersectionRatio > 0.5
        ? this.intersectionSubject.next(true)
        : this.intersectionSubject.next(false);
    });
  }

  setObserver() {
    return this.observer;
  }
}
