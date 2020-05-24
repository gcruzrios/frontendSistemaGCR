import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { URL_SERVICIOS } from '../config/config';
import  swal from 'sweetalert';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  cliente: Cliente;
  token:string;
 

  constructor(public http: HttpClient,public _usuarioService : UsuarioService,
              public router: Router) { }

  cargarClientes(desde: number = 0){

    let url =URL_SERVICIOS +'/cliente?desde='+ desde;

    return this.http.get(url);
  }
 
  cargarCliente( id: string ){

    let url =URL_SERVICIOS +'/cliente/' + id;
        url += '?token=' + this._usuarioService.token;

      return this.http.get(url)
         .map ((resp:any) => resp.cliente);
  }

  

  crearCliente( cliente: Cliente){
    let url = URL_SERVICIOS + '/cliente';
    return this.http.post(url, cliente)
      .map( (resp: any) =>{

          swal('Cliente creado', cliente.nombre, 'success')
          return resp.cliente;

      })
      .catch( err =>{

        ///console.log (err.error.mensaje);
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  actualizarCliente(cliente: Cliente){

  let url = URL_SERVICIOS + '/cliente/' + cliente._id;
  url += '?token='+ this._usuarioService.token;
  //console.log ('url: '+ url);
  return this.http.put(url, cliente)
          .map( (resp:any) => {

            if (cliente._id === this.cliente._id){

              let clienteDB: Cliente = resp.cliente;
              //this.guardarStorage(usuarioDB._id, this.token, usuarioDB)
            }
            swal('Cliente Actualizado', cliente.nombre, 'success' );
            return true;
            
          })
          .catch( err =>{

            ///console.log (err.error.mensaje);
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return Observable.throw(err);
          });
  

  }

  borrarCliente( id: string ){

    let url =URL_SERVICIOS +'/cliente/' + id;
         url += '?token=' + this._usuarioService.token;
 
      return this.http.delete(url)
         .map(resp =>{
           swal('Cliente borrado', 'El cliente ha sido eliminado correctamente','success');
           return true;
         });
 
   }

}
