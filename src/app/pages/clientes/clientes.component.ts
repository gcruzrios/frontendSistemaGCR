import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { URL_SERVICIOS } from '../../config/config';
import  swal from 'sweetalert';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _clienteService: ClienteService) { }

  ngOnInit() {
    this.CargarClientes();
  }
  
  CargarClientes(){

    this.cargando = true;

    this._clienteService.cargarClientes(this.desde)
        .subscribe((resp: any)=> {
            //console.log (resp);
            this.totalRegistros = resp.total;
            this.clientes = resp.clientes;
            this.cargando = false;
        })
  }

}
