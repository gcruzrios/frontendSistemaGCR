import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,  public _usuariosService : UsuarioService) { }

  ngOnInit() {
  }


  ingresar( forma: NgForm){

    console.log (forma);
    if (forma.invalid){

      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);
 
    this._usuariosService.login(usuario, forma.value.recuerdame)
        .subscribe( correcto => this.router.navigate(['/dashboard']) );
           
    //this.router.navigate(['/dashboard']);
   }
}
