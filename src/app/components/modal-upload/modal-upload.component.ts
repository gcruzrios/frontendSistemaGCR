import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import  swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { Item } from '../../models/item.model';

import { ItemService } from '../../services/item.service';
import { SubirArchivoService } from '../../services/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import { ProductoService } from '../../services/producto.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  //  oculto: string = '';
  forma: FormGroup;
  producto_id :string = '';
  imagenSubir: File;
  precio : number = 0;
  imagenTemp:string | ArrayBuffer;
  producto : Producto;
  productos: Producto[] = [];
  items : Item[] = [];
  item : Item = new Item( '', 1, 0, '', '');
  LineasItem : number=0;
 // cantidad : number =1;
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor (public _subirArchivoService : SubirArchivoService,
               public _productoService: ProductoService,
               public _itemService: ItemService,
               public router: Router,
               public activatedRoute: ActivatedRoute,
               public _modalUploadService: ModalUploadService) 
  {

    
   }

  ngOnInit() {
    this.forma = new FormGroup({

      
      cantidad: new FormControl( null, Validators.required),
      precio: new FormControl( null, Validators.required),
      producto: new FormControl( null, Validators.required),
      
      
      
      
    });

    this.forma.setValue({
     
      cantidad:1,
      precio:1000,
      producto:''
      
      
      
    })
    this.CargarProductos()

  }

 
  cerrarModal(){
    this.imagenTemp=null;
    this.imagenSubir = null;
    
    this._itemService.filter('Register click');
    this._modalUploadService.ocultarModal();
    
  }

  calcularPrecio(e) {
    
    //let productoID = e.target.value;
    let id_producto = e.target.value.split(': ')[1];
    console.log(id_producto);
    this.producto_id = id_producto;
    
    //console.log(productoID);
    this._productoService.cargarProducto(id_producto)
    .subscribe(producto => {
         
          this.producto  = producto;
          this.precio = this.producto.precio * this.forma.value.cantidad;
          console.log('precio total',this.precio);
          this.forma.controls['precio'].setValue(this.precio);
          //this.forma.value.precio = this.precio;
          return;
     });

    //this.CalcularPrecioProducto(id_producto, this.forma.value.cantidad)

    //this.producto.setValue(e.target.value, {
    //  onlySelf: true
    // })
  }

/*   seleccionImagen( archivo: File ){

    if (!archivo){
      this.imagenSubir = null;
      return;
    }
    
    if (archivo.type.indexOf('image') <0){
      swal('Sólo imágenes','El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    };


    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(archivo);
    
    var csv: string = reader.result as string;
    //var csv: string | ArrayBuffer = reader.result;
    reader.onloadend = () => this.imagenTemp  = reader.result;

           

  } */

/*   subirImagen(){
    //console.log('Tipo:',this._modalUploadService.tipo )

    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then (resp => {
        console.log( resp );
        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
      })
      .catch(err=>{
        console.log('Error en la carga...');
      });
  } */

  CargarProductos(){

    this.cargando = true;

    this._productoService.cargarProductos(this.desde)
        .subscribe((resp: any)=> {
            
            this.productos = resp.productos;
            this.cargando = false;
        })
  }

  CalcularPrecioProducto(id:string, cantidad:number){
    //console.log('Estoy en cargar orden');
    this._productoService.cargarProducto(id)
    .subscribe(producto => {
         
          this.producto  = producto;
          this.precio = this.producto.precio * cantidad;
          //console.log('precio total',this.precio);
          this.forma.value.precio = this.precio;
          return;
     });

   
  }

  

  CuantasLineasItem(){
    
    this._itemService.cargarItems()
        .subscribe((resp: any)=> {
            //console.log (resp);
            this.totalRegistros = resp.total;
            this.items = resp.items;
            this.cargando = false;
            this.totalRegistros = this.totalRegistros + 1;
            console.log(this.totalRegistros);
            return;
        })
     
   
  }

  GuardarProducto(){
    this.CalcularPrecioProducto(this.item.producto,this.item.cantidad);
    this.CuantasLineasItem();

    this.item.num_linea = this.totalRegistros.toString();
    this.item.cantidad = this.item.cantidad;
    this.item.orden = this._modalUploadService.id;
    this.item.precio = this.precio;
    this.item.producto = this.item.producto;

    console.log('precio total',this.precio);
    console.log('Cant lineas', this.totalRegistros.toString())
    console.log('producto', this.item.producto);
    console.log('cantidad', this.item.cantidad);
    console.log('orden', this._modalUploadService.id);
    

    this._itemService.crearItem(this.item);
    //this._itemService.crearItem(this.item.num_linea, this.item.producto,this._modalUploadService.id,this.item.cantidad,this.precio);
    this.cerrarModal();
      
  }

  registrarItem(){

    this.CuantasLineasItem();

    if (!this.forma.valid ){
      return;
    }
    

    let item = new Item(
      //this.forma.value.num_linea,
      this.totalRegistros.toString(),
      this.forma.value.cantidad,
      this.forma.value.precio,
      //this.forma.value.orden,
      this._modalUploadService.id,
      this.forma.value.producto,
     
    );

    this._itemService.crearItem(item)
     .subscribe( resp => {
       console.log (resp );
      // this.router.navigate(['/login']);
     })
     // console.log ('forma valida', this.forma.valid );
     //console.log (this.forma.value);
     this.router.navigate(['/orden', this._modalUploadService.id]);
     this.cerrarModal();
     
  }

}
