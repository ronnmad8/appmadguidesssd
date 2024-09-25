import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { trigger, animate, transition, style } from '@angular/animations';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../services/global.service';
import { MicuentaService } from '../../services/micuenta.service';
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from 'src/app/models/User.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartModel } from 'src/app/models/Cart.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { LoginModel } from 'src/app/models/Login.model';
import { PlatformService } from 'src/app/services/platform.service';
import { ProviderService } from 'src/app/services/provider.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';
import { StatesModel } from 'src/app/models/States.model';
import { CitiesModel } from 'src/app/models/Cities.model';
import { PrefixModel } from 'src/app/models/Prefix.model';
import { Observable } from 'rxjs';
import { CarritoService } from 'src/app/services/carrito.service';
import { RespuestaModel } from 'src/app/models/Respuesta.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';

@Component({
  selector: 'app-zonamicuenta',
  templateUrl: './zonamicuenta.component.html'
  
})


export class ZonamicuentaComponent implements OnInit {

  @Output() updateDatosData = new EventEmitter();
  @Output() updateDatosAddress = new EventEmitter();
  @Input() usuario: UserModel = new UserModel();
  @Input() pedidos: CartModel[] = [];

  
  @Output() zonamicuenta: EventEmitter<any> = new EventEmitter();

  sWindow: any;
  textconts: TextContentsModel = new TextContentsModel();
  listatest = [];
  listatextcontsdata: TextDataModel[] = [];
  listatiposidentificacions: any[] = [];
  listaresultados: [] = [];
  loading: boolean = false;
  isrespon: boolean = false;
  scrollPosition: number = 0;
  forma: FormGroup;
  btactivo: boolean = false;
  verreservas: boolean = false;
  vercuenta: boolean = true;
  reservas: VisitasResultadoModel[] = [];
  loginok: boolean = false;
  rdparticular: boolean = false;
  rdempresa: boolean = false;


  constructor(
    private router: Router,
    private globalService: GlobalService,
    private micuentaService: MicuentaService,
    private alertasService: AlertasService,
    private carritoService: CarritoService,
    private auth: AuthService,
    private fb: FormBuilder,
    private platformService: PlatformService,
    private providerService: ProviderService,
    private headfooterService: HeadfooterService
  ) {
    
    this.crearFormulario();
    this.cambiosFormulario();
    this.sWindow = this.platformService.sWindow;

  }

  ngOnInit(): void {
    this.getTexts();
    this.getUser();
    this.isrespon = this.platformService.isrespon;
    this.listatiposidentificacions = this.globalService.getlistatiposidentificacion();
    this.providerService.setThrowPageadmin(true);
    this.listenProvider();
     



  }


  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollPosition = this.sWindow.pageYOffset;
  }

  listenProvider(){
    this.providerService.getThrowIsresize.subscribe((resp)=>{
      this.isrespon = resp
    });
  }

  getTexts(){
    this.listatextcontsdata = this.globalService.listaTextDataModel
    this.textconts = this.globalService.textcontents;
    if(!this.textconts.dataok){
      this.globalService.getTextcontentsglobal().subscribe((resp)=>{
        if(resp){
          this.listatextcontsdata = resp as TextDataModel[] ?? [] ;
          this.textconts = this.globalService.setTextContentsByLanguage(this.listatextcontsdata , this.globalService.idlang  );
        }
      })
    }
  }

  crearFormulario() {
    this.forma = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(2)]],
      prefijo: [''],
      type: [''],
      document: [''],
      address : [''],
      number : [''],
      postalcode: [''],
      city: [''],
      country: [''],
      state: [''],
      particular: [true],
      empresa: [false],

    });
  }

  cambiosFormulario() {

    this.forma.valueChanges.subscribe((value) => {
      this.usuario.name = this.forma.get('name')?.value;
      this.usuario.surname = this.forma.get('surname')?.value;
      this.usuario.email = this.forma.get('email')?.value;
      this.usuario.prefijo = this.forma.get('prefijo')?.value;
      this.usuario.telefono = this.forma.get('telefono')?.value
      this.usuario.address = this.forma.get('address')?.value;
      this.usuario.number = this.forma.get('number')?.value;
      this.usuario.city = this.forma.get('city')?.value;
      this.usuario.country = this.forma.get('country')?.value;
      this.usuario.state = this.forma.get('state')?.value;
      this.usuario.postalcode = this.forma.get('postalcode')?.value;

      let particular = this.forma.get('particular')?.value;

      if (this.forma.status != 'INVALID' ) {
        this.btactivo = true;
      }
    });
  }

  patchUser() {

    this.forma.patchValue({
      name: this.usuario.name,
      surname: this.usuario.surname,
      email: this.usuario.email,
      telefono: this.usuario.telefono,
      prefijo: this.usuario.prefijo,
      country: this.usuario.country,
      address : this.usuario.address,
      number: this.usuario.number,
      state: this.usuario.state,
      city: this.usuario.city,
      postalcode: this.usuario.postalcode,

      namefacturacion: this.usuario.name,
      surnamefacturacion: this.usuario.surname

    });
  }


  getUser() {
    
    //let user = localStorage.getItem('user');
    this.auth.getMe().subscribe( (resp) => {
      if(resp != null){
        this.usuario = resp as UserModel;
      
      //this.usuario = JSON.parse(user) as UserModel;
      //this.usuario.roles.length > 0 ? this.usuario.rol = this.usuario.roles[0].name  : this.usuario.rol = "";
      //this.usuario.document = this.usuario.document;

        this.patchUser();
      }
    })
  }

  
  modificarDatosData()  {
    let user: UserModel = this.usuario;
    this.auth.updateUserData(user).subscribe((resp) => {
      let respuesta: RespuestaModel = resp as RespuestaModel;
      if(respuesta != null ){
          this.alertasService.alertaInfo('Madguides','<i class="fa fa-check colROJO2 fs-24"><i>');
      }
    });
  }



  

  selecparticular(){
    this.usuario.particular = 1;
  }
  
  selecempresa(){
     this.usuario.particular = 0;
  }

  




}


