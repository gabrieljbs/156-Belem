import { Injectable } from '@angular/core';
import { getStorage, ref, listAll, ListResult, getDownloadURL } from 'firebase/storage';
import { Observable, from } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = getStorage();
  private listRef = ref(this.storage, '/pontos turísticos');

  constructor() {}

  getPontosTuristicos(): Observable<string[]> {
    return from(listAll(this.listRef)).pipe(
      mergeMap((result: ListResult) => {
        const downloadURLs$ = result.items.map((item) => from(getDownloadURL(item)));
        return new Observable<string[]>((observer) => {
          let completed = 0;
          const urls: string[] = [];

          downloadURLs$.forEach((url$) => {
            url$.subscribe((url) => {
              urls.push(url);
              completed++;

              if (completed === downloadURLs$.length) {
                observer.next(urls);
                observer.complete();
              }
            });
          });
        });
      })
    );
  }
}
