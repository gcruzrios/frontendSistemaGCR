import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { URL_SERVICIOS } from '../../config/config';
import  swal from 'sweetalert';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _productoService: ProductoService) { }

  ngOnInit() {
    this.CargarProductos();
  }
  
  CargarProductos(){

    this.cargando = true;

    this._productoService.cargarProductos(this.desde)
        .subscribe((resp: any)=> {
            //console.log (resp);
            this.totalRegistros = resp.total;
            this.productos = resp.productos;
            this.cargando = false;
        })
  }

  


}
