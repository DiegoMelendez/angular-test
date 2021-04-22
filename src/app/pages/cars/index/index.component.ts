import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-index-car',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexCarComponent implements OnInit {
  cars

  constructor(
    public db: DatabaseService,
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
          image_url: image
        }
      })
    })
  }

}
