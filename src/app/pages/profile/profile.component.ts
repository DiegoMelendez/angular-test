import { RentComponent } from './../../components/rent/rent.component';
import { AuthService } from './../../services/auth.service';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cars = undefined;
  myCars = undefined;
  history = [];
  displayedColumns: string[] = ['car_name', 'rented_from', 'rented_to'];

  constructor(
    public db: DatabaseService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(resp => {

      this.db.getRentedCars(resp.uid).subscribe(resp => {
        if(resp.length > 0)
        this.cars = resp.map((e: any) => {
          let image = e.payload.doc.data().image_url;
          if (e.payload.doc.data().image_url == "") {
            image = "https://firebasestorage.googleapis.com/v0/b/angular-test-212ef.appspot.com/o/angular-test%2Funnamed.png?alt=media&token=b7ceecb0-504d-4879-a143-9e774b26f5d4"
          }
          return {
            name: e.payload.doc.data().name,
            description: e.payload.doc.data().description,
            year: e.payload.doc.data().year,
            available: e.payload.doc.data().available,
            rented_by: e.payload.doc.data().rented_by,
            price: e.payload.doc.data().price,
            image_url: image,
            id: e.payload.doc.id
          }
        })
      })

      this.db.getMyCars(resp.uid).subscribe(resp => {
        if(resp.length > 0)
        this.myCars = resp.map((e: any) => {
          let image = e.payload.doc.data().image_url;
          if (e.payload.doc.data().image_url == "") {
            image = "https://firebasestorage.googleapis.com/v0/b/angular-test-212ef.appspot.com/o/angular-test%2Funnamed.png?alt=media&token=b7ceecb0-504d-4879-a143-9e774b26f5d4"
          }
          return {
            name: e.payload.doc.data().name,
            description: e.payload.doc.data().description,
            year: e.payload.doc.data().year,
            available: e.payload.doc.data().available,
            rented_by: e.payload.doc.data().rented_by,
            price: e.payload.doc.data().price,
            image_url: image,
            id: e.payload.doc.id
          }
        })
      })

      this.db.getHistory(resp.uid).subscribe(resp => {
        if(resp.length > 0)
        this.history = resp.map((e: any) => {
          return {
            car_name: e.payload.doc.data().car_name,
            rented_from: moment(e.payload.doc.data().rented_from.toDate()).format('hh:mm A MM/DD/YYYY'),
            rented_to: moment(e.payload.doc.data().rented_to.toDate()).format('hh:mm A MM/DD/YYYY'),
          }
        })
      })

    })
  }

}
