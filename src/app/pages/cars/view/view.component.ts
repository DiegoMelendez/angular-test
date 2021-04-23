import { RentComponent } from './../../../components/rent/rent.component';
import { AuthService } from './../../../services/auth.service';
import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-car',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewCarComponent implements OnInit {
  car;
  id;
  owner;
  constructor(
    public db: DatabaseService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.db.getCar(this.id).subscribe(resp => {
      this.car = resp.data()
      this.db.getUser(this.car.created_by).subscribe(resp => {
        this.owner = resp.data();
      })
      if (this.car.image_url == "") {
        this.car.image_url = "https://firebasestorage.googleapis.com/v0/b/angular-test-212ef.appspot.com/o/angular-test%2Fno-image.jpg?alt=media&token=9a38bf3c-2078-4e36-a699-f0f0941a9a8c"
      }
    })
  }

  handleRent() {
    const dialogRef = this.dialog.open(RentComponent, {
      data: {
        id: this.id,
        name: this.car.name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.db.getCar(this.id).subscribe(resp => {
        this.car = resp.data()
        if (this.car.image_url == "") {
          this.car.image_url = "https://firebasestorage.googleapis.com/v0/b/angular-test-212ef.appspot.com/o/angular-test%2Fno-image.jpg?alt=media&token=9a38bf3c-2078-4e36-a699-f0f0941a9a8c"
        }
      })
    });
  }

  handleDelete() {
    const dialogRef = this.dialog.open(DialogDelete);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.db.deleteCar(this.id).then(() => {
          this.router.navigate(['/'])
        })
      }
    });
  }

  handleDeliver() {
    const dialogRef = this.dialog.open(DialogDeliver);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.db.deliverCar(this.id).then(() => {
          this.db.getCar(this.id).subscribe(resp => {
            this.car = resp.data()
            if (this.car.image_url == "") {
              this.car.image_url = "https://firebasestorage.googleapis.com/v0/b/angular-test-212ef.appspot.com/o/angular-test%2Fno-image.jpg?alt=media&token=9a38bf3c-2078-4e36-a699-f0f0941a9a8c"
            }
          })
        })
      }
    });
  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {
}


@Component({
  selector: 'dialog-deliver',
  templateUrl: 'dialog-deliver.html',
})
export class DialogDeliver {
}
