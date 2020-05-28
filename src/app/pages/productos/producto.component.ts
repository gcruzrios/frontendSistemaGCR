import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../../services/categoria.service';
import { ProductoService } from '../../services/producto.service';

import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';

import { NgForm } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';





@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  producto_id: string = ''
  totalR: number = 0; 
  


  productos: Producto[] = [];
  categorias: Categoria[] = [];
  producto : Producto = new Producto( '','','','SELECCIONE LA CATEGORIA','TIPO DE PRODUCTO', 0);


  desde: number = 0;
  
   
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor( public _productoService: ProductoService,
    public _categoriaService: CategoriaService,
    public router: Router,
    public _modalUploadService : ModalUploadService,
    public activatedRoute: ActivatedRoute) {

      activatedRoute.params.subscribe( params => {
        let id = params['id'];
        
        if (id !== 'nuevo'){
          this.CargarCategorias();
          this.CargarProducto(id);
          this.producto_id= id; 
        }else{
         
          this.CargarCategorias();
          this.producto_id='nuevo';
        }
       });

     }

  ngOnInit() {

    this._modalUploadService.notificacion
    .subscribe( ()=> this.CargarCategorias() );

    if (this.producto_id === 'nuevo'){
      this.CargarCategorias();
    }
  }


  CargarCategorias(){

    this.cargando = true;

    this._categoriaService.cargarCategorias(this.desde)
        .subscribe((resp: any)=> {
            //console.log (resp);
            this.totalRegistros = resp.total;
            this.categorias = resp.categorias;
            this.cargando = false;
        })
  }

  CargarProducto(id:string){
    //console.log('Estoy en cargar orden');
    this._productoService.cargarProducto(id)
    .subscribe(producto => {
         
          this.producto  = producto;
     });

   
  }

  guardarNuevo (f: NgForm){
    console.log(f.value);
    if (f.invalid){
      return;
    }
    console.log(this.producto);
    this._productoService.crearProducto(this.producto)

        .subscribe ( producto =>{
          
            this.producto._id = producto._id;

          //this.router.navigate(['/producto', producto._id]);
            this.router.navigate(['/productos']);


        })

  }



  guardarProducto(producto: Producto){
    console.log(producto);
    this._productoService.actualizarProducto( producto )
        .subscribe(); 
        console.log("Estoy en guardar Producto");  
    // .subscribe(()=> this.cargarHospitales());
  }

  guardar(f: NgForm){
    console.log(f.value);
    if (f.invalid){
      return;
    }
    console.log(this.producto);
    this._productoService.actualizarProducto(this.producto)

        .subscribe ( producto =>{
          
           // this.producto._id = producto._id;

          //this.router.navigate(['/producto', producto._id]);
            this.router.navigate(['/productos']);


        })

  }

}
