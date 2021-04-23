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
        price: data.price,
        address: data.address,
        rented_by: null,
        rented_from: null,
        rented_to: null,
        available: true,
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
        price: data.price,
        address: data.address,
      })
  }

  getUser(id) {
    return this.afs.collection('users').doc(id).get()
  }

  getCars() {
    return this.afs.collection('cars', ref => ref.where('available', '==', true)).snapshotChanges()
  }

  getCarsUnavailable() {
    return this.afs.collection('cars', ref => ref.where('available', '==', false)).snapshotChanges()
  }

  getRentedCars(id) {
    return this.afs.collection('cars', ref => ref.where('rented_by', '==', id)).snapshotChanges()
  }

  getHistory(id) {
    return this.afs.collection('rents', ref => ref.where('rented_by', '==', id)).snapshotChanges()
  }

  getMyCars(id) {
    return this.afs.collection('cars', ref => ref.where('created_by', '==', id)).snapshotChanges()
  }

  getCar(id) {
    return this.afs.collection('cars').doc(id).get()
  }

  deleteCar(id) {
    return this.afs.collection('cars').doc(id).delete()
  }

  updateRentedCar(car_id, user_id, values) {
    return this.afs.collection('cars').doc(car_id).update({
      rented_by: user_id,
      rented_from: values.from,
      rented_to: values.to,
      available: false,
    })
  }

  createRent(car_id, user_id, values, car_name) {
    return this.afs.collection('rents').add({
      rented_by: user_id,
      rented_from: values.from,
      rented_to: values.to,
      car_id: car_id,
      car_name: car_name,
      created_at: Timestamp.fromDate(new Date())
    })
  }

  deliverCar(car_id) {
    return this.afs.collection('cars').doc(car_id).update({
      rented_by: null,
      rented_from: null,
      rented_to: null,
      available: true,
    })
  }

}
