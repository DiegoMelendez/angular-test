import { AuthService } from './../../../services/auth.service';
import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCarComponent implements OnInit {
  id;
  carForm: FormGroup;
  selectedFile: File = null;
  fb2 = "";
  downloadURL: Observable<string>;
  blockButton;
  constructor(
    public db: DatabaseService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router,
    public auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.blockButton = false;

    this.id = this.route.snapshot.paramMap.get('id');
    this.db.getCar(this.id).subscribe(resp => {
      let car;
      car = resp.data()
      if (car.image_url == "") {
        this.fb2 = "https://firebasestorage.googleapis.com/v0/b/angular-test-212ef.appspot.com/o/angular-test%2Fno-image.jpg?alt=media&token=9a38bf3c-2078-4e36-a699-f0f0941a9a8c"
      } else {
        this.fb2 = car.image_url
      }
      this.carForm = this.fb.group({
        name: [car.name, Validators.required],
        description: [car.description, Validators.required],
        year: [car.year.toDate(), Validators.required],
      })
    })
  }

  handleSubmit(): void {
    this.db.updateCar(this.carForm.value, this.fb2, this.id).then(() => {
      this.router.navigate(['/cars/' + this.id])
    }
    )
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
