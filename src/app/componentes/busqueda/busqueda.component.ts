import { Component, OnInit } from '@angular/core';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BuscadorService } from '../../services/buscador.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {

  tipos: string[] = [];
  listavisitaspaginadas: VisitasModel[] = [];
  idiomasfiltro: string[] = [];
  duracionesfiltro: string[] = [];
  franjafiltro: string[] = [];
  caracteristicasfiltro: string[] = [];
  listaordenar: string[] = [];
  valormaximo: number = 0;;
  valorfiltroprecio: number = 0;


  veridiomas: boolean = true;
  verduracion: boolean = true;
  verfranja: boolean = true;
  vercaracteristicas: boolean = true;
  verprecios: boolean = true;
  ordsel: string = "Relevancia";
  mostraridiomasdisponibles: boolean = false;
  selectedVisita: string = "";
  constructor(
    private buscadorService: BuscadorService,
  ) { }

  ngOnInit(): void {
    this.getVisitaspaginadas()
    this.getTipos();
    this.getIdiomasFiltro();
    this.getDuracionesFiltro();
    this.getFranjasFiltro();
    this.getCaracteristicasFiltro();
    this.getPreciosFiltro();
    this.getListaOrdenar()
  }

  getVisitaspaginadas(){
    this.listavisitaspaginadas = this.buscadorService.getVisitasBuscador();
    //.subscribe( (resp : ArticulocoleccionesModel[]) => { if(resp != null){this.listavisitashome = resp ;} })
    
  }

  getTipos(){
     this.tipos.push("Museos y palacios de Madrid");
     this.tipos.push("El Madrid e los deportes");
     this.tipos.push("Tours en Toledo y Segovia");
     this.tipos.push("Museos de Toledo");
     this.tipos.push("Madrid y sus edificios");
     this.tipos.push("Segovia y sus restaurantes");
     this.tipos.push("Museos y palacios de Madrid");
     this.tipos.push("El Madrid e los deportes");
     this.tipos.push("Tours en Toledo y Segovia");
     this.tipos.push("Museos de Toledo");
     this.tipos.push("Madrid y sus edificios");
     this.tipos.push("Segovia y sus restaurantes");
     
  }

  getIdiomasFiltro(){
     this.idiomasfiltro.push("Español");
     this.idiomasfiltro.push("Inglés");
     this.idiomasfiltro.push("Alemán");
     this.idiomasfiltro.push("Francés");
     this.idiomasfiltro.push("Italiano");
     
  }
  getDuracionesFiltro(){
     this.duracionesfiltro.push("0 - 3 horas");
     this.duracionesfiltro.push("3 - 5 horas");
     this.duracionesfiltro.push("5 - 7 horas");
     this.duracionesfiltro.push("Día completo");
     this.duracionesfiltro.push("Varios días");
     
  }
  getFranjasFiltro(){
     this.franjafiltro.push("6:00 am - 12:00 am");
     this.franjafiltro.push("12:00 am - 5:00 pm");
     this.franjafiltro.push("5:00 pm - 12:00 am");

     
  }
  getPreciosFiltro(){
     this.valormaximo = 2000;
     this.valorfiltroprecio = 2000;
     
  }
  getCaracteristicasFiltro(){
     this.caracteristicasfiltro.push("Cancelacion gratis");
     this.caracteristicasfiltro.push("Grupo reducido");
     this.caracteristicasfiltro.push("Accesible en silla ruedas");
     this.caracteristicasfiltro.push("Admite mascotas");
     this.caracteristicasfiltro.push("Tour privado");
     this.caracteristicasfiltro.push("Medidas sanitarias");
     this.caracteristicasfiltro.push("Sin colas");
     
  }
  getListaOrdenar(){
     this.listaordenar.push("Relevancia");
     this.listaordenar.push("Precio - Más bajo");
     this.listaordenar.push("Precio - Más alto");
     this.listaordenar.push("Duración - Menor");
     this.listaordenar.push("Duración - Mayor");
     
  }


  cambiarvalorfiltroprecio(){
    console.log(this.valorfiltroprecio);
  }

  verdisponibilidad(){
    console.log("verdisponibilidad");
  }
  verfiltrosidiomas(){
    this.veridiomas = !this.veridiomas;
  }
  verfiltrosduracion(){
    this.verduracion = !this.verduracion;
  }
  verfiltrosfranja(){
    this.verfranja = !this.verfranja;
  }
  verfiltroscaracteristicas(){
    this.vercaracteristicas = !this.vercaracteristicas;
  }
  verfiltrosprecios(){
    this.verprecios = !this.verprecios;
  }
  
  cambiarorden(sel: any){
    let v = sel.value ;
    console.log(v);

 }

 onSelect(hero: number){
  this.selectedVisita = hero.toString();
}
 deSelect(){
  this.selectedVisita = "";
}


}
