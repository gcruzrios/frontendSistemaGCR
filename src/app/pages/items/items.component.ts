import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
//import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Producto } from '../../models/producto.model';
import { Item } from '../../models/item.model';
import { Orden } from '../../models/orden.model';
import { ItemService } from '../../services/item.service';
import { ProductoService } from '../../services/producto.service';
import { OrdenService } from '../../services/orden.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  producto : Producto;
  productos: Producto[] = [];
  items : Item[] = [];
  item : Item = new Item( '', 1, 0, '', '');
  precio : number = 0;
  ordenes: Orden[] = [];
  Item : Object = {
    num_linea:"1",
    cantidad: 0,
    precio:0,
    producto:"",
    orden:""
    
  }
  
  desde: number = 0;
  cargando: boolean = true;

  constructor( public _modalUploadService: ModalUploadService,
               public _productoService: ProductoService,
               public _ordenService: OrdenService,
               public _itemService: ItemService) { }

  ngOnInit() {
    //this.cerrarModal();
    this.CargarProductos()
    this.CargarOrdenes()
  }

  cerrarModal(){
     this._modalUploadService.ocultarModal();
  }

  CargarProductos(){

    this.cargando = true;

    this._productoService.cargarProductos(this.desde)
        .subscribe((resp: any)=> {
            
            this.productos = resp.productos;
            this.cargando = false;
        })
  }


  CargarOrdenes(){

    this.cargando = true;

    this._ordenService.cargarOrdenes(this.desde)
        .subscribe((resp: any)=> {
            
            this.ordenes = resp.ordenes;
            this.cargando = false;
        })
  }

  CalcularPrecio(id:string, cantidad:number){
    console.log('idProducto', id);
    this._productoService.cargarProducto(id)
    .subscribe(producto => {
         
          this.producto  = producto;
          this.precio = this.producto.precio * cantidad;
          console.log('precio total',this.precio);
          //this.Item = this.precio;
          return this.precio;
     });

   
  }

  guardar(forma: NgForm){
    // console.log("formulario posteado");
     console.log("ngForm", forma);
     console.log("Valor", forma.value);
 
     console.log("Item", this.item);

     
     this._itemService.crearItem(this.item);

   }

}

