import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
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
  carForm: FormGroup;
  selectedFile: File = null;
  fb2 = "";
  downloadURL: Observable<string>;
  blockButton;

  constructor(
    public fb: FormBuilder,
    public db: DatabaseService,
    private storage: AngularFireStorage,
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.blockButton = false;

    this.carForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      year: [new Date, Validators.required],
    })
  }

  handleSubmit(): void {
    this.auth.user$.subscribe(resp => {
      this.db.createCar(this.carForm.value, this.fb2, resp.uid).then(() => {
        this.router.navigate(['/'])
      }
      )
    })
  }

  onFileSelected(event) {
    this.blockButton = true;
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
              this.blockButton = false;
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
