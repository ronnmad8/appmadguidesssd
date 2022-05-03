import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AlertasService } from '../../services/alertas.service';
import { Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { AuthService } from 'src/app/services/auth.service';
import { LogsModel } from 'src/app/models/logs.model';
import { LogsService } from '../../services/logs.service';


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html'
})
export class AdminhomeComponent implements OnInit {
  
  @Output() menuAdmin: EventEmitter<any> = new EventEmitter();

  listaemails: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
  listaconteo:  string[] = [] ; 
  esteyear: number;
  total: number;


  public chart1: any = null;
  public chart2: any = null;
  public chart3: any = null;
  public chart4: any = null;

  color_red: string = '#ED9388' ;
  color_yellow: string = '#E4EA5E';
  color_blue: string = '#A5E8E8' ;
  color_green: string = '#8BED88' ;
  color_purple: string = '#D7A9E6' ;
  color_orange: string = '#FB9E31' ;
  color_gray: string = '#C5C4C4' ;
  color_black: string = '#5D5D5D' ;
  color_silver: string = '#EEEDED' ;
  color_redstrong: string = '#DD2B16' ;
  color_bluestrong: string = '#11EBEB' ;
  color_greenstrong: string = '#18F111' ;

  colorO_red: string = '#DA897F' ;
  colorO_yellow: string = '#D8DD6C' ;
  colorO_blue: string = '#8AC2C2' ;
  colorO_green: string = '#6DBA6B' ;
  colorO_purple: string = '#9E7CA9' ;
  colorO_orange: string = '#CB8028' ;   
  colorO_gray: string = '#929292' ;
  colorO_black: string = '#3B3B3B' ; 
  colorO_silver: string = '#D6D5D5' ;
  colorO_redstrong: string = '#DFDFDF' ;
  colorO_bluestrong: string = '#EDEEEE' ;
  colorO_greenstrong: string = '#EFF0EF' ;

  

  listacolor: string[] = [
    this.color_red,
    this.color_yellow,
    this.color_blue,
    this.color_green,
    this.color_purple,
    this.color_orange,
    this.color_gray,
    this.color_black,
    this.color_silver,
    this.color_redstrong,
    this.color_bluestrong,
    this.color_greenstrong
  ]

  listaOcolor: string[] = [
    this.colorO_red,
    this.colorO_yellow,
    this.colorO_blue,
    this.colorO_green,
    this.colorO_purple,
    this.colorO_orange,
    this.colorO_gray,
    this.colorO_black,
    this.colorO_silver,
    this.colorO_redstrong,
    this.colorO_bluestrong,
    this.colorO_greenstrong
  ]
  
  constructor(
      private router: Router,
      private alertasService: AlertasService,
      private clientesService: ClientesService,
      private auth: AuthService,
      private logsService: LogsService,

  ) 
  {  

    let autho = this.auth.leerRol();
    if(autho == '2'){
      this.menuAdmin.emit();
    }
    else{
      this.router.navigateByUrl('/homecliente');
    }
    
    let sld = localStorage.getItem("saludo");
    if(sld != "saludado"){
    this.alertasService.alertaPeq("Hola, "+ localStorage.getItem("nombre") +" estas en la Zona de administración de proyectos xanadu ");
    localStorage.setItem('saludo', "saludado");
    }

    
  }



  ngOnInit() {

    this.getEmails();
    
  }



 getChart(){

  this.chart1 = new Chart('datos', {
    type: 'horizontalBar',
    data: {
      labels: this.meses,
      datasets: [
        {
          backgroundColor: this.listacolor,
          border: this.listaOcolor,
          data: this.listaemails
        },
       
     
    ]
  },
      options: {
     tooltips: {
      enabled: false
     },
     legend: {
      display: false,
      position: 'bottom',
      labels: {
       fontColor: 'black'
      }
     },
     scales: {
       yAxes: [{
        ticks: {
         fontColor: "black"
        }
       }],
       xAxes: [{
      ticks: {
       fontColor: "black",
       beginAtZero: true
      }
       }]
     }
      }
   });
 }


 getEmails() {
    
  this.logsService.getLogsFilt(1)
    .subscribe((resp: LogsModel[]) => {
      let logsemail = resp;
      this.esteyear = new Date().getFullYear();
      logsemail.forEach((el) => {
      
        let year = Number(el.fecha.split('-')[0]);
        this.total = logsemail.length;
        if(this.esteyear == year){
          let mes = el.fecha.split('-')[1];
          
              switch (mes) {
                case "01":
                  this.listaemails[0] =  Number(this.listaemails[0]) + 1;
                  break;
                case "02":
                  this.listaemails[1] =  Number(this.listaemails[1]) + 1;
                  break;
                case "03":
                  this.listaemails[2] =  Number(this.listaemails[2]) + 1;
                  break;
                case "04":
                  this.listaemails[3] =  Number(this.listaemails[3]) + 1;
                  break;
                case "05":
                  this.listaemails[4] =  Number(this.listaemails[4]) + 1;
                  break;
                case "06":
                  this.listaemails[5] =  Number(this.listaemails[5]) + 1;
                  break;
                case "07":
                  this.listaemails[6] =  Number(this.listaemails[6]) + 1;
                  break;
                case "08":
                  this.listaemails[7] =  Number(this.listaemails[7]) + 1;
                  break;
                case "09":
                  this.listaemails[8] =  Number(this.listaemails[8]) + 1;
                  break;
                case "10":
                  this.listaemails[9] =  Number(this.listaemails[9]) + 1;
                  break;
                case "11":
                  this.listaemails[10] =  Number(this.listaemails[10]) + 1;
                  break;
                case "12":
                  this.listaemails[11] =  Number(this.listaemails[11]) + 1;
                  break;
      
              }
        }
        
      });

      this.getChart();

      this.listaemails.forEach((el, index)=>{


            let reg = el.toString();
            this.listaconteo.push(reg);

      })

    });
}

}
