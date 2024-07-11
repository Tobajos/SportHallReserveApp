import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Site/login/login.component';
import { HomeComponent } from './Site/home/home.component';
import { RegisterComponent } from './Site/register/register.component';
import { ProfileComponent } from './Site/profile/profile.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path: 'profile/:id', component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }