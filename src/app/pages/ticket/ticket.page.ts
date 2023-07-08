import { Component, OnInit, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  private readonly storage: Storage = inject(Storage);
  uploadFile(input: HTMLInputElement) {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
            const storageRef = ref(this.storage, file.name);
            uploadBytesResumable(storageRef, file);
        }
    }
}
  constructor() { }

  ngOnInit() {
  }

}
