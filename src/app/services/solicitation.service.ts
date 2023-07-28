import { Injectable } from '@angular/core';
import { getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';
import { format, lastDayOfMonth } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  constructor(private firestore: Firestore) {}
  private solocitationInfoTourism = collection(this.firestore, 'turismo_info');
  private solicitationCollection = collection(this.firestore, 'solicitation');
  private solicitationCard = collection(this.firestore, 'card');

  async read(id: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;

    const q = query(this.solicitationCollection, where('userId', '==', id));
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
    label,
  }: any) {
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    const local = { lat: latitude, lon: longitude, label: label };

    await setDoc(doc(this.solicitationCollection), {
      abertura: currentDate,
      descricao: descricao,
      fechado: '--/--/----',
      icon: icon,
      local: local,
      status: 'Aberto',
      titulo: name,
      userId: uid,
      url: url,
    });
  }
}
