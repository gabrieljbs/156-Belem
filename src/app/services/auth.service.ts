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
  private userCollection = collection(this.firestore, 'user');

  //Cadastro do usuario
  async register(userData: any) {
    const newUser = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password,
    );
    await setDoc(doc(this.userCollection, newUser.user.uid), {
      email: userData.email,
      uid: newUser.user.uid,
      full_name: userData.full_name

    });
    return newUser.user.uid;
  }

  //Login do usuario
  async login(userData: any) {
    const user = await signInWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );
    return docData(doc(this.userCollection, user.user.uid)).subscribe((res) => {
      console.log(res)
      sessionStorage.setItem('userData', JSON.stringify({res}));
    });
  }

  //Logout do usuario
  async logout() {
    return await this.auth.signOut().then(() => {
      sessionStorage.removeItem('userData');
    });
  }
}
