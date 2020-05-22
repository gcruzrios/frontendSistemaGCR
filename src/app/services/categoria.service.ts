import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria.model';
import { URL_SERVICIOS } from '../config/config';
import  swal from 'sweetalert';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoria: Categoria;
  token:string;
  menu: any = [];

  constructor(public http: HttpClient,
              public router: Router) { }

  cargarCategorias(desde: number = 0){

    let url =URL_SERVICIOS +'/categoria?desde='+ desde;

    return this.http.get(url);
  }
 
  CargarCategoria( id: string ){

    let url =URL_SERVICIOS +'/categoria/' + id;
        url += '?token=' + this.token;

      return this.http.get(url)
        
  }

  crearCategoria( categoria: Categoria){
    let url = URL_SERVICIOS + '/categoria';
    return this.http.post(url, categoria)
      .map( (resp: any) =>{

          swal('Categoria creado', categoria.nombre, 'success')
          return resp.categoria;

      })
      .catch( err =>{

        ///console.log (err.error.mensaje);
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  actualizarCategoria(categoria: Categoria){

  let url = URL_SERVICIOS + '/categoria/' + categoria._id;
  url += '?token='+ this.token;
  //console.log ('url: '+ url);
  return this.http.put(url, categoria)
          .map( (resp:any) => {

            if (categoria._id === this.categoria._id){

              let categoriaDB: Categoria = resp.categoria;
              //this.guardarStorage(usuarioDB._id, this.token, usuarioDB)
            }
            swal('Categoria Actualizada', categoria.nombre, 'success' );
            return true;
            
          })
          .catch( err =>{

            ///console.log (err.error.mensaje);
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return Observable.throw(err);
          });
  

  }

  borrarCategoria( id: string ){

    let url =URL_SERVICIOS +'/categoria/' + id;
         url += '?token=' + this.token;
 
      return this.http.delete(url)
         .map(resp =>{
           swal('Categoria borrada', 'La categoría ha sido eliminada correctamente','success');
           return true;
         });
 
   }

}
