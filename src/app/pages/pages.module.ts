import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipesModule } from '../pipes/pipes.module';

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
import { UsuarioComponent } from './usuarios/usuario.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
      
      DashboardComponent,
      
      
      CategoriasComponent,
      CategoriaComponent,
      ProductosComponent,
      OrdenesComponent,
      OrdenComponent,
      ClientesComponent,
      ClienteComponent,
      ProductoComponent,
      UsuariosComponent,
      UsuarioComponent,
      ProfileComponent,
      
      
    ],
    imports: [
      CommonModule,
      FormsModule,
      PipesModule,
      
      PAGES_ROUTES,
    ],
    providers: [],
    //bootstrap: [AppComponent]
  })
  export class PagesModule { }
  