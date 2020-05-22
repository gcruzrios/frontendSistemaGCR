import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { URL_SERVICIOS } from '../../config/config';
import  swal from 'sweetalert';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _categoriaService: CategoriaService) { }

  ngOnInit() {
    this.CargarCategorias();
  }
  
  CargarCategorias(){

    this.cargando = true;

    this._categoriaService.cargarCategorias(this.desde)
        .subscribe((resp: any)=> {
            //console.log (resp);
            this.totalRegistros = resp.total;
            this.categorias = resp.categorias;
            this.cargando = false;
        })
  }
}
