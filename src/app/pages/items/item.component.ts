import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from '../../models/item.model';
import { Producto } from '../../models/producto.model';
import { Orden } from '../../models/orden.model';
import { ItemService } from '../../services/item.service';
import { ProductoService } from '../../services/producto.service';
import { OrdenService } from '../../services/orden.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  forma: FormGroup;

  producto : Producto;
  productos: Producto[] = [];
  ordenes: Orden[] = [];
  desde: number = 0;
  cargando: boolean = true;
  constructor(  public _itemService: ItemService, 
                public _productoService: ProductoService,
                public _ordenService: OrdenService ) { }

  ngOnInit() {

    this.forma = new FormGroup({

      num_linea: new FormControl( null, Validators.required),
      cantidad: new FormControl( null, Validators.required),
      orden: new FormControl(null, Validators.required),
      precio: new FormControl( null, Validators.required),
      producto: new FormControl( null, Validators.required),
      
      
      
      
    });

    this.forma.setValue({
      num_linea:'1',
      cantidad:1,
      orden:'5ec47d02c1ff4a28882fcd9c',
      precio:1000,
      producto:'5ec539238cc2ee476c07a2e3',
      
      
      
    })

    this.CargarProductos()
    this.CargarOrdenes()

  }

  CargarOrdenes(){

    this.cargando = true;

    this._ordenService.cargarOrdenes(this.desde)
        .subscribe((resp: any)=> {
            
            this.ordenes = resp.ordenes;
            this.cargando = false;
        })
  }


  CargarProductos(){

    this.cargando = true;

    this._productoService.cargarProductos(this.desde)
        .subscribe((resp: any)=> {
            
            this.productos = resp.productos;
            this.cargando = false;
        })
  }

  calcularPrecio(e) {
    
    console.log(e.target.value);
    //this.producto.setValue(e.target.value, {
    //  onlySelf: true
    // })
  }

  registrarItem(){
    if (!this.forma.valid ){
      return;
    }
    

    let item = new Item(
      this.forma.value.num_linea,
      this.forma.value.cantidad,
      
    
      this.forma.value.precio,
      this.forma.value.orden,
      this.forma.value.producto,
     
    );

    this._itemService.crearItem(item)
     .subscribe( resp => {
       console.log (resp );
      // this.router.navigate(['/login']);
     })
     // console.log ('forma valida', this.forma.valid );
     //console.log (this.forma.value);
  }
}
