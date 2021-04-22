import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
  }

  createCar(data, url, user_id) {
    return this.afs
      .collection("cars")
      .add({
        name: data.name,
        description: data.description,
        year: data.year,
        image_url: url,
        created_by: user_id,
        rented_by: null,
        rented_for: null,
        created_at: Timestamp.fromDate(new Date())
      })
  }

  updateCar(data, url, id) {
    return this.afs
      .collection("cars")
      .doc(id)
      .update({
        name: data.name,
        description: data.description,
        year: data.year,
        image_url: url,
      })
  }

  getCars() {
    return this.afs.collection('cars').snapshotChanges()
  }

  getCar(id) {
    return this.afs.collection('cars').doc(id).get()
  }

  deleteCar(id) {
    return this.afs.collection('cars').doc(id).delete()
  }

}
