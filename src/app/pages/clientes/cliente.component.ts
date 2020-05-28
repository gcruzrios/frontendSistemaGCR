import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';


import { Cliente } from '../../models/cliente.model';


import { NgForm } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cliente_id: string = ''
  totalR: number = 0; 
  


  clientes: Cliente[] = [];
  
  cliente : Cliente = new Cliente( '','','','','TIPO','');


  desde: number = 0;
  
   
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _clienteService: ClienteService,
    
    public router: Router,
    public _modalUploadService : ModalUploadService,
    public activatedRoute: ActivatedRoute) { 

      activatedRoute.params.subscribe( params => {
        let id = params['id'];
        
        if (id !== 'nuevo'){
          //this.CargarCategorias();
          this.CargarCliente(id);
          this.cliente_id= id; 
        }else{
         
          //this.CargarCategorias();
          this.cliente_id='nuevo';
        }
       });


    }

  ngOnInit() {
  }

  CargarCliente(id:string){
    //console.log('Estoy en cargar orden');
    this._clienteService.cargarCliente(id)
    .subscribe(cliente => {
         
          this.cliente  = cliente;
     });

   
  }

  guardarNuevo (f: NgForm){
    console.log(f.value);
    if (f.invalid){
      return;
    }
    console.log(this.cliente);
    this._clienteService.crearCliente(this.cliente)

        .subscribe ( cliente =>{
          
            this.cliente._id = cliente._id;

            this.router.navigate(['/clientes']);


        })

  }



  guardarProducto(cliente: Cliente){
    console.log(cliente);
    this._clienteService.actualizarCliente( cliente )
        .subscribe(); 
        console.log("Estoy en guardar Cliente");  
    // .subscribe(()=> this.cargarHospitales());
  }

  guardar(f: NgForm){
    console.log(f.value);
    if (f.invalid){
      return;
    }
    console.log(this.cliente);
    this._clienteService.actualizarCliente(this.cliente)

        .subscribe ( producto =>{

            this.router.navigate(['/clientes']);


        })

  }

}
