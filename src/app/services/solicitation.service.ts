import { Injectable } from '@angular/core';
import { getDocs, query, setDoc, where } from '@angular/fire/firestore';
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
 private solocitationInfoTourism = collection(this.firestore,'turismo_info')
 private solicitationCollection = collection(this.firestore,'Solicitation');
 private solicitationCard = collection(this.firestore,'card');


async read(){
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid

  const q = query(this.solicitationCollection, where('userId','==',`TGbgy45lQcXdFOQVlI025sUQNG02`))
  return await getDocs(q);

}

async info(){
  const i = query(this.solocitationInfoTourism)
  return await getDocs(i)
}

async card(){
  const q = query(this.solicitationCard);
  return await getDocs(q)

}

async create(descricao:string, location:any[] = [], icon: string, name: string){
  console.log('chamado');
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid
  const currentDate = format(new Date(), 'dd/MM/yyyy');

  await setDoc(doc(this.solicitationCollection),{
    abertura:currentDate,
    descricao:descricao,
    fechado:'--/--/----',
    icon:icon,
    local:location,
    status:'Aberto',
    titulo:name,
    userId: uid,

  });

}

}
