import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
  }

  createCar(data, url) {
    return this.afs
      .collection("cars")
      .add({
        name: data.name,
        description: data.description,
        year: data.year,
        image_url: url
      })
  }

  getCars(){
    return this.afs.collection('cars').snapshotChanges()
  }

}
