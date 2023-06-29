import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: Firestore) {}
  private auth = getAuth();
  private userCollection = collection(this.firestore, 'User');

  async register(userData: any) {
    const newUser = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );
    await setDoc(doc(this.userCollection, newUser.user.uid), {
      email: userData.email,
    });
    return newUser.user.uid;
  }

  async login(userData: any) {
    const user = await signInWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );
    return docData(doc(this.userCollection, user.user.uid)).subscribe((res) => {
      sessionStorage.setItem('userData', JSON.stringify(res));
    });
  }

  async logout() {
    return await this.auth.signOut().then(() => {
      sessionStorage.removeItem('userData');
    });
  }
}
