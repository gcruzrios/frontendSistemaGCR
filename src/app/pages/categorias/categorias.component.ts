import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

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

  crearCategoria(){
    
    swal({
      title:'Crear Categoria',
      text:'Ingrese el nombre de la Categoria',
      content: {element: "input" },
      //content:"input",
      //type: "input",
      icon: 'info',
      buttons:{cancel:true,confirm:true},
      
      //DangerMode: true,
    }).then ((valor:string )=>{

      if (!valor || valor.length ===0 ){
        return;
      }
      this._categoriaService.crearCategoria(valor)
        .subscribe(()=> this.CargarCategorias());
    });
  }

  
  guardarCategoria(categoria: Categoria){
    console.log(categoria);
    this._categoriaService.actualizarCategoria( categoria )
        .subscribe(); 
        console.log("Estoy en guardar Categoria");  
    // .subscribe(()=> this.cargarHospitales());
  }


  
  borrarCategoria(categoria: Categoria){
   swal({
      title: 'Está seguro?',
      text: 'Va a borrar la siguiente categoría : ' + categoria.nombre,
      icon: 'warning',

      buttons:{cancel:true,confirm:true},
      //buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      console.log(borrar);
      if (borrar) {

        this._categoriaService.borrarCategoria( categoria._id)
        .subscribe( () => this.CargarCategorias());
      
      }
    });


  }
}
