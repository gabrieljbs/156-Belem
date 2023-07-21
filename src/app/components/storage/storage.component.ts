import { Component, OnInit, inject } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { ref, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
  template:`<h1>Storage</h1>
  <label for="fileUpload">Choose a File</label>
  <input id="fileUpload" type="file" #upload>
  <button (click)="uploadFile(upload)">Upload</button>`
})
export class StorageComponent  implements OnInit {
  private storage: Storage = inject(Storage);

  upLoadFile(input: HTMLInputElement){
    if(!input.files)return

    const files: FileList = input.files;

    for(let i = 0; i < files.length; i++){
      const file = files.item(i);
      if(file){
        const storageRef = ref(this.storage, file.name);
        uploadBytesResumable(storageRef, file);
      }
    }
  }

  constructor() { }

  ngOnInit() {}

}
