import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

//APP_ROUTES
import { PagesModule } from './pages/pages.module';

import { PagesComponent } from './pages/pages.component';
import { PipesModule } from './pipes/pipes.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { ImagenPipe } from './pipes/imagen.pipe';

import { ServicesModule} from './services/services.module';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    NopagefoundComponent,
    
    RegisterComponent,
    PagesComponent,
    ModalUploadComponent,
    //ImagenPipe
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    PagesModule,
    CommonModule,
    PipesModule,
  ],
  providers: [],
  exports:[
    //ImagenPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
