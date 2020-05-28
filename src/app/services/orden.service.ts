import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/orden.model';
import { URL_SERVICIOS } from '../config/config';
import  swal from 'sweetalert';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  orden: Orden;
  token:string;
  

  constructor(public http: HttpClient, public _usuarioService : UsuarioService,
              public router: Router) { }

  cargarOrdenes(desde: number = 0){

    let url =URL_SERVICIOS +'/orden?desde='+ desde;
    console.log(url);
    return this.http.get(url);
  }
 
  cargarOrden( id: string ){

    let url =URL_SERVICIOS +'/orden/' + id;
        url += '?token=' +  this._usuarioService.token;

      return this.http.get(url)
         .map ((resp:any) => resp.orden);
  }

  

  crearOrden( orden: Orden){
    let url = URL_SERVICIOS + '/orden';
    url += '?token=' +  this._usuarioService.token;

    return this.http.post(url, orden)
      .map( (resp: any) =>{

          swal('Orden creado', orden.num_orden, 'success')
          return resp.orden;

      })
      .catch( err =>{

        ///console.log (err.error.mensaje);
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  actualizarOrden(orden: Orden){

  let url = URL_SERVICIOS + '/orden/' + orden._id;
  url += '?token='+ this._usuarioService.token;
  console.log ('url: '+ url);
  console.log (orden);
  return this.http.put(url, orden)
          .map( (resp:any) => {
            
            swal('Orden Actualizada', orden.num_orden, 'success' );
            //return true;
            return resp.orden;
            
          })
          .catch( err =>{
            console.log(err.error);
            console.log (err.error.mensaje);
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return Observable.throw(err);
          });
  

  }

  borrarOrden( id: string ){

    let url =URL_SERVICIOS +'/orden/' + id;
         url += '?token=' +  this._usuarioService.token;
 
      return this.http.delete(url)
         .map(resp =>{
           swal('Orden borrada', 'La orden ha sido eliminada correctamente','success');
           return true;
         });
 
   }
}
