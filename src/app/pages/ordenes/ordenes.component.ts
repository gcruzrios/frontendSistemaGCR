import { Component, OnInit } from '@angular/core';
import { Orden } from '../../models/orden.model';
import { OrdenService } from '../../services/orden.service';
import { URL_SERVICIOS } from '../../config/config';
import  swal from 'sweetalert';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  ordenes: Orden[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _ordenService: OrdenService) { }

  ngOnInit() {
    this.CargarOrdenes();
  }
  
  CargarOrdenes(){

    this.cargando = true;

    this._ordenService.cargarOrdenes(this.desde)
        .subscribe((resp: any)=> {
            console.log (resp);
            this.totalRegistros = resp.total;
            this.ordenes = resp.ordenes;
            this.cargando = false;
        })
  }

  borrarOrden(orden: Orden){
   


    swal({
      title: 'Está seguro?',
      text: 'Va a borrar la siguiente orden : ' + orden.num_orden,
      icon: 'warning',

      buttons:{cancel:true,confirm:true},
      //buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      console.log(borrar);
      if (borrar) {

        this._ordenService.borrarOrden( orden._id)
        .subscribe( () => this.CargarOrdenes());
      
      }
    });


}
}
