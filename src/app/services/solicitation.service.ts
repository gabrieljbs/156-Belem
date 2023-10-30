import { Injectable } from '@angular/core';
import { getDocs, query, setDoc, where,orderBy } from '@angular/fire/firestore';
import { Firestore, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  private uid: any;
  constructor(private firestore: Firestore, private authService: AuthService) {}
  private solocitationInfoTourism = collection(this.firestore, 'turismo_info');
  private solicitationCollection = collection(this.firestore, 'solicitation');
  private solicitationCard = collection(this.firestore, 'card');

  async read() {
    this.uid = await this.authService.getuid();
    console.log(this.uid)
    const q = query(
      this.solicitationCollection,
      where('userId', '==', this.uid.res.uid),
    );
    console.log( this.solicitationCollection)
    return await getDocs(q);
  }

  async info() {
    const i = query(this.solocitationInfoTourism);
    return await getDocs(i);
  }

  async card() {
    const q = query(this.solicitationCard);
    return await getDocs(q);
  }

  async create({
    uid,
    descricao,
    latitude,
    longitude,
    icon,
    name,
    url,
    //label,
  }: any) {
    const local = { lat: latitude, lon: longitude/* , label: label */ };

    await setDoc(doc(this.solicitationCollection), {
      abertura: new Date(),
      descricao: descricao,
      atualizacao:new Date(),
      observacao:'',
      icon: icon,
      local: local,
      status: 'Aberto',
      titulo: name,
      userId: uid,
      url: url,
    });
  }


  async delete(uid: any) {
    await deleteDoc(doc(this.solicitationCollection, 'uid', uid));
  }
}
