import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipesModule } from '../pipes/pipes.module';

import { CategoriasComponent } from './categorias/categorias.component';

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
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item.component';

@NgModule({
    declarations: [
      
      DashboardComponent,
      
      
      CategoriasComponent,
      
      ProductosComponent,
      OrdenesComponent,
      OrdenComponent,
      ClientesComponent,
      ClienteComponent,
      ProductoComponent,
      UsuariosComponent,
      UsuarioComponent,
      ProfileComponent,
      ItemsComponent,
      ItemComponent,
      
      
    ],
    imports: [
      CommonModule,
      FormsModule,
      PipesModule,
      ReactiveFormsModule,
      PAGES_ROUTES,
    ],
    providers: [],
    //bootstrap: [AppComponent]
  })
  export class PagesModule { }
  