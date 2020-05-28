import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { URL_SERVICIOS } from '../config/config';
import  swal from 'sweetalert';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from './usuario.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  item: Item;
  token:string;
  

  constructor(public http: HttpClient, public _usuarioService : UsuarioService,
              public router: Router) { }

  
  
  cargarItems(){

    let url =URL_SERVICIOS +'/item';
    //console.log(url);
    return this.http.get(url);
  }
  
  cargarItemsOrden(orden: string ){

    let url =URL_SERVICIOS +'/item/orden/'+ orden;
    //console.log(url);
    return this.http.get(url);
  }
 
  cargarItem( id: string ){

    let url =URL_SERVICIOS +'/item/' + id;
        url += '?token=' +  this._usuarioService.token;

      return this.http.get(url)
         .map ((resp:any) => resp.orden);
  }

  


  crearItem( item: Item){
    //nombre : string
    if (!item._id){
      let url = URL_SERVICIOS + '/item';

      console.log('Estoy en crear item de Servicio');
      console.log(item);


      return this.http.post(url, item)
        .map( (resp: any) =>{

            swal('Item creado', item.num_linea, 'success')
            return resp.orden;

        })
        .catch( err =>{

          console.log (err.error.mensaje);
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return Observable.throw(err);
        });
      }
    }
 
    private _listeners = new Subject <any> ();
    listen(): Observable<any>{
        return this._listeners.asObservable();
    }
    filter(filterBy: string){
        this._listeners.next(filterBy);
    }
/*
crearItem( linea: string, nombre : string, id_orden:string, cantidad: number, precio: number ){
    //
    let url = URL_SERVICIOS + '/item';
    return this.http.post(url, { linea, nombre, id_orden, cantidad, precio })
      .map( (resp: any) =>{

          swal('Item creado', linea, 'success')
          console.log('Respuesta', resp);
          return resp.item;

      })
      .catch( err =>{

        ///console.log (err.error.mensaje);
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }
 */


  actualizarItem(item: Item){

  let url = URL_SERVICIOS + '/item/' + item._id;
  url += '?token='+  this._usuarioService.token;
  //console.log ('url: '+ url);
  return this.http.put(url, item)
          .map( (resp:any) => {

            if (item._id === this.item._id){

              let itemDB: Item = resp.item;
              //this.guardarStorage(usuarioDB._id, this.token, usuarioDB)
            }
            swal('Item Actualizado', item.num_linea, 'success' );
            return true;
            
          })
          .catch( err =>{

            ///console.log (err.error.mensaje);
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return Observable.throw(err);
          });
  

  }

  borrarItem( id: string ){

    let url =URL_SERVICIOS +'/item/' + id;
         url += '?token=' +  this._usuarioService.token;
      console.log(url);
      return this.http.delete(url)
         .map(resp =>{
           swal('Item borrado', 'El item ha sido eliminado correctamente','success');
           return true;
         });
 
   }
}
