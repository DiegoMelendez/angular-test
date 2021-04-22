import { Router } from '@angular/router';
import { ImageService } from './../../../services/image.service';
import { DatabaseService } from './../../../services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-create-car',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateCarComponent implements OnInit {
  title = "Agrega un vehiculo"
  carForm: FormGroup;
  selectedFile: File = null;
  fb2 = "";
  downloadURL: Observable<string>;

  constructor(
    public fb: FormBuilder,
    public db: DatabaseService,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      year: [new Date, Validators.required],
    })
  }

  handleSubmit(): void {
    this.db.createCar(this.carForm.value, this.fb2).then(() => {
      this.router.navigate(['/cars'])
    }
    )
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `angular-test/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`angular-test/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb2 = url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
