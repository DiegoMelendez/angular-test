import { EditCarComponent } from './pages/cars/edit/edit.component';
import { ViewCarComponent } from './pages/cars/view/view.component';
import { CreateCarComponent } from './pages/cars/create/create.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { IndexCarComponent } from './pages/cars/index/index.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: IndexCarComponent, canActivate: [AuthGuard]},
  { path: 'cars/create', component: CreateCarComponent, canActivate: [AuthGuard] },
  { path: 'cars/:id', component: ViewCarComponent },
  { path: 'cars/:id/edit', component: EditCarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
