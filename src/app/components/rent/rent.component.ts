import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from './../../services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  id: any,
  name:any
}
@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})

export class RentComponent implements OnInit {
  rentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RentComponent>,
    public fb: FormBuilder,
    public db: DatabaseService,
    private router: Router,
    public auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.rentForm = this.fb.group({
      from: [new Date, Validators.required],
      to: [new Date, Validators.required],
    })
  }

  handleSubmit(): void {
    console.log(this.data.id)

    this.auth.user$.subscribe(resp => {
      this.db.updateRentedCar(this.data.id, resp.uid, this.rentForm.value).then(() => {
        this.db.createRent(this.data.id, resp.uid, this.rentForm.value, this.data.name).then(() => {
          this.dialogRef.close();
        })
      })
    })
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

}
