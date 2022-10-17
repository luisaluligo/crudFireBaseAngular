import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireStore:AngularFirestore) { }

  create_NewStudent(record:{}){
    return this.fireStore.collection('estudiante').add(record);
  }

  read_Student(){
    return this.fireStore.collection('estudiante').snapshotChanges();
  }

  update_Student(record:{},id:String){
    return this.fireStore.doc('estudiante/'+id).update(record);
  }

  delete_Student(id:String){
    //this.fireStore.collection('estudiante').doc(id).delete();
    return this.fireStore.doc('estudiante/'+id).delete();
  }
}
