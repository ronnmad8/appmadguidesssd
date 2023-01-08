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

@Component({
  selector: 'app-zonareservas',
  templateUrl: './zonareservas.component.html'
  
})


export class ZonareservasComponent implements OnInit {

  @Output() updateDatosData = new EventEmitter();
  @Output() updateDatosAddress = new EventEmitter();
  @Input() usuario: UserModel = new UserModel();
  @Input() pedidos: CartModel[] = [];
  @Input() messagePerfilData: TextoPerfilModel ;

  sWindow: any ;

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
    this.getCountries();
    this.getPrefijos();
    this.isrespon = this.platformService.isrespon;
    this.listatiposidentificacions = this.globalService.getlistatiposidentificacion();
    this.providerService.setThrowPageadmin(true);
    this.listenProvider();
    this.getReservas();
    
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
      type_doc: [''],
      document: [''],
      address : [''],
      postal: [''],
      city: [''],
      country: [''],
      state: [''],
      particular: [true],
      
      empresa: [false],
      // namefacturacion: [''],
      // surnamefacturacion: [''],
    });
  }

  cambiosFormulario() {
    this.forma.valueChanges.subscribe((value) => {
      this.usuario.name = this.forma.get('nombre')?.value;
      this.usuario.surname = this.forma.get('apellidos')?.value;
      this.usuario.email = this.forma.get('email')?.value;
      this.usuario.prefijo = this.forma.get('prefijo')?.value;
      this.usuario.phone = this.forma.get('phone')?.value;
      this.usuario.type_doc = this.forma.get('type_doc')?.value;
      this.usuario.document = this.forma.get('document')?.value;
      this.usuario.address = this.forma.get('address')?.value;
      this.usuario.postal = this.forma.get('postal')?.value;
      this.usuario.city = this.forma.get('city')?.value;
      this.usuario.country = this.forma.get('country')?.value;
      this.usuario.state = this.forma.get('state')?.value;
      this.usuario.particular = this.forma.get('particular')?.value;

      //this.usuario.empresa = this.forma.get('empresa')?.value;
      // this.usuario.namefacturacion = this.forma.get('nombrefacturacion')?.value;
      // this.usuario.surnamefacturacion = this.forma.get('apellidosfacturacion')?.value;

      if (this.forma.status != 'INVALID' ) {
        this.btactivo = true;
      }
    });
  }


  patchUser() {
    console.log()
    this.forma.patchValue({
      name: this.usuario.name,
      surname: this.usuario.surname,
      email: this.usuario.email,
      telefono: this.usuario.phone,
      prefijo: this.usuario.prefijo,
      type_doc: this.usuario.type_doc,
      numeroidentificacion: this.usuario.document,
      codigopostal: this.usuario.postal,
      ciudad: this.usuario.city,
      pais: this.usuario.country,
      state: this.usuario.state,
      particular: this.usuario.particular,

      
      address : this.usuario.address,
      namefacturacion: this.usuario.namefacturacion,
      surnamefacturacion: this.usuario.surnamefacturacion,

    });
  }

  getReservas() {
    this.pedidos.forEach((pedido) => {
       if(pedido.visitasPedido.length > 0){
          this.reservas.push(...pedido.visitasPedido);
       }
    });
  }

  modificarDatosData() {
    this.listaresultados = [];
    this.updateDatosData.emit(this.usuario);
  }
  
  modificarDatosAddress() {
    this.listaresultados = [];
    this.updateDatosAddress.emit(this.usuario);
  }
  

  vermisreservas(){
    this.verreservas = true;
    this.vercuenta = false;
  }

  vermicuenta(){
    this.vercuenta = true;
    this.verreservas = false;
    this.patchUser();
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
    this.forma.get('state')?.setValue(e.value);
    this.getCities(e.value);
  }

  getCountries(){
    this.micuentaService.getCountries().subscribe((resp)=>{
      this.listacountries = resp as CountriesModel[];
      console.log("paises ", this.listacountries)
    });
  }

  getPrefijos(){
    this.micuentaService.getPrefix().subscribe((resp)=>{
      this.listaprefix = resp as PrefixModel[];
      console.log("prefijos ",this.listaprefix)
    });
  }

  getCities(stateId: string){
    this.micuentaService.getCities(stateId).subscribe((resp)=>{
      this.listacities = resp as CitiesModel[];
      console.log("cities ",this.listacities)
    });
  }

  getStates(countryId: string){
    this.micuentaService.getStates(countryId).subscribe((resp)=>{
      this.listastates = resp as StatesModel[];
      console.log("states ",this.listastates)
    });
  }
  




}


