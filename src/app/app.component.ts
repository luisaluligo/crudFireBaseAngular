import { Component,OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'projectmongo';
  estudiante:any;
  estudianteNombre:String='';
  estudianteEdad:number=0;
  estudianteDireccion:String='';
  estudianteId:String='';
  modoUpdate:boolean=false;
  modoConsulta:boolean=true;
  cancelar:string="cancelar";
  constructor(private crudService:CrudService){}

  ngOnInit(){
    this.crudService.read_Student().subscribe(data=>{
      this.estudiante = data.map(e=>{
        return {
          id:e.payload.doc.id,
          data:e.payload.doc.data()
        };
      })
    })
  }

  createRecord(){
    let record = {
      nombre: this.estudianteNombre,
      edad:this.estudianteEdad,
      direccion: this.estudianteDireccion
    };

    this.crudService.create_NewStudent(record).then(resp=>{
      Swal.fire('Guardado!', 'Se creo el estudiante correctamente.', 'success')
      this.estudianteNombre ="";
      this.estudianteEdad=0;
      this.estudianteDireccion="";
    }).catch(error=>{
      Swal.fire('Upps!', 'No se guardo el registro, reintentar', 'warning')
      console.log(error);
    })
  }

  removeRecord(id:string){

    Swal.fire({
      title: 'Esta seguro?',
      text: 'No podras recuperar la informacion del estudiante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar',
    }).then((result) => {

      if (result.isConfirmed) {

        this.crudService.delete_Student(id).then(resp=>{
         
        }).catch(error=>{
          Swal.fire('Upps!', 'No se elimino el registro, hubo un error', 'warning')
          console.log(error);
        })

      } else if (result.isDismissed) {

        console.log('Clicked No, No se elimina!');

      }
    })
   
  }

  viewRecord(id:string,data:any){
    this.estudianteId = id;
    this.estudianteNombre = data.nombre,
    this.estudianteEdad = data.edad,
    this.estudianteDireccion = data.direccion
    this.modoUpdate=true;
    this.modoConsulta=false;
  }

  editRecord(){
    let record = {
      nombre: this.estudianteNombre,
      edad:this.estudianteEdad,
      direccion: this.estudianteDireccion
    };
    
    this.crudService.update_Student(record,this.estudianteId).then(resp=>{
      this.estudianteId ="";
      this.estudianteNombre ="";
      this.estudianteEdad=0;
      this.estudianteDireccion="";
      this.modoUpdate=false;
      this.modoConsulta=true;
      // Success
      Swal.fire('Editado!', 'Actualizado correctamente!', 'success')
    }).catch(error=>{
      Swal.fire('Upps!', 'No se edito el registro, reintentar', 'warning')
      console.log(error);
    })
  };

  cancelarModal(){
    this.modoConsulta=true;
    this.modoUpdate = false;
  }

  
}
