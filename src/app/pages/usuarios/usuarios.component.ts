import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import  swal from 'sweetalert';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
     public _usuarioService: UsuarioService,
     //public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.CargarUsuarios();
    //this._modalUploadService.notificacion
    //  .subscribe (resp => this.CargarUsuarios() );
  }


  mostrarModal( id: string ){

    //  this._modalUploadService.mostrarModal('usuarios', id);

  }

  CargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe((resp: any)=> {
            //console.log (resp);
            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;
        })
  }

  cambiarDesde(valor: number){

    let desde = this.desde + valor;
    console.log (desde);

    if (desde >= this.totalRegistros){
      return;
    }

    if (desde < 0){
      return;
    }

    this.desde += valor;
    this.CargarUsuarios();

  }

  buscarUsuario (termino: string ){

    if (termino.length <= 0){
      this.CargarUsuarios();
      return;
    }
    this.cargando= true;
    //console.log(termino);
    this._usuarioService.buscarUsuarios(termino)
      .subscribe(( usuarios: Usuario[])=>{
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario (usuario: Usuario ){
    
    if(usuario._id === this._usuarioService.usuario._id ){
       swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
       return;
    }

    swal({
      title: 'Está seguro?',
      text: 'Va a borrar a : ' + usuario.nombre,
      icon: 'warning',

      buttons:{cancel:true,confirm:true},
      //buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      console.log(borrar);
      if (borrar) {

        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe( borrado =>{
                console.log(borrado);
                this.CargarUsuarios();
            });
      
      }
    });
    

  }
  guardarUsuario(usuario : Usuario){
     this._usuarioService.actualizarUsuario(usuario)
          .subscribe();
    } 


}
