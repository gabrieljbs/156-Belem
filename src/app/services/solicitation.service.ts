import { Injectable } from '@angular/core';
import { collectionData, docData, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';
import { format } from 'date-fns'

@Injectable({
  providedIn: 'root'
})
export class SolicitationService {

  constructor(
    private firestore: Firestore
  ) { }
 private solicitationCollection = collection(this.firestore,'Solicitation');
 private solicitationCard = collection(this.firestore,'card');


async read(){
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid

  const q = query(this.solicitationCollection, where('userId','==',`${uid}`))
  return await getDocs(q);

}

async card(){
  const q = query(this.solicitationCard);
  return await getDocs(q)

}

async create(){
  console.log('chamado');
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid
  const currentDate = format(new Date(), 'dd/MM/yyyy');

  await setDoc(doc(this.solicitationCollection),{
    abertura:currentDate,
    descricao:'',
    fechado:'--/--/----',
    icon:'',
    local:'',
    status:'Aberto',
    titulo:'',
    userId: uid,


  });


}


}
