import { Injectable } from '@angular/core';
import { uploadBytesResumable } from '@angular/fire/storage';
import {getStorage,ref,listAll,ListResult, getDownloadURL, uploadBytes,} from 'firebase/storage';
import { Observable, from } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = getStorage();
  private listRef = ref(this.storage, '/pontos turísticos');

  constructor() {}

  async setFiles(input: any) {
    if (!input.files) return;
    console.log(input)
    const files: FileList = input.files;
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, 'user/'+uid+'/idTicket/'+file.name);
        const result = await uploadBytesResumable(storageRef, file);
        console.log(result);
      }
    }
  }


  getPontosTuristicos(): Observable<string[]> {
    return from(listAll(this.listRef)).pipe(
      mergeMap((result: ListResult) => {
        const downloadURLs$ = result.items.map((item) =>
          from(getDownloadURL(item))
        );
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
