import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { trigger, animate, transition, style } from '@angular/animations';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../services/global.service';
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

import { Observable } from 'rxjs';
import { MicuentaService } from 'src/app/services/micuenta.service';
import { ReservationModel } from 'src/app/models/Reservations.model';
import { HorarioModel } from 'src/app/models/Horario.model';
import { ContractModel } from 'src/app/models/Contract.model';
import { RespuestaModel } from 'src/app/models/Respuesta.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';

@Component({
  selector: 'app-zonareservas',
  templateUrl: './zonareservas.component.html',
})
export class ZonareservasComponent implements OnInit {
  @Output() updateDatosData = new EventEmitter();
  @Output() updateDatosAddress = new EventEmitter();
  @Output() zonareservas: EventEmitter<any> = new EventEmitter();
  @Input() usuario: UserModel = new UserModel();
  @Input() pedidos: CartModel[] = [];
  @Input() textconts: TextContentsModel = new TextContentsModel();

  sWindow: any;
  loading: boolean = false;
  isrespon: boolean = false;
  scrollPosition: number = 0;

  verreservas: boolean = false;
  vercuenta: boolean = true;
  reservas: ReservationModel[] = [];
  loginok: boolean = false;

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
    this.sWindow = this.platformService.sWindow;
  }

  ngOnInit(): void {
    this.isrespon = this.platformService.isrespon;
    this.providerService.setThrowPageadmin(true);
    this.listenProvider();
    this.getReservations();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollPosition = this.sWindow.pageYOffset;
  }

  listenProvider() {
    this.providerService.getThrowIsresize.subscribe((resp) => {
      this.isrespon = resp;
    });
  }

  getReservas() {
    this.pedidos.forEach((pedido) => {
      if (pedido.reservas.length > 0) {
        this.reservas.push(...pedido.reservas);
      }
    });
  }

  getReservations() {
    this.micuentaService.getReservation().subscribe((resp) => {

      this.reservas = resp as ReservationModel[];
      
    });
  }

  cancelarVisita(reserva) {
    this.alertasService
      .alertaWarning('Madguides', '¿Seguro que desea eliminar?')
      .then((result) => {
        if (result.value) {
          this.micuentaService
            .deleteReservation(reserva.codigoreserva)
            .subscribe((resp) => {
              let respuesta = resp as RespuestaModel;
              if ((respuesta.status = 'success')) {
                this.alertasService.alertaInfo(
                  'Madguides',
                  'Reserva cancelada correctamente'
                );
              }
              this.getReservations();
            });
        }
      });
  }


  reservarahora(reserva) {
    this.alertasService
      .alertaWarning('Madguides', '¿Seguro que desea reservar la visita?')
      .then((result) => {
        if (result.value) {
           //guardar en carrito la reserva
           
           this.router.navigate(['/carrito']);
        }
      });
  }







}
