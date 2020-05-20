//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { PagesComponent } from './pages.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categorias/categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenComponent } from './ordenes/orden.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { PAGES_ROUTES } from './pages.routes';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
    declarations: [
      
      DashboardComponent,
      
      //PagesComponent,
      CategoriasComponent,
      CategoriaComponent,
      ProductosComponent,
      OrdenesComponent,
      OrdenComponent,
      ClientesComponent,
      ClienteComponent,
      ProductoComponent,
      UsuariosComponent
      
    ],
    imports: [
      //BrowserModule,
      //AppRoutingModule,
      PAGES_ROUTES,
    ],
    providers: [],
    //bootstrap: [AppComponent]
  })
  export class PagesModule { }
  