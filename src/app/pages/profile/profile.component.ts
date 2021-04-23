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
            image = "https://firebasestorage.googleapis.com/v0/b/angular-test-212ef.appspot.com/o/angular-test%2Fno-image.jpg?alt=media&token=9a38bf3c-2078-4e36-a699-f0f0941a9a8c"
          }
          return {
            name: e.payload.doc.data().name,
            description: e.payload.doc.data().description,
            year: e.payload.doc.data().year,
            available: e.payload.doc.data().available,
            rented_by: e.payload.doc.data().rented_by,
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
            image = "https://firebasestorage.googleapis.com/v0/b/angular-test-212ef.appspot.com/o/angular-test%2Fno-image.jpg?alt=media&token=9a38bf3c-2078-4e36-a699-f0f0941a9a8c"
          }
          return {
            name: e.payload.doc.data().name,
            description: e.payload.doc.data().description,
            year: e.payload.doc.data().year,
            available: e.payload.doc.data().available,
            rented_by: e.payload.doc.data().rented_by,
            image_url: image,
            id: e.payload.doc.id
          }
        })
      })

      this.db.getHistory(resp.uid).subscribe(resp => {
        console.log(resp)
        if(resp.length > 0)
        this.history = resp.map((e: any) => {
          return {
            car_name: e.payload.doc.data().car_name,
            rented_from: moment(e.payload.doc.data().rented_from.toDate()).format('hh:mm A MM/DD/YYYY'),
            rented_to: moment(e.payload.doc.data().rented_to.toDate()).format('hh:mm A MM/DD/YYYY'),
          }
        })
        console.log(this.history)
      })

    })
  }

}
