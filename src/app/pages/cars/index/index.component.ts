import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { RentComponent } from './../../../components/rent/rent.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index-car',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexCarComponent implements OnInit {
  cars

  constructor(
    public db: DatabaseService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.db.getCars().subscribe(resp => {
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
          rented_by:e.payload.doc.data().rented_by,
          image_url: image,
          id: e.payload.doc.id
        }
      })
    })
  }

  handleRent(id, name) {
    this.dialog.open(RentComponent, {
      data: {
        id: id,
        name: name
      }
    });
  }

}
