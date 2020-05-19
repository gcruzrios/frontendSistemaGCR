import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    children :[
        {path: 'dashboard', component: DashboardComponent},
        {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
    ]
  },
  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  
  {path: '**',  component: NopagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})

//export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true});
export class AppRoutingModule { }

