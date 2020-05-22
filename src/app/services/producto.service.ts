import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { URL_SERVICIOS } from '../config/config';
import  swal from 'sweetalert';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  producto: Producto;
  token:string;
  menu: any = [];

  constructor(public http: HttpClient,
              public router: Router) { }

  cargarProductos(desde: number = 0){

    let url =URL_SERVICIOS +'/producto?desde='+ desde;

    return this.http.get(url);
  }
 
  cargarProducto( id: string ){

    let url =URL_SERVICIOS +'/producto/' + id;
        url += '?token=' + this.token;

      return this.http.get(url)
        
  }

  crearProducto( producto: Producto){
    let url = URL_SERVICIOS + '/producto';
    return this.http.post(url, producto)
      .map( (resp: any) =>{

          swal('Producto creado', producto.nombre, 'success')
          return resp.producto;

      })
      .catch( err =>{

        ///console.log (err.error.mensaje);
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  actualizarProducto(producto: Producto){

  let url = URL_SERVICIOS + '/producto/' + producto._id;
  url += '?token='+ this.token;
  //console.log ('url: '+ url);
  return this.http.put(url, producto)
          .map( (resp:any) => {

            if (producto._id === this.producto._id){

              let productoDB: Producto = resp.categoria;
              //this.guardarStorage(usuarioDB._id, this.token, usuarioDB)
            }
            swal('Producto Actualizado', producto.nombre, 'success' );
            return true;
            
          })
          .catch( err =>{

            ///console.log (err.error.mensaje);
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return Observable.throw(err);
          });
  

  }

  borrarProducto( id: string ){

    let url =URL_SERVICIOS +'/producto/' + id;
         url += '?token=' + this.token;
 
      return this.http.delete(url)
         .map(resp =>{
           swal('Producto borrado', 'El producto ha sido eliminada correctamente','success');
           return true;
         });
 
   }

}
