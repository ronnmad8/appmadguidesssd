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
import { TextoPerfilModel } from 'src/app/models/TextoPerfil.model';
import { CountriesModel } from 'src/app/models/Countries.model';
import { StatesModel } from 'src/app/models/States.model';
import { CitiesModel } from 'src/app/models/Cities.model';
import { PrefixModel } from 'src/app/models/Prefix.model';
import { Observable } from 'rxjs';
import { CarritoService } from 'src/app/services/carrito.service';
import { AddressModel } from 'src/app/models/Address.model';
import { RespuestaModel } from 'src/app/models/Respuesta.model';

@Component({
  selector: 'app-zonamicuenta',
  templateUrl: './zonamicuenta.component.html'
  
})


export class ZonamicuentaComponent implements OnInit {

  @Output() updateDatosData = new EventEmitter();
  @Output() updateDatosAddress = new EventEmitter();
  @Input() usuario: UserModel = new UserModel();
  @Input() pedidos: CartModel[] = [];
  @Input() messagePerfilData: TextoPerfilModel ;
  @Output() zonamicuenta: EventEmitter<any> = new EventEmitter();

  sWindow: any;

  listatest = [];

  listacountries: CountriesModel[] = [];
  listastates: StatesModel[] = [];
  listacities: CitiesModel[] = [];
  listaprefix: PrefixModel[] = [];
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

  textoperfil: TextoPerfilModel;

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
    this.getMessagesPerfil();
    this.getUser();
    this.getCountries();
    this.getPrefijos();
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


  crearFormulario() {
    this.forma = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(2)]],
      prefijo: [''],
      type: [''],
      document: [''],
      street : [''],
      number : [''],
      postal: [''],
      city: [''],
      country: [''],
      state: [''],
      particular: [true],
      empresa: [false],

    });
  }

  cambiosFormulario() {

    this.forma.valueChanges.subscribe((value) => {
      this.usuario.name = this.forma.get('nombre')?.value;
      this.usuario.surname = this.forma.get('apellidos')?.value;
      this.usuario.email = this.forma.get('email')?.value;
      this.usuario.prefijo = this.forma.get('prefijo')?.value;
      this.usuario.phone = this.forma.get('phone')?.value;
      this.usuario.type = this.forma.get('type')?.value;
      this.usuario.document = this.forma.get('document')?.value;
      this.usuario.street = this.forma.get('street')?.value;
      this.usuario.number = this.forma.get('number')?.value;
      this.usuario.postal = this.forma.get('postal')?.value;
      this.usuario.city = this.forma.get('city')?.value;
      this.usuario.country = this.forma.get('country')?.value;
      this.usuario.state = this.forma.get('state')?.value;
      this.usuario.particular = this.forma.get('particular')?.value == 1 ? true : false;

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
      phone: this.usuario.phone,
      prefijo: this.usuario.prefijo,
      type: this.usuario.type,
      document: this.usuario.document,
      postal: this.usuario.postal,
      country: this.usuario.country,
      particular: this.usuario.particular,
      street : this.usuario.street,
      number: this.usuario.number,
      namefacturacion: this.usuario.namefacturacion,
      surnamefacturacion: this.usuario.surnamefacturacion,
      
      state: this.usuario.state,
      city: this.usuario.city,

    });

    if(this.forma.value.country != '' ){
      this.getStates(this.forma.value.country);
    }
 
  }


  getUser() {
    
    //let user = localStorage.getItem('user');
    this.auth.getMe().subscribe( (resp) => {
      if(resp != null){
        this.usuario = resp as UserModel;
      
      //this.usuario = JSON.parse(user) as UserModel;
      this.usuario.roles.length > 0 ? this.usuario.rol = this.usuario.roles[0].name  : this.usuario.rol = "";
      if(this.usuario.address.length > 1){

        let address = this.usuario.address[0]['address'] ;
        this.usuario.street = address.street;
        this.usuario.number = address.number;
        this.usuario.postal = address.cp?.toString();
        this.usuario.country = address.country_id?.toString();
        this.usuario.city = address.city_id?.toString();
        this.usuario.state = address.state_id?.toString();
      }

      this.usuario.type = this.usuario.type;
      this.usuario.document = this.usuario.document;
      this.usuario.prefijo = this.usuario.prefix_phone_id?.toString();
      this.usuario.phone = this.usuario.phone;
      this.usuario.particular = this.usuario.particular;
      
      this.patchUser();
      }
    })
    
  }

  
  modificarDatosData()  {
    let user: UserModel = this.usuario;
    this.auth.updateUserData(user).subscribe((resp) => {
      let respuesta: RespuestaModel = resp as RespuestaModel;
      if(respuesta != null && respuesta.status == "success" ){
          this.alertasService.alertaInfo('Madguides','Datos cambiados correctamente <br>'+respuesta.message);
      }
    });
  }

  modificarDatosAddress()  {

    let user: UserModel = this.usuario;
    this.auth.updateUserAddress(user).subscribe((resp) => {
      let respuesta: RespuestaModel = resp as RespuestaModel;
      if(respuesta != null && respuesta.status == "success" ){
          this.alertasService.alertaInfo('Madguides','Datos cambiados correctamente <br> '+respuesta.message);
      }
    });
  }

  getMessagesPerfil() {
    
    this.headfooterService.getMessagesPerfil().subscribe((resp)=>{
      this.messagePerfilData = resp as TextoPerfilModel;
      
    });
  }
  

  selecparticular(){
    this.forma.get('particular')?.setValue(true);
    this.forma.get('empresa')?.setValue(false);
  }
  
  selecempresa(){
     this.forma.get('empresa')?.setValue(true);
     this.forma.get('particular')?.setValue(false);
  }

  seleccountry(e: any){
    this.forma.get('country')?.setValue(e.value);
    this.getStates(e.value);
  }

  selecstate(e: any){
    this.forma.value.state?.setValue(e.value);
    this.getCities(e.value);
  }

  getCountries(){
    this.micuentaService.getCountries().subscribe((resp)=>{
      this.listacountries = resp as CountriesModel[];
    });
  }

  getPrefijos(){
    this.micuentaService.getPrefix().subscribe((resp)=>{
      this.listaprefix = resp as PrefixModel[];
    });
  }

  getCities(stateId: string){
    this.micuentaService.getCities(stateId).subscribe((resp)=>{
      this.listacities = resp as CitiesModel[];
      if(this.usuario.city != '' && this.forma != null ){
        this.forma.patchValue({
          city: this.usuario.city
        });
      }
    })
  }

  getStates(countryId: string){
    this.micuentaService.getStates(countryId).subscribe((resp)=>{
      this.listastates = resp as StatesModel[];
      if(this.usuario.state != '' && this.forma != null ){
        this.forma.patchValue({
          state: this.usuario.state
        });
        this.getCities(this.usuario.state);
      }
    });
  }
  




}


