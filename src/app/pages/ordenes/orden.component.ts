import { Component, OnInit } from '@angular/core';

import { OrdenService } from '../../services/orden.service';
import { ItemService } from '../../services/item.service';
import { ProductoService } from '../../services/producto.service';

import { NgForm } from '@angular/forms';
import { Item } from '../../models/item.model';
import { Orden } from '../../models/orden.model';
import { Producto } from '../../models/producto.model';

import { Router, ActivatedRoute } from '@angular/router';

import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  totalR: number = 0; 
  items: Item[] = [];
  productos: Producto[] = [];

  orden : Orden = new Orden( '', 0, 0, new Date(), '', '', '');
  desde: number = 0;
  
  totalAmount:number = 0;
  totalQuantity:number = 0;

  sum:number =0;  
  value: Item[] = [];  
  
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _ordenService: OrdenService,
              public _itemService: ItemService,
              public _modalUploadService : ModalUploadService,
              public _productoService: ProductoService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe( params => {
      let id = params['id'];

      if (id !== 'nuevo'){
        this.CargarOrden(id);
        this.CargarItems(id);
        
      }
     });

  
   }

  

  ngOnInit() {
   this.CargarProductos();
  }

  getTotal(items, calculationProperty: string) {
   
    
    if(typeof items !== 'undefined') {
      //console.log('en get total después de if undefined');
      return items.reduce((total, item) => {
              
        return total + item[calculationProperty];
        
      }, 0); 
    }
    return 0;
  }

  CalcularTotal(id: string){

  }

  add(items){ 
    //console.log(items);
    this.sum = 0; 
    this.value= items 
    //console.log (this.value); 
    for(let j=0;j<items.length;j++){  
         this.sum+= this.value[j].precio;  
         }  
    //console.log(this.sum);     
    //this.totalAmount = this.sum; 
    return this.sum;   
  }  
  
  CargarOrden(id:string){
    //console.log('Estoy en cargar orden');
    this._ordenService.cargarOrden(id)
    .subscribe(orden => {
         
          this.orden  = orden;
     });

   
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
    
  
    guardarOrden (f: NgForm ){
   

    }

    guardar(orden: Orden, id_cliente: string, id_usuario: string){
    //console.log('metodo guardar del componente');
      
    this.orden.num_orden = orden.num_orden;
    this.orden.tipo = orden.tipo;
    this.orden.total = orden.total;
    this.orden.cliente= id_cliente;
    this.orden.usuario = id_usuario;

    // console.log(f.value);

    // if (f.invalid){
    //   return;

    // }

    this._ordenService.actualizarOrden(this.orden)
        .subscribe ( orden =>{
          
           this.orden._id = orden._id;

           this.router.navigate(['/orden', orden._id]);
           this.CargarOrden(orden._id)
        })
    
  }

  crearItem(id_orden: string){
    this._modalUploadService.mostrarModal('hospitales', id_orden)
  }

  borrarItem(item: Item, id_orden:string){
    this._itemService.borrarItem( item._id)
        .subscribe( () => this.CargarItems(id_orden));
    this.CargarItems(id_orden);
  }



   CargarItems(id:string){
     // console.log('Estoy en cargar items de orden');
      this._itemService.cargarItemsOrden(id)
        .subscribe((resp: any)=> {
            //console.log (resp);
            this.totalRegistros = resp.total;
            this.items = resp.items;
            this.cargando = false;
            //console.log(this.items); 
            this.totalAmount = this.add(this.items)
        })

     
   }

}
