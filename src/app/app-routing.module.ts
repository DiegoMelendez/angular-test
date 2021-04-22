import { CreateCarComponent } from './pages/cars/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { IndexCarComponent } from './pages/cars/index/index.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'cars', component: IndexCarComponent },
  { path: 'cars/create', component: CreateCarComponent, canActivate: [AuthGuard] },
  // { path: 'cars/:id', component: ViewProductComponent },
  // { path: 'cars/:id/edit', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
