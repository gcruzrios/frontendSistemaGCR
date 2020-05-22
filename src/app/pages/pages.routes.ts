import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categorias/categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenComponent } from './ordenes/orden.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginGuardGuard } from '../services/guards/login.guard';
import { ProfileComponent } from './profile/profile.component';

//import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/services.index';


const pagesRoutes: Routes = [

            {path:'dashboard', component: DashboardComponent, canActivate:[LoginGuardGuard], data:{ titulo: 'Dashboard Listo'}},
            //{path:'dashboard', component: DashboardComponent, canActivate:[VerificaTokenGuard], data:{ titulo: 'Dashboard'}},
            {path:'categorias', component: CategoriasComponent, canActivate:[LoginGuardGuard], data:{ titulo: 'Mantenimiento de Categorias'}},
            {path:'clientes', component: ClientesComponent , canActivate:[LoginGuardGuard], data:{ titulo: 'Mantenimiento de Clientes'}},
            {path:'productos', component: ProductosComponent, canActivate:[LoginGuardGuard], data:{ titulo: 'Mantenimiento de Productos'}},
            {path:'ordenes', component: OrdenesComponent,  canActivate:[LoginGuardGuard],data:{ titulo: 'Mantenimiento de Ordenes'}},
            
            //Mantenimientos
            //{path:'usuarios', component: UsuariosComponent, canActivate:[ AdminGuard], data:{ titulo: 'Mantenimiento de Usuarios'}},
            {path:'usuarios', component: UsuariosComponent, canActivate:[LoginGuardGuard], data:{ titulo: 'Mantenimiento de Usuarios'}},
            {path:'profile', component: ProfileComponent, canActivate:[LoginGuardGuard], data:{ titulo: 'Actualización de Usuarios'}},

            {path:'categoria/:id', component: CategoriaComponent, canActivate:[LoginGuardGuard], data:{ titulo: 'Actualización de Categoria'}},
            {path:'producto/:id', component: ProductoComponent, canActivate:[LoginGuardGuard], data:{ titulo: 'Actualización de Productos'}},
            {path:'cliente/:id', component: ClienteComponent, canActivate:[LoginGuardGuard], data:{ titulo: 'Actualización de Cliente'}},
            {path:'orden/:id', component: OrdenComponent,  canActivate:[LoginGuardGuard], data:{ titulo: 'Actualización de Orden'}},
            {path:'', redirectTo: '/dashboard', pathMatch: 'full'}

    // {
    //     path:'',
    //     component: PagesComponent,
    //     canActivate:[LoginGuardGuard],
    //     children:[

    
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);