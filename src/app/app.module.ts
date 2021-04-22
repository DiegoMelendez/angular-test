import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CreateCarComponent } from './pages/cars/create/create.component';
import { EditCarComponent } from './pages/cars/edit/edit.component';
import { ViewCarComponent, DialogDelete, DialogDeliver } from './pages/cars/view/view.component';
import { IndexCarComponent } from './pages/cars/index/index.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { RentComponent } from './components/rent/rent.component';

const config = {
  apiKey: "AIzaSyBZ36M3FIBjxxCz-F8Lx9ArG0nOnDRbe8U",
  authDomain: "angular-test-212ef.firebaseapp.com",
  projectId: "angular-test-212ef",
  storageBucket: "angular-test-212ef.appspot.com",
  messagingSenderId: "779743106121",
  appId: "1:779743106121:web:230ba8ee3690ddcbff9b98",
  measurementId: "G-9N4Z7V6KY5"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    CreateCarComponent,
    EditCarComponent,
    ViewCarComponent,
    IndexCarComponent,
    DialogDelete,
    RentComponent,
    DialogDeliver
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    HttpClientModule,
    AngularFireStorageModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
