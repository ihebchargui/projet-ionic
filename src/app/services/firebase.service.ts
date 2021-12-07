import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName='Etudiants';
  constructor(private firestore:AngularFirestore) { }
  creerEtudiant(id){
    return this.firestore.collection(this.collectionName).add(id); }
    afficherListe(){
      return this.firestore.collection(this.collectionName).snapshotChanges(); }
      updateEtudiant(id, element){
        this.firestore.doc(this.collectionName +'/'+id).update(element); }
        supprimerEtudiant(id){
          this.firestore.doc(this.collectionName +'/'+id).delete(); }
}
